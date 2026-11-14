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

# Points
## 1 
- first i ran the visual studio build
- i was getting 30-40 FPS
- the source lacked git history, did git init. I totally did not forget to do it and then had to do shoehorn it in between, No sir.
- created a cmake build configuration that used Ninja. The first preset was for the existing windows build
- the initial verison faced a few hiccups during compile regarding header precedence
- eighteen source include paths had trailing spaces inside their quotes. msvc accepts those paths, but ninja records the spaces in its dependencies
and otherwise recompiles affected units on every build
- it wrote a variety of tests

## 2 vs2026
- i asked to keep everything same just upgrade the compiler to vs2026. it generated a new cmake preset
- linking failed due to a library built with vs2012 c++ runtime, didn't have source for it.that lib was optional and i disabled it
- it used some weird python command instead of editing files directly. UTF 16

## 2.1 the first debugging
- character reset every 2 seconds
- first tried debugging like a vibe coder. this is wrong, fix, no context given
- it read different files, did focused compile tests, comparing clamping, structure sizes etc. but was not able to pin down the casue
- it used dumpbin to disassemble the binary and read through the compiled code
- this is really some dedication. it wrote a powershell script to read process memory, and monitor changes to player struct over time
- my initial though was some overflow, rounding truncation error due to float functions. stupid hypothesis increased debug time.
- next day i came to my senses and read and used the inbuilt debugging capabilities of the game.
- i saw two variables were being reset exactly 2 seconds in
- there was a 1 second watchdog that reset the motion tree in certain conditions
- i thought the simplest way to cinfirm this was to increase the watchdog time to 5 sec, this way i could immediately teell if tis culprit
- it worked
- i asked it to trace what was causing this
- it again wrote a powershell script to read memory of running process
- it found this bug
- it used `ReadProcessMemory`

## 3 latest SDK
- build failed to start, it read WER record

## 4 clang support
it created a cmake preset that used clang as the compiler.

then i asked it to try compiling and fixing any issues that come up. this is the kind of thing LLMs are extremely good at.

there were some fixes required, enum template parameters, invalid sdk declarations, a source encoding issue.

next errors were invalid macro token pasting, obfuscated integer passed to a variadic logger, an ambiguous msaa conversion.

then there wer some linking failures related to openMP

clang binary also needed libomp.dll for some reason. msvc one did not.

when running the clang binary there were some crashes. clang assumes references are not nul and removes checks.

had to add a -fno-finite-math-only flag



## 5 vulkan backend
it created a minimal project that used a small slice of the existing RAGE engine interfaces with a vulkan backend to show a triangle in a window

A good thing is that the LLM can save the window output to an image and "look" at it to verify if the output is correct. It feels mind blowing to me.


- now I had no idea how to proceed and asked the LLM itself for the next milestone.

### It suggested "an indexed mesh rendered through RAGE's resource and draw APIs". Since I didn't have a way to validate this, I decided to go ahead.


it worked for a while and generated a cube rotating in a window.

By this point I had become totally hand off since I didn't have a single clue what was going on.


for every milestone it would generate sample programs in the engine directory to exercise that feature and would visually verify the window output.

its ability to write code -> write verification test -> save the GPU frame to PNG, verify the visual output meant that it could work totally autonomously.

I think it should be better to understand the code and settle on an architeture, but here the LLM did all that.




now i asked it to create a roadmap

the first milestone was getting a build of the RAGE engine with its vulkan backend.

### THe enxt thing it suggested was "textured indexed geometry with explicit shader and texture bindings"

Again, I didn't have any idea what any of that meant, so naturally I gave it the go ahead.

it worked, wrote tests, verified the visual output and committed the code.


similarly it kept churning out one milestone on top of another. HLSL to SPIRV compilation, geometry, indexed and non-indexed draws, render states, multipass rendering, texture dictionary loading.

Then we arrived at the single largest task of building the vulkan backend: shaders.

<shader explanation>The shader pipeline uses `Boost.wave` for preprocessing, a tool `fx2cg` for performing engine effect compilation and packaging, it produces .fxc files
then microsoft FXC compiles those files


It was here that the LLM started taking some boneheaded decisions and I had to gently (harshly) guide it towards the correct path.

e.g. re-implementing some code in the vulkan backend instead of implementing the graphics engine interfaces (streaming assets support)

