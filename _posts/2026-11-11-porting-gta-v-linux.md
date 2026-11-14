---
layout: single
title: "Reflections on porting GTA 5 to Linux using AI"
excerpt: "Fun with agents, compilers, and a town hiding behind a black screen."
description: "I ported GTA 5 to Linux using LLM agents. Here is my experience."

tags:
  - AI
  - Linux
  - GTA
---

I got GTA 5 running natively on Linux using LLM agents. I can't draw a triangle in OpenGL to save my life. Somehow, by the end of this, I had a Vulkan renderer and a populated Paleto Bay on my screen.

There were quite a few crashes between those two things.

This is the story of how my job gradually changed from asking for code, to letting the agent decide what to build, to asking why its perfectly reasonable fixes kept producing new problems.

# First, a game that already worked

I had the original game source and compatible game data. That is a rather important starting advantage. The goal was to turn it into a native Linux executable using Vulkan for rendering.

Before attempting any of that, I followed the existing Visual Studio build instructions. The game ran on Windows at around 30–40 FPS. I now had something working to compare against, and something I could spend the next few weeks breaking.

The source also needed a Git repository. I definitely initialized one immediately, and did not have to awkwardly shoehorn version control into an experiment already in progress. No sir.

My rough route was CMake, a modern compiler, Vulkan, SDL3, and finally Linux. Windows supports Vulkan, so I could test the renderer before changing the operating system too. The work overlapped in practice; I've grouped the incidents here by the hurdle we were trying to clear.

## An entire engine, defeated by spaces

I asked the agent to create a CMake build using Ninja, initially keeping the existing VS2012 compiler and game configuration. CMake described what to build; Ninja ran the commands. The initial configuration appeared surprisingly quickly. Getting a reliable build took more investigation.

For example, the Visual Studio projects mentioned one Windows SDK, but the working build's dependency logs showed that headers from an older SDK actually took precedence. The agent inspected those logs and reproduced the working order. There was a similar disagreement over which DirectX headers should win. Reading the project files alone hadn't been enough.

Then there were the generated files. Hundreds of parser schemas produced headers and C++ files that needed to exist before compilation. The agent added checks for deleted outputs and changed generated headers, including whether Ninja actually rebuilt the objects that used them.

Finally, an unchanged build kept recompiling large chunks of the game. The culprit was eighteen `#include` paths with trailing spaces *inside the quotes*. MSVC opened those files anyway. Ninja recorded the spaces, decided the dependencies were missing, and rebuilt them on every run.

An entire game engine, and we were fighting spaces.

What impressed me was the agent's willingness to follow through. It checked compiler commands, tested recovery of generated files, built the executable, and tried an unchanged build. Those checks mattered much more than I realized at the time. Soon, recompiling was going to become a significant part of my life.

# A compiler upgrade and a very confused character

Next I asked it to keep the game essentially the same, but build it with VS2026. It added another CMake preset and worked through the compatibility errors.

The first serious obstruction was an optional AMD shadows library built against the VS2012 C++ runtime. We had headers and a prebuilt library, but no implementation source to rebuild. I chose to disable that optional integration in the modern preset.

The game then compiled, linked, and ran. Unfortunately, the character kept resetting about once per game second. Even the idle animation restarted. Holding the key that slowed game time made the interval longer in real time.

My first attempt at debugging was exactly as sophisticated as you might expect: tell the agent that something was wrong and ask it to fix it.

It read animation and timing code, compared layouts, ran focused compiler probes, and inspected disassembly with `dumpbin`. It also wrote scripts to inspect the running process. I was impressed by the effort, but we weren't finding the cause.

I contributed a theory about floating-point precision. Some math calls had changed from double to float versions during the compiler migration. Surely that was suspicious? We changed them back, rebuilt a large part of the game, and discovered that my theory was useless. We reverted the experiment.

The next day, I finally used the game's own debug display. Two motion-task counters reset whenever they reached one second. That observation gave the agent something much more useful to work with.

It found a one-second ragdoll watchdog that could replace the character's motion tree. I suggested the simplest experiment I could think of: increase the timeout to five seconds. If the glitch moved, we would know we were looking in the right place.

It moved to five seconds.

