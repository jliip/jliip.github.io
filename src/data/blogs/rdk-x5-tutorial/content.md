# RDK X5超新手入门教程：从系统烧录到yolov5物体识别-RDKX5地瓜机器人

###  前言：

**本人在此之前没有太多使用Ubuntu板载系统的开发经验，而RDK X5又是刚刚发行的开发板，存在的教程资料比较少，因此在开始阶段踩过一些坑。希望能通过这篇blog给跟我一样的纯新手一个简易的入门教程，并附上每一步的解释方便学习。blog将从前期需要的装备出发，讲解系统烧录，WIFI连接,最后到YOLOv5的样例测试以及远程连接。**

我参考的blog：[[RDK X5][001]初见地瓜机器人RDK X5：配置与简单测试-CSDN博客](https://blog.csdn.net/weixin_64677511/article/details/142444529 "\[RDK X5\]\[001\]初见地瓜机器人RDK X5：配置与简单测试-CSDN博客")

及官方教程 ：[地瓜开发者社区首页](https://developer.d-robotics.cc/ "地瓜开发者社区首页")

###  前期准备

需要的相关配套设备。 TF卡/显示屏/HDMI线（请注意存在三种不同规格的HDMI)

首先不得不强调的是TF卡，也可以叫micro SD卡。TF卡和SD卡的区别就是一个大小的问题，以下图的三星卡为例，左侧小的这个就是TF， ~~把TF放入大的卡槽组合起来就是SD卡~~ 。一般购买时都会同时提供这两者，可以凭自己需要使用。绝大部分笔记本电脑提供的是SD卡槽，而这里我们使用TF卡槽。最好准备32G及以上的TF卡。

![](https://i-blog.csdnimg.cn/direct/55ac7eb0bc4d441cb942591ba5b3061a.jpeg)

其次是显示屏，及与显示屏配套的HDMI线材。虽然存在远程连接方式（如VNC/SSH),但这些功能的打开需要预先使用micro usb连接上板子进行多步设置，更适合在后续扩展。有一块显示屏直接显示图形桌面（desktop）无疑能省下很多事，因此推荐预先备好一块显示屏。而显示屏与X5连接靠的就是HDMI。但请注意，HDMI存在三种不同规格的接口，即 HDMI/HDMI micro/HDMI mini。在RDK X5中，提供的是HDMI Micro接口。因此你应该挑选与自己的显示屏（通常是HDMI或HDMI Micro）和RDK X5适配的线材。而树莓派5使用HDMI mini接口， ~~更加地阴间。~~

鼠标，键盘。推荐使用USB端口与RDK X5连接。2.0或3.0没什么讲究，一般3.0更常用。也可以使用蓝牙连接，但跟上述的SSH，VNC一样，需要预先进行设置，因此这里更加推荐一开始先用USB的鼠标，键盘。

* * *

###  系统安装

以下是RDK的规格参数

CPU| 8X A55@1.5GHz(ARM64架构）
---|---
BPU| 10 TOPS
GPU| 32Gflops
内存| 4GB/8GB LPDDR4
存储| NA,supports external Micro SD card
多媒体|

H.265(HEVC)Main Profile @L5.1,H.264(AVC) Baseline/Constrained Baseline/Main/High Profiles@ L5.2 with SVC-T encoding

H.265/H.264 encoding and decoding up to 3840x2160@60fps

Sensor| 2 x 4-lane MIPI DSI
USB Host| 4 x USB 3.0 hOST INTERFACES(tpye A)
USB Device| 1 xUSB 2.0 Device interface(Tpye-C)
耳机接口| 1x 3.5mm headphone jack audio input/output
显示接口|

1x HDMI Type-A port supporting up to 1090p60

1 x MIPI DSI 4 Lane

有线网络| 1x Gigabit Ethernet RJ45 port with PoE
无线网络|

Wi-Fi 6 BlueTOOTH 5.4

6 Bluetooth 5.4CAN| 1x CAN FD
其他IO| 28 GPIOs
电源输入| 5V/5A
系统支持| Ubuntu 22.04

可参考地瓜的官方教程：[地瓜开发者社区首页](https://developer.d-robotics.cc/ "地瓜开发者社区首页")

如果IP在海外，目前打开网页看到的海外版官网尚未更新X5的文档， **需要翻回国。**

将你希望烧录系统的tf卡连接至电脑，可以使用读卡器或组合成大sd卡。

打开[Index of /downloads/os_images/](https://archive.d-robotics.cc/downloads/os_images "Index of /downloads/os_images/")下载x5的安装包。点开 rdx_x5/ 后显示的就是目前存在的rdk os版本，可以自行选择最新版。最后需要挑选下安装的类型，一般而言我们会使用拥有图形化桌面的版本，即desktop。将两个desktop安装包下载到电脑，解压。比较小的安装包无需烧录，主要目的是监督大安装包下载不出现传输错误。

![](https://i-blog.csdnimg.cn/direct/d5378a8011f245e59b477af39741a36d.jpeg)

解压完成后，以管理员身份打开PC端启动盘制作工具balenaEtcher，下载链接：[balenaEtcher - Flash OS images to SD cards & USB drives](https://etcher.balena.io/ "balenaEtcher - Flash OS images to SD cards & USB drives")

![](https://i-blog.csdnimg.cn/direct/cb586d7d275648d1a1171e553c9cf862.png)

![](https://i-blog.csdnimg.cn/direct/129e3fec0ef145aeae621c44bb787a89.png)

点击从文件烧录，选择刚刚解压的.img文件，随后选择目标磁盘，确认是你准备使用的SD卡，点击“现在烧录！”烧录完成后可关闭balenaEtcher并取出SD卡。

**不能给RDK供电后再插入SD卡。（SD卡不支持热插拔）**

* * *

### 启动系统

首先保证RDK X5处于断电状态，将TF卡存在金属条的那面，贴向开发板板面放入位于开发板背面的卡槽中。连接与显示屏的HDMI线，最后通过正面最左侧的tpye-c接口给RDK X5提供5V 5A的输入电源。

在开发板的正面存在两颗状态指示灯，绿灯代表开发板供电正常，橙灯代表系统运行正常。如果在上电一段时间（例如15秒）后发现橙灯没亮，说明系统烧录存在问题，需要检查下是否文件烧录出错或损坏。

系统启动需要一定时间，如果启动成功能在显示屏处看到D-Robotics的Ubuntu Desktop界面。开发板的HDMI和USB支持热插拔，所以可以连接鼠标键盘。也可以在上电前连接。

![](https://i-blog.csdnimg.cn/direct/4c66efc216904a0e97ade724890f740c.jpeg)

* * *

### 配置网络

Ubuntu桌面的右上角可以看到wifi，点开后选择希望连接的无线网络输入账号密码即可。

![](https://i-blog.csdnimg.cn/direct/241f205107754e29a6b1cd2dd48b16ed.png)

#### eduroam校园网

然而，如果跟博主一样希望使用eduroam的校园网就会麻烦一点。可以参考以下设置：

Security选择WPA & WPA2 Enterprise

Authentication 选择 Protected EAP(PEAP)

跳过Anonymous identity 及 Domain。

CA certificate 可以直接勾选No CA certificate is required

PEAP version 选择 Automatic

Inner authentication 选择MSCHAPv2

最后输入你的校园网账号密码即可。

连接成功后可以看到：

![](https://i-blog.csdnimg.cn/direct/18999f228c6f4233acf50f4fb401af01.png)

* * *

### 可选：SSH/VNC

即使不进行SSH/VNC设置也能跑内置的yolo算法。如果你想先跑一下试试，可以先跳过这个部分直接看后面的yolov5。

配置完WiFi后，你的RDK X5将拥有一个动态IP地址。 **当你的电脑设备与开发板连接到同一个网络时，就可以使用该局域网下的动态IP地址进行SSH与VNC的连接。** 开发板在开关机后，依然能保持分配给开发板的该局域网下的动态IP地址，这意味着经过一次设置后，你的设备能一直保持与开发板的连接，不需重复设置。

首先，你应该获取自己的动态IP地址。

在桌面正下方提供的黑色方框$_ “Terminal”中输入: ifconfig

找到wlan0:中的inet，后面的一串就是你的动态IP地址。

![](https://i-blog.csdnimg.cn/direct/63028baf60af4f509b6061e810fe32fe.png)

之后，需要打开system选择RDK Configuration。

![](https://i-blog.csdnimg.cn/direct/c258105d82c54e5eb0f7edf9417a8d85.png)

选择第三个，Interface Options。

![](https://i-blog.csdnimg.cn/direct/4d40b78ed26246e78fe0ceaf6f2eff53.png)

打开来可以看到SSH和VNC这两个我们需要的连接。在后续的连接设置中，你可以在这里找到板载的SSH/VNC 使能开关。

![](https://i-blog.csdnimg.cn/direct/6d89c9870e2a4955a88328d23654633a.png)

* * *

####  SSH

按照上一步的介绍选择11 SSH。首次设置需要输入账号密码，同样可以都输入sunrise。password的输入需要重复输入一遍在verify处，注意在输入密码时，屏幕处并不会显示你的输入。同样，也可以设置关闭。在下图的界面中选择Yes即使能打开，No则关闭SSH连接。默认状态下，SSH打开。

![](https://i-blog.csdnimg.cn/direct/91715f310b514dc9b4e9eb4de218d907.png)

在你希望连接到开发板的设备处，我们将使用MobaXterm进行RDK X5的SSH连接。注意MobaXterm只有Windows版本。

下载连接：[MobaXterm free Xserver and tabbed SSH client for Windows](https://mobaxterm.mobatek.net/ "MobaXterm free Xserver and tabbed SSH client for Windows")

打开将看到下图界面。点击左上方的Session。

![](https://i-blog.csdnimg.cn/direct/53a8518be6f8479291dbea8b12c5a0b3.png)

点击SSH

![](https://i-blog.csdnimg.cn/direct/0d00ceadee2a43c1b8fb436980171812.png)

在Remote host处输入你之前获得的动态IP地址，Specify usename处输入sunrise，点击OK。

![](https://i-blog.csdnimg.cn/direct/4cf19c4de5164e93b93645021275890c.png)

点击“OK”后，正常会弹出首次登录提醒，“Accept”即可。

随后输入用户账号与用户密码，同样都是sunrise。登录成功将看到如下画面。

![](https://i-blog.csdnimg.cn/direct/06cbae8c50274522b8bc35a6a4680fee.png)

或者，你可以直接通过电脑的指令界面连接SSH。同时按下Win+R，输入cmd

![](https://i-blog.csdnimg.cn/direct/e0d91d98452347b499450cfb18c7e5ec.png)

点击确定，打开命令栏后，输入 ssh sunrise@你先前得到的IP地址，回车。系统会要求输入密码，同样输入sunrise既可（依然不会显示输入）。成功连接后，会看到以下界面。

![](https://i-blog.csdnimg.cn/direct/01104fbd83194da8927d755e3be03f2d.png)

然而，SSH会为你提供远程使用RDK X5的功能，可以正常跑指令，却不能直接看到RDK的desktop。

如果希望能远程在开发板的desktop上进行操作，可以使用VNC。

* * *

#### VNC

VNC的板载设置：按照先前的设定找到VNC。首次设置需要输入账号密码，同样可以都输入sunrise。password的输入需要重复输入一遍在verify处，注意在输入密码时，屏幕处并不会显示你的输入，但实际已经成功输入。最后，系统会问是否想要提供一个view-only password，意味着在PC处输入这个账号密码只会拥有查看开发板界面的权限，而无权限修改。如果不需要此功能，可以直接输入n。需要输入y，并输入其他的用户名与密码。

![](https://i-blog.csdnimg.cn/direct/70109bfd927346b19db020f12a7dd483.png)

VNC下载链接：[Download VNC Viewer by RealVNC®](https://www.realvnc.com/en/connect/download/viewer/ "Download VNC Viewer by RealVNC®")

VNC提供 Windows, Mac, Linux, Raspberry pi等常用操作系统版本。

![](https://i-blog.csdnimg.cn/direct/7b6cab25ce764e9cb101491a5e65efa9.png)

下载完电脑对应版本后，在上方的“Enter a VNC Server address or search”处输入你先前获取的动态IP地址。登录时会弹出一个连接未加密的提示。不希望以后打开会看到此提示可以点击Don't warm me about this again,后点击continue。

输入password “sunrise”，希望不用重复输入密码勾选remember, 点击OK。

成功下将能看到以下画面。你可以在开发板处于开机状态时，通过SSH/VNC方式远程连接到开发板。

![](https://i-blog.csdnimg.cn/direct/2ed8aff17e2e4eca92806dd26e77edac.png)

* * *

### Yolov5

非常方便的是，RDK X5已经封装好了yolov5及相关的库（如opencv），可以直接通过指令运行提供的样例测试。

![](https://i-blog.csdnimg.cn/direct/fa08bf3a104c4253adab8a929cee3c19.png)

在设备中，这些样例放置在file System下的app文件中。点击pydev_demo，可以看到13个目标识别样例。

![](https://i-blog.csdnimg.cn/direct/5cb438e649b048ccafe05e94625ba4bf.png)

包括mipi/usb摄像头输入的实时目标检测，以及yolov3，yolov5的多个版本。后续可以根据自己的需要对于样例进行修改并应用。目前，我们先以简单的yolov5_sample为例：

点开terminal，输入：cd /app/pydev_demo/07_yolov5_sample/

（转到测试样例对应的文件目录。）

接着，输入：sudo python3 ./test_yolov5.py (运行当前文件下的test_yolov5.py文件）

![](https://i-blog.csdnimg.cn/direct/4950055a085d42a5ab12352cd8512cfc.png)

运行完成后，测试样例所在的Terminal中将出现识别成功的坐标信息，准确度概率，识别类型编码id（在coco128数据集中的类型编码），识别名称信息。

![](https://i-blog.csdnimg.cn/direct/439403f40be14977936644035dcde8d7.png)

返回到07_yolov5_sample文件夹，此时将多出一张output_image.jpg,就是yolo运行后的输出结果。

![](https://i-blog.csdnimg.cn/direct/1b7859b39a1c4823a0e50d9ee61e46cb.png)

###

**_到此，我们已经成功完成了RDK X5的基本设置，并且成功运行了一个简单的目标识别检测样例。_**

你可以使用同样的方式 cd 到你希望运行的程序所在的文件目录， 并使用 sudo 指定python3运行指定的文件。

* * *

### 后记

目前实测未修改的usb_camera_sample可以运行到20fps，基本满足性能需求。

在开发板的desktop中，可以点击RDK Manual查看地瓜机器人提供的官方论坛教程，包括开始的应用以及后续的开发扩展。

![](https://i-blog.csdnimg.cn/direct/0b1fd87cadfa46e09b29c032d9e72caf.png)

感谢观看，收藏与交流，若有不足欢迎提出！