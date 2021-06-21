---
layout: single
title: "Reverse Engineering an android app to extract PDF passwords"
---

This post is about how I reverse engineered an android app, and extracted the password used for decrypting its PDFs


<h3>Backstory</h3>
A few years ago, when I was in high school, one of my friends approached me with a request: He was using an android app to get notes for studying, but the pdfs downloaded by the app were password protected and could only be opened in the app itself. He wanted to view the PDFs on his computer but couldnt't, due to the password protection, so he approached me for help.

Since I had recently started learning about reverse engineeing, I thought it would be a fun challenge and agreed to help him.

<h2>What am I looking at again?</h2>

I installed the app, and after downloading a few PDFs started looking for their location. Luckily the files were located in a directory at the root of the internal storage, so it was very easy to just copy them anywhere I like.

After that I started thinking about where the passsword could be located. I had a few ideas in mind:
<ol>
<li>On a server and not written to persistent storage</li>
<li>Downloaded from the server on first start and then stored in cache</li>
<li>Inside the apk file of the app</li>
</ol>

I started experimenting to rule out possible scenarios.

1. If the passsword is never written to persistent storage, then the app shouldnt be able to display the PDF when the phone is offline. But switching the internet connection didnt seem to have an effect on the app, so this scenario was ruled out.

2. Since I had a rooted device, I started looking at all the files created by the app(/data, SharedPreferences etc). I didnt find anything that looked like a password. Then I looked at the database created by the app, and it was mostly empty and nothing seemed like a password. So, this option was also mostly ruled out.


I then realized that I could simply decompile the apk and look at how the app was decrypting the PDFs to find the password


<h2>Show me the code!</h2>
I decompilied the code on my phone, using show-java, and started looking for clues.

Since Android Studio provides a built in code obfuscator, R8 (proguard at that time), many files were obfuscated, but curiously the main code of the application had not been obfuscated.

There I found what I was looking for!

There was a file named ```PDFViewActivity.java```, which contained the code for displaying the PDFs.