Now the agent could investigate a specific path. It used `ReadProcessMemory` to inspect the live player's state, then compared that with the generated machine code. The player was in state 2. The watchdog should only apply to states 4 and above.

The state lived in a four-bit field inside a larger word. The intended operation was roughly:

```text
state = (packedWord >> 4) & 0xF
watchdogApplies = state >= 4
```

VS2012 extracted the field correctly. The optimized modern compiler compared the entire packed word against the shifted threshold. Neighboring fields made the comparison succeed even though the actual state was 2.

The agent reproduced the difference in a small program. Using unsigned integer storage for the bit-field, with an enum conversion in the getter, produced the correct comparison while preserving the object's layout. We restored the one-second timeout, and the resets stopped.

That was my first real lesson in working with the agent. It could read disassembly and inspect another process's memory, but my most useful contribution had been noticing a counter and suggesting a five-second experiment. My least useful contribution had cost us a rebuild.

## Updating the SDK broke startup too

Feeling adventurous, I also asked it to use the latest installed Windows SDK.

An old compatibility alias for `IMFDXGIDeviceManager` now collided with the real SDK declaration. Some Media Foundation libraries had also lost their old `_vista` suffix. The agent fixed both by selecting the appropriate declarations and libraries for each SDK.

Then the executable crashed before its own exception handler was installed.

The agent read the Windows crash record and mapped the fault address back to startup code. The game expected `psapi.dll` to have been loaded already. The newer SDK routed the relevant imports through `kernel32.dll`, so that accidental guarantee disappeared. Startup tried to call a function through a null pointer.

I had asked for a newer SDK. I got a lesson in dependencies that had been working by coincidence.

# Preparing for Clang

The agent added a `clang-cl` preset next. This let us change the compiler while retaining the Windows linker, SDKs, and binary interface. The full Clang game build happened later, after the Vulkan work, but its failures belong in this part of the story.

The compile-and-fix loop was almost boringly effective. Missing `typename`, enum template arguments, invalid macro token-pasting: give the agent the compiler output, let it inspect the relevant declarations, build again. This is the kind of work LLMs are extremely good at.

The runtime failures were more interesting.

One singleton check effectively did this:

```cpp
if (!&GetInstance())
    return;
```

But `GetInstance()` had already dereferenced a pointer to return a reference. Clang assumed the reference was valid and removed the null check. The fix checked the underlying pointer before using the object. A similar assumption about an absent level-of-detail object later left the loading thread waiting for a worker that had crashed.

Vehicle glass exposed an alignment problem. The code cast a packed three-float normal to a SIMD vector pointer, promising alignment the data didn't have. Clang emitted an aligned load and crashed. Reading the three floats directly preserved the asset format and avoided that promise.

Audio contributed a third surprise. Under the inherited fast floating-point settings, the engine's finite-value check misbehaved even for zero. The agent reproduced it using the actual engine math code. Adding `-fno-finite-math-only` restored the checks for finite values, NaNs, and infinities.

By now I was getting used to the agent producing tiny reproducers for problems buried inside a huge program. That ability was much more convincing than a confident explanation on its own.

# Letting the agent choose the next milestone

Now came the part I knew almost nothing about: graphics programming.

Thankfully, RAGE, the game's engine, already had graphics interfaces with implementations for different platforms. We could add Vulkan behind those interfaces while keeping the game making its existing engine calls.

I asked for a small standalone project using a slice of RAGE, rather than compiling the whole game immediately. The agent made a window with a triangle in it.

One thing that still feels mind-blowing to me is that it could save the rendered output to an image and *look at it*. It could write code, compile it, run the sample, inspect the pixels, and continue without waiting for me to describe the screen.

I had no idea what the next sensible milestone was, so I asked it.

It suggested an indexed mesh rendered through RAGE's resource and draw APIs. Since I couldn't independently judge that suggestion, I naturally said yes. Soon there was a rotating cube.

Next came textured geometry with explicit shader and texture bindings. Again, I had only a vague idea what that meant. Again, I gave it the go-ahead.

Of all the vibecoded parts, this was vibecoded the most.

