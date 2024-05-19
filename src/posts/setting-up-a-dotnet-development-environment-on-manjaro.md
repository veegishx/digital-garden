---
author: Veegish Ramdani
title: Setting up a .NET development environment on Manjaro
description: Configuring a dotnet development environment on Manjaro linux
date: '2021-06-23'
categories:
  - Manjaro
  - C#
  - Dotnet
  - Coding
  - Linux
  - Debug Log

featured: true
published: true
thumbnail: images/setting-up-a-dotnet-development-environment-on-manjaro/thumbnail.jpg
---

<script>
    import Image from 'svimg/Image.svelte';
    import ImageCaption from './image-caption.svelte';
</script>

I have recently been exploring C# at work and decided to set up a development environment on my personal workstation, which is currently running Manjaro Ornara 21.0.7.

I initially checked the official documentation for [installing .NET on Linux](https://docs.microsoft.com/en-us/dotnet/core/install/linux) but there were no mention of arch-based systems instructions, although it included a snap package as an option for operating systems which were not listed, but I opted not to install it that way in case it [doesn't play well with other development tools](https://github.com/OmniSharp/omnisharp-vscode/issues/3077). I tend to stay away from snap packages in general anyway.

As a result I chose to install the packages that were needed manually. According to the documentation, all we need to have to build .NET applications is the .NET SDK. The SDK contains all the tools needed to develop applications as well as the runtime, which is needed to run those applications. However in Arch, the SDK and the runtime engine are shipped as separate packages, so we can't just install the SDK and expect to have a full working setup.

Installing .NET SDK and runtime engines
The packages we need are [`dotnet-sdk`](https://archlinux.org/packages/community/x86_64/dotnet-sdk/), [`dotnet-runtime`](https://archlinux.org/packages/community/x86_64/dotnet-runtime/) and [`aspnet-runtime`](https://archlinux.org/packages/community/x86_64/aspnet-runtime/). They can be easily installed using pacman:

```bash
pacman -S dotnet-sdk dotnet-runtime aspnet-runtime
```

To verify which SDK and runtimes have been installed, run the following command:

```bash
dotnet --list-sdks && dotnet --list-runtimes
```

<ImageCaption>
  <Image class="inline-basic-image" src="images/setting-up-a-dotnet-development-environment-on-manjaro/setting-up-a-dotnet-development-environment-on-manjaro-screenshot-1.png" />
</ImageCaption>

Once the packages are installed, check whether the dotnet executable is located at `/usr/bin/dotnet` by running `whereis dotnet`, otherwise some issues may arise.

If it's not located there, create the file `/etc/profile.d/dotnet.sh` as suggested by this thread and add the following contents:

```bash
export DOTNET_ROOT=/opt/dotnet
export MSBuildSDKsPath=$DOTNET_ROOT/sdk/$(${DOTNET_ROOT}/dotnet --version)/Sdks
export PATH=${PATH}:${DOTNET_ROOT}
```

Then add the following to your bash profile - (`~/.bashrc` by default) :

```bash
export PATH="$PATH:/home/YOUR_USER_NAME/.dotnet/tools"
```

You should now be able to create and execute .NET apps. To make sure everyting is working properly, let's initialize a basic .NET app.

Create a new directory for the app, cd into it and run dotnet new console. This will generate a basic hello world console application which includes a Program.cs file.

To run the program generated, run the command:

```bash
dotnet run Program.cs
```

If it outputs Hello World! without any errors then you are good to go!

<ImageCaption>
  <Image class="inline-basic-image" src="images/setting-up-a-dotnet-development-environment-on-manjaro/setting-up-a-dotnet-development-environment-on-manjaro-screenshot-2.png" />
</ImageCaption>
