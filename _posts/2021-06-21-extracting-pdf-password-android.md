---
layout: single
title: "Reverse Engineering an android app to extract PDF passwords"
excerpt: "How I reverse engineered an android app, and extracted the password used for decrypting its PDF files"
---
**Disclaimer:** This post is for infotainment only. I do not promote any form of hacking or cracking, and neither does this post contain any instructions or software for the same. I have censored any info that could identify the application, to prevent misuse of this knowledge.
{: .notice--danger}


<h2>Backstory</h2>
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

Since Android Studio provides a built in code obfuscator, R8 (proguard at that time), most of the code was obfuscated, but luckily the names of the source files had not been obfuscated!

There I found what I was looking for!

There was a file named ```PDFViewActivity.java```, which contained the code for displaying the PDFs.

Inside the onCreate() method, I immediately noticed these 2 lines:

```java
PDFView.b b2 = this.q.a(this.r);
b2.a(((String)this.v.get(12)).substring(12));
```

This prompted me to check the imports, and there I found:

```java
import com.github.[redacted].PDFView;
```

Aha! So the app was using an open source library for showing PDFs.

I skimmed through its documentation, and the code for setting the PDF password appeared to be very similar

Now I was reasonably sure that this code was being used for setting the password of the PDF.

```java
b2.a(((String)this.v.get(12)).substring(12));
```

Lets try to understand what this code is doing:

It gets the value at index 12 from an object ```v```(obfuscated), obtains a substring from that value, starting from index 12 and uses it for input in the ```a```(obfuscated) method.

On searching for the ```v``` object, I found some other related code:

```java
this.t = this.getResources().obtainTypedArray(2531604097);
this.u = this.getResources().getStringArray(this.t.getResourceId(12, 0));
this.v = new ArrayList((Collection)Arrays.asList((Object[])this.u));
```

So, ```v``` is an ArrayList, created using data from the ```u``` object. ```u``` is an array made by obtaining a resource at index 12 from the ```t``` object.

Android apps have these xml files, called resource files or resources that contain stuff to be used throughout the app, to make it easy to change a value without having to individually change its oevery occurence. They contain stuff like translations, element sizes, theme colors etc.

SO, Now I was reasonably sure that one of these resource files had to contain the password.

I noticed a file called ```values.xml```, it was a large file containing many arrays of data.

There was this one array that stood out from others, I went to its 12th element, and just like the code, got the substring from 12th index,  put it in the password field for PDF, and it opened!!!