It kept producing samples, tests, and screenshots. Some tests changed a buffer between two draws: the first draw needed the old contents, and the second needed the new ones. Others deleted a resource while submitted GPU work still needed it. Those required the backend to retain the appropriate GPU storage until the work completed.

Later, a compute blur test compared GPU output against a CPU implementation. Particle tests read back positions, velocities, and lifetimes. These gave the agent concrete targets beyond whether a cube looked approximately right.

I could see why the feedback loop worked. I was much less equipped to judge the architecture it was building along the way.

## The samples started becoming their own project

That distinction became important when the agent started taking some boneheaded decisions.

For asset streaming, it needed to use the engine's existing archive and resource machinery. I had to steer it back toward linking those implementations rather than creating parallel functionality around the Vulkan sample.

Then it enabled tracked references and defragmentation that the working game's configuration disabled. It also generated an AES archive instead of following the game's existing archive pipeline. When those choices exposed failures, it began changing shared engine subsystems to make the sample pass.

I didn't need to understand Vulkan to find that suspicious. The existing game worked with those subsystems. Why did testing a new graphics backend require changing them?

Once challenged, the agent audited its changes and acknowledged that the sample had introduced different conditions. We restored shared behavior and adapted the test harness to the game's contracts. Any genuinely necessary engine fixes would need their own evidence.

The agent was very capable of making progress toward a test. I had to keep checking whether that test still represented the game we were trying to port.

## Shaders: the simple plan gets complicated

The plan sounded easy enough: compile the game's HLSL shaders to SPIR-V, the format Vulkan would consume.

But the inputs were engine effect files. They described techniques, passes, parameters, defaults, and render states as well as shader programs. The original tooling used Boost.Wave for preprocessing and `fx2cg` for effect processing, with Microsoft's compiler in the Direct3D path. We needed to preserve what the engine expected around the shader code too.

The agent built a frontend using Boost.Wave and the original effect grammar, emitted HLSL for DXC, and packaged the resulting SPIR-V. It started with the real `Util/im.fx` effect and exercised the path end to end.

It also invented a new shader package format.

That was another point where I intervened. RAGE already had `.fxc` containers holding the records the game understood. Could we keep those and replace the Direct3D program payloads?

After an audit, that became the production approach: retain the effect record layout, use an `rgxv` signature for the Vulkan variant, and store SPIR-V in the program slots.

There were some good examples of how much work was hiding behind that decision. Extracting parameter information from compiled shaders, known as reflection, could miss unused parameters whose defaults the game still needed. The packer had to preserve source metadata too. Vertex and pixel shaders could use the same original register for different resources, requiring separate Vulkan bindings. Even preprocessing caused trouble: joining the tokens in `8.0 - -8.0` could make them look like a decrement.

I mostly watched the agent work through these. The package format was a decision I could question; the details of shader bindings were well beyond me. That unevenness in my ability to supervise it would keep coming up.

# “The game executable has linked successfully”

By this point the samples covered textures, original drawables, fonts, and the real render thread. It was time to build the full engine, then the game, with Vulkan selected.

This exposed the distance between implementing an interface in a sample and satisfying all its callers.

Some supposedly PC paths were really Direct3D paths. Shadows, ambient occlusion, and depth readback still referenced Direct3D types. Other interfaces existed only under `__D3D11` guards, so Vulkan needed the corresponding implementations and selection rules.

After compilation came linking. One game link reported 63 unresolved symbols: leftover D3D texture calls, shared effect methods excluded with the old backend, and device APIs the samples hadn't required. The agent worked through those using the existing providers and the new backend.

Meanwhile, the original shader catalogue was finding holes in our compiler. Duplicate pass names and declarations inside passthrough blocks broke assumptions made from the small examples. Grass shaders exposed constant and annotation evaluation failures. Fixing the frontend could send a lot of already-compiled effects back through the pipeline.

Then the agent reported:

> The game executable has linked successfully.

It was surreal. I had been approving one milestone after another without quite believing this would end in an actual game executable.

My respect for LLMs was through the roof.

It came back down when I ran the binary:

```text
[STARTUP] @debugMemory     = 220 MB
```

That was it. One line, then an exit.

## So it wrote a debugger

The agent used PowerShell's `Get-WinEvent` to read the Windows application crash records. The process had suffered an access violation in early allocation code, before shader loading even began.