then instead of using the engine configuration used by the game, it used a different configuration, enabling some options that made it more conveient
for it to test the sample and started modifying the shared subsystems in the game engines the code to make it work, instead of working towards getting the game working (trackd references, defragmentation, generated AES archive instead of game's pipeline)


for shaders, it created the new shader compilation tooling, and tested it on one shader end to end first: Util/im.fx

the early milestones were:
- shader packaging tools
- boost.wave preprocessing with reused RAGE grammar
- effect metadata and HLSL emission
- CMake integration for shader compilation

For the shaders, it created its custom shader package file format. Here I thought we were veering off and asked it to use the existing binary format.

RAGE uses shaders compiled to `.fxc` files. They contain techniques, passes, parameters, defaults, states and compiled shader programs.
For D3D11 path, they contain Direct3D bytecode (DXBC)

it did and audit and recommended to retain RAGE's .fxc metadata layout while replacing the program payload with SPIR-V.

then it wrote the codec for generating those files during vulkan shader compilation. it added a rgxv to identify spirv programs as opposed to existing option of rgxf?

then it implemented support in the game engine for loading these shaders.


after shaders were doen was the work on drawables (the small weapon pictures and the like)

like earlier, it used some test fixtures for testing the impl


here i started getting some errors. windows would open and show up an error alert. i pasted the error in the chat and it quickly figured out and fixed the problem.

it was quite easily able to debug some gnrly allocation related bugs.

then it worked on integrating with the original framework draw list and render thread.


then it added a8 glyph textures support to vulkan backend for supporting font rendering

mind you, till now it was compiling a Vulkan POC project using the existing RAGE sources. Now that we had seemingly implemented most required features in the
vulkan backend, it was time to compile the original game engine project with vulkan backend.

it did an audit and came up with a list of remaining items, including stuff like build configuration, timing APIs.

now it started working towards a full engine build.

most common type of issue was some thing defined under __D3D11 flag, that needed another branch under __VULKAN


after the compilation, there were a lot of linking issues

<summarize linking issues>


finally it built and linked the game engine

then it made some samples for testing


there wer a few crashes, one was that msvc's debug iterator bookkeping allocated through the RAGE adapter when the new publication vector is default-constructed.

that constructor was `noexcept` so allocation failure terminated the process.


after resolving the problems, we finally had the game engine compiling with the vulkan backend. now the task was to compile nd run the game.


it added  new cmake preset to compile the game with the vulkan backend in game engine.

here again, the errors mostly stemmed from missing vulkan flags in defines.

one gap found here was viewport-instancing data.

further work found gaps in general target/readback and structured-buffer support

there was also something about grass


then it started compiling the shaders using the pipeline it built earlier. (i don't understand why it didn't built the shaders earlier itself)

the shaders took very long to compile, like more than an hour. i guess i didn't properly optimize my pipeline.

there were several issues found during shader compilation: <summarize some issues>

then it continued fixing both the game build and shader compilation in parallel.

one problem with shader compilation wa that the pipeline binaries was very unoptimized and were taking lots of CPU, RAM and time.

original game effects exposed several issues in the shader frontend <describe some>

on the game build side, most errors were missing vulkan guards. the game code was not free from direct3d calls, which it ideally should have been.

many pc branches were tied to d3d types, including shadows, ambient occlusion, depth readback.


here the limiting factor was compilation speed, the fundamental fixes were retriggering entire engine rebuild repeatedly.


after grinding through a variety of compilation issues, it finally reached and promptly failed at the linking stage.

<describe linking errors in brief>

it blitz through the fixes and finally reported: "The game executable has linked succesfully". It was surreal to see this. I did not actually expect
it to finish this task. 

in the background the shaders were still trying to compile and fixing errors. <briefly describe errors at this point>



My respect for LLMs was through the roof.


The respect soon came back to the fllor once I tried running the binary.

It just printed a single line and exited:

```
[STARTUP] @debugMemory = 220 MB
```


it used powershell to read windows event recorder using `Get-WinEvent` for the crashed process. I had no idea this could be done.

the error was an allocation failure due to a null allocator pointer.


what was crazy to me is that since i didnt have a debugger installed, IT WROTE ITS OWN DEBUGGER PROGRAM and used that to debug this startup crash.

I mean, what the hell man, this is amazing

the fix was to initialize vulkan thread local containers only when their graphics API was first used so RAGE could have created the heap by then.


## running the game with vulkan backkend

from here on the task was simpply try to run game -> paste error in chat -> AI does fix and compile -> try to run game again

in the midst the shaders were still not done, I focused on optimizing the shader build tools. LLMs dont seem to have the intuition of something taking
too long.

then it measured and analyzed the shader compile time and did several optimization like <describe some>



after lots of copying and pasting error logs in chat, I finally saw a blank window open and close quickly.

many errors were like the code was taking console branch isntead of PC, due to direct3d11 flag. just had to add || __VULKAN in some places to fix.

there were also some synchronization issues.

thenn after more grinding, I finally heard that iconic glass breaking sound.

i must have pasted the errors into the chat dozens of times. everytime it was able to use the stacktrace and pinpoint exactly what was wrong. the debugging
ability and speed were almost frightening.

its ability to create ad-hoc scripts and tools to dump thread states was crazy.


i also got to see a deadlock in real life for the first time. one issue was that the render thread holds the vulkan context while
waiting for the next draw list, and the game thread needs that same context just to retrieve the backbuffer pointer.

honestly this last stretch of fixing crashes was the longest and most tiring as it actively needed me to test

after a few more fixes, i was finally at the loading screen. And stuck there.

after more fixes, I was finally in-game for the first time!

But all I saw was white. Thankfully the minimap was rendering so I knew I was close. this was a rendering fault.

for solving this it made a script and told me to press f12 on game launch. this captured one gpu frame for diagnosis.

this LLM fucking created its own version of renderdoc. i am amazed. or i think it used gfxrecon-replay, so not too amazing.

finally it fixed the issue and I had a real game screen.

I couldn't believe this had been done.

althought the rendering looked broken and the FPS was abysmal.

I asked to to improve FPS and it quickly found some obvious problems and get to 5 ~FPS.

after that i felt that it needed the tools. i asked it and it recommended me to install windows performance toolkit, windbg and renderdoc. did all.

there were some out of memory problems.

it captured memory information from directx version
and compraed to vulkan version

again, there were some places where i had to correct it. it was adding vulkan specific workarounds rather than a general solution

one problem i encountered that was messing up the rendering is that the game seemed to be limited to a 250 MB fixed streaming budget, instead of a growable heap. leading to broken rendering.

i was surprised the game loaded even though it was missing integration with RAGE's central resource manager. (that has caching and stuff)


next bug was the amd driver in my laptop exposing two 256 MiB device local heaps and a separate 7.4 GiB shared-memory heap. the vulkan allocator requested device local storage and the new streaming policy only accounted those two small heaps, leading to crash.

it turned out again to be a compile flag issue, it was defaulting to console behaviour and a vulkan branch needed to be added.


after the fix, I finally had GTA 5 in a vulkan backend running on windows.

The bulk of the work had been finished and i was seeign light at the end of the tunnel.

gameplay exposed a few more crashes, which were promptly fixed. <shared read fix brief>

but before that I decided to improve the FPS a bit using the tools I had installed. 


it captured traces using WPR. i was getting 3 FPS at 1024x768, 

it analyzed the traces and found some low hanging fruits: effect snapshots, descriptor preparation, buffer allocation.

the fixes led to some more crashes. this took more time because now i had to wait for the game to load also.

it did some FPS fixes.

then I got a crash when switching characters. This was the first time i encountered memory fragmentation issues in real life. (how did the lLM figure
out there was a fragmentation?)

<explain the fix>

then it moved to using renderdoc

it figured some large problems was 125 gpu memory allocations in one frame taking 22% of render thread time, vulkan repeatedly emitting unchanged state.

i didn't understand one bit of what fix it was doing, i just let it run wild.

i also used this opportunity to view a WPR trace myself for the first time

there was also a bug where shadows were not rendering. it found (how? describe the mechanism) that the problem was that directx uses a 512x512 viewport for each cascade, but vulkan stretches the first to 256 x 1365. later cascade viewports extend beyond the 512x2048 shadow atlas.

the problem was that vulkan didnt update rage's logical device dimensions when bnding offscreen targets. that made RAGE clip and normalize cascade viewports
against the main window.

i also encountered a window scaling problem. the vulkan window was larger and blurry. it added support for per monitor dpi awareness.

there wer also instances when the game would crash and doa crash dump, but the process would still be alive. the LLM then investigated the running
process to determine the root cause. (explain technicalities)

one major problem we encountered was in memory usage.

directx released msot shader bytecode after creating the native shader object.

vulkan on the other hand retained every stage's spirv payload for lazy shader creation and reflection.

while fixing this the LLM took some shortcuts, that made shader loading and game startup very slow.

the fix had made reflection and shader module creation eager during stgartup.

hhere i did some socratic question and answering to understand why directx was not subject to these problems. the problem was that vulkan was reflecting the
entire shader catalogue during preload. while directx got most of its binding and parameter tables directly from
the original compile effect file. my shader compiler was publishing the vulkan reflection metadata but the game was not using it and redoing this stuff.

also i realized for some reason that this was in json. then i asked it to search the internet to look for solutions.

it found that bgfx's compiler way of generating compact binding tables offline.

i asked it to remove the JSON and move the compact metadata inside the .fxc file.





it is here that i believe the most human intervention was needed, most other things it was able to fix itself.


after the fixes all the shaders loaded within 2 seconds.

there was also a CREATE_TARGETS_FOR_DYNAMIC_DECALS thing that didn thave a vulkan branch, leading to skipping rage's existing normal buffer copy.

then i asked it to create a linux port plan, starting with adding SDL3 for windowing, input, audio.

it started working on adding support for an SDL3 backend. one architectural difference it encountered was that SDL3 requires window/event work on the application's main thread, while RAGE gives that work to the render thread.



first i got the vulkan sample tests working on windows through SDL3 backend in RAGE.

then it compiled the full game with SDL3 backend.

then I asked it to write a handoff doc.

It was finally time to move to my linux machien (which is the same machine cuz I dual boot)



one cool thing was that all the development history was in the chat. i could go an read back exactly the problems i encountered, my thought process
and the result. its much more richer than git history cuz thats sanitized. the chat has details like me pasting the crash logs, actual analysis data.

i didn't think this woud be so beneficial, but it is an unexpected benefit.

now I was in linux land



LLMs are a fascinating technology. LLM agents have fundamentally changed the way we create software.

I got GTA 5 running natively on Linux using agents. I can't draw a triangle in OpenGL to save my life. Somehow, by the end of this, I had a Vulkan renderer and a populated Paleto Bay on my screen.

There were quite a few crashes between those two things.

# Background

The goal was to build a native Linux executable from the original game code. It would load compatible game data and use Vulkan for rendering. Having the source code made this feasible. Without it, this would have been much, much harder.

Compiling the code using Visual Studio was simple. I followed the existing instructions. Once I had a known good configuration, it was time to build off of it.

The rough idea I had in mind was:

- Add CMake support.
- add vs2026 support
- Add Clang support.
- Add a Vulkan backend.
- Add SDL3 for windowing and input.
- Add a Linux OS compatibility layer.
- Compile and run on Linux.

Windows supports Vulkan, so I could build and test the renderer there first. If I changed the compiler, renderer, window system, and OS together, every crash would have four possible explanations. I already had enough opportunities to be confused.

That list also makes the work look much more linear than it was. I added the initial Clang configuration early. The full game build with Clang came after the Vulkan work. SDL integration and the smaller Linux tests overlapped too.

# Adding CMake support

This was so fast even I was a bit shocked. It took like 15 minutes to create the initial CMake configuration. I had a compiled binary in the next 15. And the game worked.

Making the build reliable involved more than getting that first binary, though.

CMake describes the targets, source files, and dependencies. Ninja runs the resulting build commands. The first configuration kept VS2012, Direct3D 11, and the original BankRelease profile. This profile also controls diagnostics and other code that the engine includes.

The build used source lists from the original Visual Studio projects. It also kept the original unity files, which combine source files in a specific include order. Changing that order would have introduced another possible cause of failure.

There were 466 parser schemas with generated headers and C++ files. The build had to check those files before compiling code that used them. It also had to rebuild missing outputs without rebuilding everything on every run.

One early problem was eighteen include paths with trailing spaces inside the quotes. MSVC accepted them. Ninja recorded the spaces in its dependencies and kept rebuilding the affected files.

An entire game engine, and we were fighting spaces.

The first CMake build produced the executable, all 18 static libraries, and debug symbols. An unchanged build did not compile or link the game again. That last part matters when your next few days consist of fix, compile, crash, repeat.

# Adding Clang support

The original game compiled with VS2012. Due to the beauty of the C++ language, changing compilers is also an opportunity to discover all the assumptions your code has accumulated.

The early Clang configuration used `clang-cl` on Windows. It kept the Windows SDK, Visual Studio linker, and existing libraries. The first step changed the compiler while retaining the Windows binary interface.

There was also a separate modern MSVC build. That gave us one of the more entertaining bugs in this project.

## The character who reset every second

With the modern MSVC build, the character's motion reset about once per game second. Even the idle animation did it. Slowing game time increased the interval in real time.

The engine had a watchdog for later ragdoll states. A watchdog checks for a stuck condition and starts recovery. The character's state was 2, but this watchdog should apply only to states of 4 or greater.

The state occupied four bits inside a larger word. The correct read needed to extract those four bits before the comparison:

```text
state = (packedWord >> 4) & 0xF
watchdogApplies = state >= 4
```

VS2012 extracted the field correctly. The optimized modern build compared the whole packed word against `4 << 4`. Other fields in that word made the comparison succeed.

The investigation compared live memory and generated instructions. A small standalone program reproduced the compiler difference. Increasing the watchdog timeout moved the reset to the new interval, but did not correct the field read.

The fix used unsigned `u32` storage for the bit-field and converted the result to the enum in the getter. The object size and field layout stayed the same. With the original one-second timeout restored, the resets stopped.

I would absolutely have blamed the animation code for this. Apparently the compiler was reading the neighbors' bits.

## Getting the full game through Clang

Later, the full Windows Vulkan game compiled and linked with Clang 22.1.3. Launching it exposed problems that a successful build could not detect.

One singleton check looked like this:

```cpp
if (!&GetInstance())
    return;
```

`GetInstance()` already dereferenced the singleton pointer to return a reference. Clang assumed the reference was valid and removed the null check. The fix checked the actual pointer before using the object.

Vehicle glass exposed another assumption. The code cast a packed three-float normal to a SIMD vector pointer. That cast promised 16-byte alignment, which the data did not have. Clang emitted an aligned load and the game crashed. Reading the three floats directly fixed the problem without changing the asset layout.

There was a lot of the usual fix, compile, get error, fix cycle. But some of the important errors only appeared after compilation had finished. Getting a binary was a milestone. Getting the same behavior was another one.

# Adding a Vulkan backend

This is where the real work started.

Thankfully, the game already had graphics interfaces with implementations for different platforms. The job was to add a Vulkan implementation behind those interfaces. Existing game code would keep making the same engine calls.

LLMs work wonders in this kind of work where they have a verifiable target.

Now, mind you that I don't know jack shit about graphics programming, let alone Vulkan. I depended heavily on the LLM for this part. I could run tests and inspect the output, but I couldn't independently judge the renderer's architecture.

Of all the vibecoded parts, this was vibecoded the most.

I started with a standalone project that used the RAGE engine to open a window. Then the agent added features one by one, with tests at each stage.

The first triangle checked device creation and presentation. A rotating indexed cube then checked the engine's vertex buffers, index buffers, transforms, and draw calls. Textures, render states, offscreen targets, and original assets followed.

The tests also changed buffers between draws, deleted bound resources, and recreated the device. A correct screenshot alone would not detect every failure in those operations.

## The GPU is still using that

The CPU can finish with a resource before the GPU finishes reading it. Deleting the CPU object must not release storage that a submitted draw still needs.

Updates within a frame need similar care. Suppose the engine draws a buffer, changes it, then draws it again. The first draw must read the old data. The second draw must read the new data.

The backend kept separate GPU versions and retained them until the submitted work completed. Barriers made uploaded data visible to later GPU operations. Fences told the CPU when it could reuse storage or release retained resources.

This was the sort of thing the cube tests were actually useful for. A rotating cube looks trivial. A rotating cube whose vertices survive deletion is doing a bit more work.

Later tests used original drawables, the real render thread, compute shaders, skeletal animation, particles, fonts, and Scaleform UI. The compute blur test compared GPU output against a CPU implementation. The particle tests read back positions, velocities, and lifetimes.

Those tests gave us specific things we could verify before launching the whole game. They also had limits. A small particle test could pass while the game's full particle loading path still failed. We got to discover that later.

## Shaders

This part deserves a mention because of how involved it was. The plan sounded so simple: use DXC to compile HLSL to SPIR-V.

The shader inputs were effect files. Each effect could contain techniques, multiple passes, render states, sampler settings, and material parameters. The game expected those records as well as the compiled shader programs.

The new frontend used Boost.Wave for preprocessing and a parser derived from the original FX grammar. It selected entry points and produced HLSL for DXC. DXC produced SPIR-V, which the build then validated.

The first prototype used a separate package format. The production path returned to the original PC effect record layout. It used an `rgxv` signature and stored Vulkan programs in the existing program slots. Techniques, passes, and parameters kept their original identities.

Compiled shader reflection supplied resource bindings and memory layouts. The frontend retained source information that compilation could remove, such as unused parameters with material defaults. The package needed both sources of information.

Bindings also needed translation. Vertex and pixel shaders could use the same original register for different data. The Vulkan mapping kept those bindings separate so one stage could not overwrite the other's resources.

This was where some appealing shortcuts stopped looking so appealing. Compiling a few shaders was nowhere near enough to preserve what the engine expected.

The initial boot effects covered only a small part of the game. The supplied game preload contained 323 names. The complete staged runtime catalogue contained 449 effects. These counts describe different sets; they are not interchangeable measures of coverage.

Even the preprocessor managed to contribute a bug. It could join the tokens in `8.0 - -8.0` into text that looked like a decrement. The fix corrected token separation instead of changing the original shader expression.

There was also a lot of manual testing: launch the game, wait for it to crash, paste the log into the LLM, repeat.

And then finally I had this:

A white screen.

## The world was there. Somewhere.

A frame capture showed geometry and directional lighting. The minimap and debug UI worked. The failure was later in the rendering sequence.

During effect parameter transfer, the backend could replace a sampler's image with a null texture entry. Fog and luminance then sampled incorrect inputs. The fix preserved the identity of the original parameter records and restored the original depth-view binding behavior.

Shadows had a different problem. The original renderer used four `512 × 512` regions inside a `512 × 2048` atlas. Vulkan put the regions at incorrect sizes and positions. The last two started below the atlas.

The Vulkan implementation had treated `SetSize` as a request to resize the window. The original backend used it to update logical rendering dimensions. Restoring that behavior corrected the viewport and scissor calculations.

These were separate failures. Fixing the white screen did not establish that all the lighting was correct. The shadow diagnosis also needed its own comparison of draw state.

Eventually, I had the game running with the Vulkan renderer in all its roughly 2 FPS glory.

I was ecstatic. This felt like the biggest hurdle. The game was still on Windows, but the renderer was doing enough real work that moving to Linux no longer felt completely absurd.

# SDL3

The game needed a portable window and input provider. SDL3 supplied that layer. I tested it on Windows first, before moving the whole game to Linux.

SDL owned windows, displays, and event handling. The renderer retained ownership of the Vulkan device, queues, and presentation resources.

The main complication was thread ownership. SDL video and event operations belonged on the process main thread. The original game startup could block during loading, so that same thread could not run both jobs.

The host kept SDL event handling on the process main thread. A separate engine thread ran the original `CommonMain`. Window requests went to the SDL thread. Rendering stayed with the render thread.

The host also transferred the engine allocator's thread-local state and waited for the engine thread before shutting down SDL. Opening a window was the easy part. Keeping it responsive while the game loaded needed more care.

Once I had that boundary in place, I switched to my Linux install for the next steps.

# Linux OS compatibility layer

I was so freaking relieved to be on Linux. I don't know why, Windows just *feels* suffocating. I love Linux.

Linux, unfortunately, did not express its love by compiling the game on the first attempt.

The engine needed native implementations for threads, waits, synchronization, memory operations, file access, and diagnostics. These implementations sat below the existing engine interfaces. The engine retained its heaps, job schedulers, archives, and resource loading.

A new worker also needed engine state before it could run its callback. The Linux thread setup installed allocator state, floating-point settings, and an engine thread identity first.

Some differences had nothing to do with OS function names. On these targets, Windows used a 32-bit `long`, while Linux used a 64-bit `long`. Resource fields that required a fixed width needed explicit types.

The engine's text used UTF-16. Linux's native `wchar_t` used 32 bits. The port kept the engine's 16-bit text operations and converted at native API boundaries. A pointer cast could not perform that conversion.

Platform guards needed attention too. `RSG_PC` selected desktop game behavior. A Windows guard selected Windows operations. Old branches sometimes assumed that every platform other than Windows was a console. Linux kept finding those branches for us.

The Linux graphics build reached 87 passing tests. Those tests included Vulkan rendering, pixel readback, and device recreation. The full game still needed additional code from its BankRelease profile, including allocation tracking and startup diagnostics.

The native build also needed working dependencies. The movie adapter used Librempeg behind the engine's existing Bink interface. It retained file callbacks, frame timing, texture planes, and audio. The archive layer used a native content provider below the original archive machinery.

Personal music scanning and physical controllers remained deferred. Ordinary game radio stayed active. This distinction became relevant when ordinary game radio decided to break anyway.

# The final lap

After compilation, I still needed to link the binary.

The first full native link reported 219 unique unresolved symbols. Rescanning the static libraries as a group resolved nineteen. The libraries referenced one another, so one forward scan had missed definitions it later needed.

That left 200 missing definitions. For a brief moment, a linker option had felt like a productivity breakthrough.

Eventually, the full game build produced a native Linux ELF executable. It used Vulkan, SDL3, and native runtime libraries.

Time to run it.

It crashed before `main`.

## A few unsuccessful launches

A global movie identifier tried to register its name before the namespace maps existed. The Linux startup needed explicit initialization order: heap and locks first, namespace maps next, then ordinary global constructors.

After that came the usual reward for fixing a startup crash: the next startup crash.

- The game reported zero monitors. SDL supplied desktop displays and modes, while Vulkan supplied GPU information.
- The shader loader still used an absolute Windows build staging path. It needed the deployed `common/shaders/vulkan` directory.
- A texture allocation loop received a leaf size of zero. The query was virtual only on Windows, so Linux called the wrong implementation.
- A worker started successfully, but Linux denied its priority boost. The thread creation code treated that optional failure as a failed worker.
- The intro decoded audio into a buffer without an active consumer. SDL supplied startup playback before the game mixer was ready.

We also ran out of stack. The Windows argument described initial committed stack storage. The pthread setting described total stack capacity. Copying the number preserved the argument while changing its meaning. Native desktop workers needed a reservation of at least 1 MiB, with pages populated on demand.

These were small fixes compared with the renderer, but there were a lot of them. An interface helps only if the new implementation preserves what the caller actually expects.

## The pointer that was actually 4.2

One particle-loading crash produced the pointer `0x40866666`. Those bits represented the floating-point value 4.2, which was the file's version number.

The original resource stored the version at byte 24 and the name pointer at byte 32. The Linux C++ layout put them at bytes 20 and 24. It had reused padding at the end of the base class.

The base class still occupied 24 bytes, so its size check passed. The derived field offsets were wrong. The loader read the version as a pointer.

Explicit padding restored the resource layout. The checks then verified derived field offsets as well as base class sizes.

That one really stayed with me. The program had passed its size check and was confidently trying to use a version number as an address.

## We had ported the minimap

After more fixes, the game reached the world. I could see the minimap and a label for Paleto Bay. Everything behind them was black.

A RenderDoc capture showed the player and the populated town in an intermediate lighting image. The final image contained only the HUD and debug text.

The post-processing passes used a fullscreen quad. All its vertices had the same position:

```text
(0, 0, 0, 1)
```

The shared PC shaders expected constants from the engine's FastQuad path. A platform guard had excluded that path on Linux. The shaders ran, but the quad had no area.

Selecting the original PC path supplied the missing constants. A later capture showed the player and town in the final image. The original post-processing passes remained in use.

The town had been there the whole time. We just weren't putting it on the screen.

Later runs reached the populated offline world in the normal executable. There were still bugs, including stale shader buffer bindings and a loading stall in radio station selection. The radio stall came from a flag that the constructor initialized only on Windows.

But I had finally achieved the goal: the game running natively on Linux.

# Optimizations

It was slow. I asked the LLM to do some optimizations. Once it got to around 15 FPS, I was happy to leave it there for this experiment.

One discovery was particularly embarrassing. The build said BankRelease. The engine's optimized-profile macro was set. The compiler was not optimizing the code.

CMake had created empty entries for the custom configuration's flags. The platform defaults did not replace existing entries, including empty ones. The fix filled empty defaults and retained user-specified flags. We checked the compiler commands for `-O2 -g -DNDEBUG`.

One observed startup decreased from about 46 seconds in earlier runs to about 15 seconds after that correction. These were not controlled benchmark runs.

The render thread also waited on the SDL thread for ordinary window queries. The SDL thread began publishing window state for other threads to read. Window changes still went through the SDL thread.

Another change removed unnecessary allocations when looking up depth, rasterizer, and blend states. Three short measurement windows per build averaged 12.42, then 13.75, then 16.30 FPS at the same settings. An intermediate run later crashed in vehicle animation. The samples measured short-run performance; they did not establish long-session stability.

A Tracy capture helped identify the remaining work. In one 62.28 ms frame, the main thread spent 52.85 ms waiting for rendering. The render thread spent about 24.20 ms preparing 2,130 draws. Its frame-fence wait was only 0.002 ms.

The main thread's wait did not measure GPU execution time. The capture pointed toward CPU work in draw preparation. Repeated vertex-layout resolution and binding preparation were reasonable next targets.

Having numbers also changed the conversation with the agent. There was now something more useful to work from than “make it faster.”

# Reflections

You need to understand what just happened. I, who cannot even name all the graphics APIs, got a AAA game running natively on Linux with agents. Granted, I had the source code and an engine with existing platform interfaces. I still see this as a seismic shift in software development.

I remember when I started programming as a kid, it took me a whole month to create a flashlight app for Android.

I wouldn't even dream of doing something like this on my own if I didn't have access to LLMs. I would probably waste my youth chasing some segfault.

Instead, I can paste a stack trace into the chat and have the agent investigate the source, propose a fix, and run another build. Sometimes the next useful result arrives within minutes. No wonder programmers feel threatened by this technology. It's like we had all been calculating numbers manually and someone invented the electronic calculator.

The intermediate milestones mattered a lot. When the game broke, we could ask a smaller question. Did the compute dispatch work? Did the loaded resource have the correct field offsets? Was the town missing, or was the final pass failing to display it?

Even with those tests, reaching a populated world is only part of a finished port. Long-session stability, visual parity, performance, and deferred platform features still needed work. Getting it to boot was the goal of this experiment. I would want a lot more evidence before calling it ready for players.

Now, the obvious downside is that I still don't know how to write a renderer. Couldn't draw a triangle before, cannot do it now. I learnt about the failures we investigated, but that is very different from acquiring the skill to build and assess the whole thing myself.

But I'd argue that this was intentional. If I had wanted, I could have used the LLM only for helping me when I got stuck. Writing the code myself would have taken much longer, but I would have learnt much, much more.

That's the cool thing, right? Nothing stops me from doing this again. Now that I know it's possible, I can do it as a learning project and use the LLM to learn instead of codemaxxing.

What does this mean for software shops? Should we still be reading all the code we write, or leave the code to LLMs?

I would argue that for well-built software, reading the code is just as important as before, if not more.

Everyone has access to the same LLMs, mostly. Who would build better software: people with an in-depth understanding, or people who know nothing beyond “Claude, make no mistakes”? If you never learnt this stuff, how do you know when the LLM makes a mistake?

Even though I have this Vulkan renderer, I lack the skill to determine whether its architecture is good or a piece of crap. The tests can verify specific outputs. They don't tell me whether an experienced graphics programmer would have chosen a much better design.

Would you trust someone like me with developing your game engine? I know I wouldn't.

With prior Vulkan experience and a proper understanding of the RAGE graphics interfaces, I might have suggested a better, inherently more performant architecture. I might also have known which shortcuts were reasonable and which would cost us later.

My bet is still on an LLM plus a human with deep understanding. Knowing the subject gives you a better chance of getting things right from the start, and a better chance of noticing when you haven't.

This was a really interesting experiment, and I am curious to see how it changes as LLM technology advances. I imagine several years down the line, LLMs might be able to one-shot a port.

Who knows, this might even become a benchmark for testing LLMs.
