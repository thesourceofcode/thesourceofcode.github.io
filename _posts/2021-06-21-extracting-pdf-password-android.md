---
layout: single
title: "Reverse Engineering an android app to extract PDF passwords"
excerpt: "How I reverse engineered an android app, and extracted the password used for decrypting its PDF files"
---
**Disclaimer:** This post is for infotainment only. I do not promote any form of hacking or cracking, and neither does this post contain any instructions or software for the same. I have censored any info that could identify the application, to prevent misuse of this knowledge.
{: .notice--danger}


<h2>Backstory</h2>
A few years ago, when I was in high school, one of my friends approached me with a request: He was using an android app to get free notes for studying, but the PDFs downloaded by the app were password protected and could only be opened in the app itself. He wanted to view the PDFs on his computer but couldn't, due to the password protection, so he approached me for help.

Since I had recently started learning about reverse engineering, I thought it would be a fun challenge and agreed to help him.

<h2>Analyzing the app</h2>

I installed the app, and downloaded a few notes. Luckily the PDF files were easily accessible via the file manager app, so it was very easy to just copy them anywhere I wanted.


Instead of decompiling the app and looking through the source, I decided to first see what information I could gather by observing the app's behaviour.

I had a few hypotheses about the location of the passwords that I needed to test:

<ol>
<li>Password stored on a server and never written to persistent storage</li>
<li>Downloaded from the server along with the PDF and then stored on the device</li>
<li>Located inside the apk file of the app</li>
</ol>

I started experimenting to rule out possible scenarios:

<ol>
<li>If the password was never written to persistent storage, then the app couldn't have been able to decrypt the PDF when the phone was offline. But the app was able to open the downloaded PDFs even in the absence of an internet connection, so this scenario was ruled out.</li>

<li>Since I had a rooted device, I started looking for clues in the app's `/data` folder:
<ul>
<li>Shared Preferences: Didn't find any clue here</li>
<li>App SQLite database: Mostly empty, no clue here either</li>
<li>Other files in /data: Didn't find anything of interest here either</li>
</ul>
</li>
</ol>

After searching through the files created by the app, I was almost certain that the passwords were stored in the apk file.

It was time to start decompiling!

<h2>Show me the code!</h2>

I decompiled the app using some freely available apk tools (that I won't name 😉️) and began searching for the code used to decrypt the PDFs.

Since Android Studio provides a built-in code obfuscator called R8 (proguard at that time), most of the code was obfuscated. Fortunately, the names of the decompiled source files were not obfuscated!

Looking through the source, I found a file named ```PDFViewActivity.java```

I though this file had to contain the source for displaying the PDFs, and opened it.

Something instantly caught my eye:

```java
import com.github.64_Caesars_l[redacted].PDFView;
```

Aha! So the app was using an open source library for showing PDFs.

I opened the documentation of the library and started looking for code in the file that matched the documentation.

Inside the onCreate() method, I immediately noticed these 2 lines:

```java
PDFView.b b2 = this.q.a(this.r);
b2.a(((String)this.v.get(12)).substring(12));
```

The first line matched the documentation for the initialization of the library, the code for setting the password had to be nearby too.

<h2>Hunting down the Password</h2>

I was reasonably sure that this line of code:

```java
b2.a(((String)this.v.get(12)).substring(12));
```

was being used to set the password of the PDF.


Let's try to understand what this code is doing:

<ul>
<li>It gets the value at index 12 from an object "v" (obfuscated)</li>
<li>Obtains a substring from that value, starting from index 12</li> 
<li>Uses it for input in the "a" (obfuscated) method</li>
</ul>

On searching for the ```v``` object, I found some other related code:

```java
this.t = this.getResources().obtainTypedArray(2531604097);
this.u = this.getResources().getStringArray(this.t.getResourceId(12, 0));
this.v = new ArrayList((Collection)Arrays.asList((Object[])this.u));
```


So, ```v``` is an ArrayList, created using data from the ```u``` object. ```u``` is an array made by obtaining a resource at index 12 from the ```t``` object.


This clearly implied two things:
<ul>
<li>All PDFs use the same password</li>
<li>The password is stored in a resource file</li>
</ul>


Android apps have these xml files, called resource files or resources that contain stuff to be used throughout the app, to make it easy to change a value without having to individually change its every occurrence. They contain stuff like translations, element sizes, theme colors etc.


I noticed a file called ```arrays.xml```, it was a large file containing many arrays of data.

But one array stood out:

```xml    
<string-array name="Four_URL">
    <item>X3L1LB5rdR9y[redacted]</item>
	<item>cWIvblkyYP==[redacted]</item>
	...
	<item>[redacted]</item>
</string-array>
```

This array contained many long strings of seemingly gibberish data. According to the code, the password was a substring of its 12th element, so I went to its 12th element and
my eyes instantly spotted a legible string in that soup of gibberish. I tried that string as the PDF password, and it opened!!!


<h2>The Aftermath</h2>
My friend was very happy to be able to study on his computer. And I was very happy because I was able to use my knowledge to help someone😊

Also, I sternly warned him not to publish those PDFs anywhere, so that I could stay at the lighter end of the legal grey area. 

<h2>The Takeaway for developers</h2>
Now some of you who work on apps similar to the one in question would probably want to know how to prevent this, and from my limited experience I can say that no matter how hard you try, 
if your app stores some data on the device, a sufficiently determined user will be able to access it. But still taking a few basic steps can make it a lot less attractive to attempt
to access that data.

1. Never store passwords in plaintext
   If the app had stored a password hash instead of the plaintext, it would have been substantially harder for me to obtain the password.
2. Use different passwords for each PDF
2. Completely obfuscate your apps
   A long list of gibberish names can go a long way in deterring skiddies.
3. Instead of hardcoding the data in the apk, use secure storage options like EncryptedSharedPreferences

---

**Note:** As a bonus for reading the whole post, this webpage contains clues for solving a puzzle, which leads to a website. Comment below if you are able to solve it.
First person to solve it will get a mention in my next blog post.
{: .notice--danger}