I didn't have the proper Windows debugging tools installed yet. So the agent wrote a small C++ diagnostic debugger: launch the game under the Windows debug API, wait for exception events, and resolve a stack using the game's symbols.

It wrote a debugger to debug the program it had just written.

What the hell, man.

The culprit was a Vulkan thread-local vector being initialized while RAGE was still creating its heap. In that debug configuration, constructing the vector allocated memory through an allocator that wasn't ready. Deferring those containers until their graphics APIs were first used let the game get further.

Even the smaller engine tests had found a related allocation trap: MSVC's debug iterator bookkeeping could allocate during a vector constructor marked `noexcept`. An injected allocation failure terminated the process instead of reaching the intended error handler. The agent changed the construction path so that failure could be handled.

I had expected an LLM to suggest fixes. I hadn't expected it to keep building the tools it needed to investigate them.

## The compiler was spending its time doing what?

The shaders were still compiling in the background. Eventually I complained that this was taking far too long.

Once asked to measure, the agent found that DXC wasn't the main problem. One large effect took about 225 seconds, of which only about 33 were shader compilation. Packaging and exporting metadata consumed roughly 62% of the time. Our own tools repeatedly reflected, reconstructed, and validated the same data.

It reused frontend analysis and emitted HLSL, shared reflection results, and added a stage cache keyed by the actual shader inputs. Bounded parallel jobs helped large effects stop compiling their stages one at a time. A warm check reused every stage in the representative effects, and the outputs matched the earlier ones.

This became a recurring frustration: the agent would diligently keep running an expensive process until I asked whether it should be expensive. Once I supplied that question, it was quite capable of measuring and improving it.

# Launch, paste error, repeat

From here, my workflow became very simple:

1. Run the game.
2. Paste the error into chat.
3. Let the agent investigate, fix, and compile.
4. Run the game again.

Often, it could take a stack trace and identify a specific missing contract with frightening speed. Sometimes it inspected the running threads or generated another diagnostic script. My job increasingly involved waiting for a new executable and reporting what happened.

A blank window that immediately closed was progress. Hearing the iconic glass-breaking sound was an event. Reaching the loading screen was exciting right up until it stayed there.

I also got to see a real deadlock. The render thread held the Vulkan context while waiting for the next draw list. The game thread needed that same context just to retrieve the backbuffer pointer, so it couldn't finish the work the render thread was waiting for. Reading CPU-side backbuffer metadata without taking the graphics-context lock broke the cycle.

Another failure came from read-only depth views. Our backend rejected a depth-write state outright. The original PC behavior disabled writes through that view while retaining depth testing. Matching that behavior got us past another rendering exception.

This was the longest and most tiring stretch because it actively needed me. A sample could run and verify itself. Getting through another game launch meant loading, testing, crashing, and doing it again.

## Finally, a white screen

Eventually I reached gameplay. Input worked. The minimap rendered.

Everything else was white.

The agent prepared a launcher using the Vulkan SDK's GFXReconstruct capture tools and told me to press F12 during gameplay. It replayed the captured frame offscreen and extracted intermediate images.

For a moment I thought it had invented its own RenderDoc. It was using existing capture tools, which is a slightly less supernatural explanation. Watching it use them was still amazing.

The geometry was there. Lighting passes were running. The problem appeared later: an internal effect lookup redirected a texture record to its paired sampler, then overwrote the sampler's texture with null. Fog lost its depth input. Luminance read zero, and exposure climbed to 32×.

Preserving the original parameter-record identity and restoring the expected depth binding brought the world back. No shader recompilation was needed.

I could finally see GTA 5 through the Vulkan backend.

The rendering was broken in various ways and the frame rate was abysmal. I was ecstatic.

# A world at roughly three frames per second

Before we could enjoy that achievement, the game needed enough memory to keep its world loaded.

One investigation found the virtual streaming budget almost completely full: about 251 MiB available, with only 16 KiB free. The next asset needed 264 KiB. A platform branch had left Vulkan following a small fixed-budget policy rather than the intended PC behavior.

There was also missing integration with RAGE's central graphics resource manager. I was surprised we had got this far without it. The agent connected allocation accounting and budget reporting instead of continuing to patch individual allocation failures.

Then my laptop's AMD driver contributed a complication. It exposed two 256 MiB device-local heaps and a separate shared-memory heap of about 7.4 GiB. Our policy required local storage and counted only the tiny heaps. The fix preferred local memory but allowed compatible shared memory, accounting against the heap actually selected.

Gameplay exposed other assumptions. Several decal workers could read the same mesh buffer concurrently; our Vulkan lock implementation rejected the second reader. Supporting shared reads while keeping writes exclusive matched what those callers needed.

The pattern was becoming familiar. The game already had machinery for managing these things. The hard part was making our implementation participate in it correctly.

## Better tools, better questions

At around 3 FPS at 1024×768, “make it faster” felt like a reasonable request. I also finally installed the Windows Performance Toolkit, Windows debugging tools, and RenderDoc.

The agent captured traces with Windows Performance Recorder and investigated effect snapshots, descriptor preparation, and buffer allocation. RenderDoc recorded 125 GPU-memory allocations within one captured frame. Separately, the native CPU profile put buffer creation and destruction at about 22% of render-thread samples.

Those were much better leads than staring at the FPS counter. The work moved toward reusing upload storage and avoiding repeated preparation of unchanged rendering state. It also produced new crashes, now with the added inconvenience of waiting for the game to load before testing each fix.

I used this opportunity to open a performance trace myself for the first time. I still didn't understand most of what the agent was changing, but I could at least start seeing the evidence it was using.

## Where were the shadows?

For visual problems, I asked it to capture both the original DirectX renderer and Vulkan, then compare them.

Both captures contained shadow draws. The agent inspected their viewports and found that DirectX used 512×512 regions in a 512×2048 shadow atlas. Vulkan stretched the first viewport to 256×1365, with later regions extending outside the atlas.

Our backend hadn't updated RAGE's logical rendering dimensions when binding an offscreen target. The engine normalized and clipped the shadow viewports against the main window instead. Restoring the original meaning of the size-setting interface corrected those calculations.

There were smaller, more visible integration misses too. At 125% Windows scaling, the Vulkan window was larger and blurrier than the DirectX one. DirectX enabled per-monitor DPI awareness; our window path didn't. The generic taskbar icon was another missing piece of the original window setup.

I liked these investigations because I could follow the chain: compare two working paths, find a concrete difference, explain the screenshot. It made the agent's graphics work a little less opaque.

## Enough free memory, no usable block

Switching characters led to another crash and my first practical encounter with heap fragmentation.

The process had written a crash dump but was still alive. That gave the agent access to heap contents the small dump might not contain. It walked the heap and found about 6.9 MiB free, but the largest free block was only 12,000 bytes. The failing allocation wanted 12,279 bytes.

It was copying a bone-matrix array merely to get its element count.

That temporary copy was easy to remove. The broader comparison with DirectX was more revealing: Vulkan retained about 132 MiB of compiled shader payloads in the roughly 466 MiB main heap. DirectX released most shader bytecode after creating its native objects. We were using RAGE's allocator, but giving it very different allocation sizes and lifetimes.

The first fix released the bytecode after reflecting it and creating native shader modules. It also made startup painfully slow. The agent had moved that work into eager loading of the shader catalogue, under the graphics-context lock.

This was where I did the most questioning. Why didn't DirectX need to do all this? Didn't our compiler already know the bindings? Why were we reading large JSON metadata trees at runtime?

The answers led back to a better place to do the work: offline. The agent looked at established approaches, including bgfx's compiled binding tables, then changed our tooling to emit compact metadata. When it proposed another sidecar file, I asked why that couldn't live inside the existing `.fxc` container too.

Eventually the runtime used embedded binary metadata and loaded shader code on demand. A host test loaded metadata for all 449 effects in about two seconds, without retaining the CPU shader payloads. That wasn't a two-second game startup, and it didn't explain the entire process footprint, but it removed a substantial source of heap pressure and repeated work.

These decisions needed much more intervention than the individual crash fixes. The agent could solve the immediate problem and still choose a tradeoff that made the next part worse. Asking how the original backend avoided the problem was often my most useful question.

# Crossing over with SDL3

With Vulkan running on Windows, Linux finally felt close. We still needed a portable window and input layer. I asked the agent to add SDL3 and test it on Windows first.

The interesting complication was thread ownership. SDL video and event work needed the application's main thread. RAGE's existing arrangement gave window work to the render thread, while game startup could block during loading.

The solution kept SDL event processing on the process main thread and ran the original engine entry point on a separate thread. Window requests went back to the SDL thread; rendering retained its own thread and Vulkan resources.

Moving the entry point meant transferring the engine allocator's thread-local state too. Shutdown also had to wait for the engine thread before destroying SDL. Getting a window open was easy compared with keeping it responsive while the game loaded and making the threads stop in the right order.

The agent got the smaller Vulkan samples working through SDL, then built the full game with that backend. I asked it to write a handoff document before switching operating systems.

It was finally time to move to my Linux machine. Which was the same machine, because I dual boot.

An unexpected benefit of this whole process was that the chat had become a development record. I could read the actual crash logs, my bad hypotheses, the agent's measurements, and the explanations that changed along the way. Git had the eventual patches. The chat preserved much more of what it had felt like to arrive at them.

# Linux did not return my affection

I was so freaking relieved to be on Linux. I don't know why, Windows just *feels* suffocating. I love Linux.

Linux did not express its love by compiling the game on the first attempt.

The agent built native implementations behind the engine's interfaces for threads, synchronization, memory, files, and diagnostics. RAGE kept its own heaps, schedulers, archives, and resource loading. The movie adapter and archive content provider needed native implementations too.

Some of the most interesting problems were assumptions about C++ types. Windows used a 32-bit `long`; Linux used a 64-bit one. Fields whose binary layout mattered needed explicit widths. The engine's text was UTF-16, while Linux's native `wchar_t` was 32 bits, so native API boundaries needed real conversion.

Platform guards supplied another recurring trap. “PC” and “Windows” had often been treated as interchangeable. Some branches assumed that anything other than Windows must be a console. Linux was a desktop platform with a remarkable talent for falling into console code.

The smaller Linux graphics build reached 87 passing tests, including rendering, pixel readback, and device recreation. That was encouraging, although by now I had learned to leave some emotional distance between “the tests pass” and “the game works.”

# The final lap

The first full native link reported 219 unique unresolved symbols. Rescanning the static libraries as a group resolved nineteen because the libraries referenced one another.

That left 200. For a brief moment, a linker option had felt like a productivity breakthrough.

Eventually, the build produced a native Linux ELF executable with Vulkan, SDL3, and native runtime libraries.

Time to run it.

It crashed before `main`.

## New operating system, familiar routine

A global movie identifier tried to register its name before the namespace maps existed. Startup needed explicit ordering: heap and locks, then maps, then the ordinary global constructors.

After that came the usual reward for fixing a startup crash: the next startup crash.

Thread creation had two particularly good examples. Linux could successfully create a worker but deny its requested priority boost. Our implementation treated that optional failure as if no worker existed. Stack sizes also meant different things: the Windows argument described initial committed storage, while the pthread setting described total capacity. Copying the number across gave native workers too little stack.

The agent fixed those contracts and kept us moving through startup. Each error was smaller than building a renderer, but there were plenty of them.

## The pointer that was actually 4.2

One particle-loading crash produced the pointer `0x40866666`. Those bits represented the floating-point value 4.2, the file's version number.

The original resource stored the version at byte 24 and the name pointer at byte 32. The Linux C++ layout reused padding at the end of the base class, putting them at bytes 20 and 24 instead. The loader read the version as a pointer.

The base class still occupied 24 bytes. Its size check passed.

Explicit padding restored the resource layout, and the checks grew to include derived field offsets. That one stayed with me: a program can pass its size check and confidently try to use a version number as an address.

## We had ported the minimap

After more fixes, I reached the world. I could see the minimap and a label for Paleto Bay.

Everything behind them was black.

A RenderDoc capture showed the player and a populated town in an intermediate lighting image. The final image contained the HUD and debug text. We had been here before, although this time the failure was different.

The post-processing passes used a fullscreen quad. All its vertices had the same position:

```text
(0, 0, 0, 1)
```

A platform guard had excluded the engine's PC FastQuad path on Linux, leaving the shared shaders without the constants they expected. The quad had no area. Selecting the original PC path supplied the missing data, and a later capture showed the town in the final image.

The town had been there the whole time. We just weren't putting it on the screen.

Later runs reached the populated offline world in the normal executable. There were still bugs, including stale shader-buffer bindings and a loading stall in radio station selection caused by a flag initialized only on Windows.

But I had finally achieved the goal: GTA 5 running natively on Linux.

# One last request: make it faster

It was slow. Once we got to around 15 FPS, I was happy to leave it there for this experiment.

One discovery was particularly embarrassing. The build said BankRelease. The engine's optimized-profile macro was set. The compiler wasn't optimizing the code.

CMake had created empty flag entries for the custom configuration, and the platform defaults didn't replace entries that already existed. The agent filled the empty defaults and checked the actual compiler commands for `-O2 -g -DNDEBUG`. I had already learned to distrust a successful build. Now I also needed to distrust its name.

Two other changes removed avoidable CPU work. Ordinary window queries made the render thread wait for SDL's main thread; publishing window state let other threads read it directly. State lookups also allocated unnecessarily while resolving depth, rasterizer, and blend settings.

Short measurement windows at the same settings went from about 12.4 to 13.8 to 16.3 FPS across those changes. These were brief samples, and an intermediate run later crashed in vehicle animation. I was measuring progress, not proving long-session stability.

A Tracy capture pointed toward more CPU work in draw preparation. In one frame, the main thread spent most of its time waiting for rendering, while the render thread spent about 24 ms preparing 2,130 draws. Its frame-fence wait was tiny. The next question was becoming much more specific than “why is the game slow?”

There was plenty left to do. For now, I could move around a town that I had never expected to see from a native Linux executable.

# What did I actually learn?

You need to understand what just happened. I, who cannot write a renderer, got a AAA game running natively on Linux with agents. Granted, I had the source code and an engine with existing platform interfaces. I still see this as a seismic shift in software development.

When I started programming as a kid, it took me a whole month to create a flashlight app for Android. Without LLMs, I wouldn't even have attempted this project. I would probably waste my youth chasing some segfault.

Instead, I could paste a stack trace into chat and have an agent inspect the source, build a reproducer, read process memory, or analyze a captured frame. Sometimes the next useful result arrived within minutes. Watching it write a debugger because the debugging tools weren't installed was ridiculous.

The smaller milestones made that possible. The agent could close its own feedback loop around a triangle, a buffer-lifetime test, or a shader package. Once the full game needed manual testing, progress became much more dependent on me. Better observations helped enormously: the counter resetting at one second, a DirectX frame for comparison, a process left alive for heap inspection.

My judgment mattered most when the agent's immediate goal drifted away from mine. It could make a sample pass by changing assumptions the game depended on. It could cure shader heap pressure by doing far too much work at startup. Those fixes needed someone to keep asking whether we were preserving the existing system and solving the right problem.

And yet I still don't know how to write a renderer. Couldn't draw a triangle before, cannot do it now. I learned about the failures we investigated, but that is different from acquiring the skill to design and assess the whole thing myself.

That was a choice. I could have written the code myself and used the LLM when I got stuck. It would have taken much longer, and I would have learned much more. Nothing stops me from doing this again as a learning project instead of codemaxxing.

For software I wanted other people to rely on, I would want a much deeper understanding. Reaching a populated world was the goal of this experiment; visual parity, performance, deferred platform features, and long-session stability still needed work.

Even with the tests, I lack the graphics experience to judge whether this renderer's architecture is good or a piece of crap. I can verify particular outputs. An experienced graphics programmer could have questioned decisions I didn't even notice and perhaps avoided whole categories of fixes.

Everyone has access to roughly the same LLMs. Who builds better software: someone with that understanding, or someone whose only instruction is “Claude, make no mistakes”?

My bet is still on an LLM plus a human with deep knowledge. This experiment made me much more optimistic about what I can attempt. It also gave me very concrete examples of why understanding the subject still matters.

I wonder how long it will take before an agent can do the whole port in one go. Who knows, this might even become a benchmark.
