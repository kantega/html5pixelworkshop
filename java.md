#  Installing Java

## Windows
Download [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

When the JDK is installed we need to set the environment variable JAVA_HOME.
* [Set it permanently](https://confluence.atlassian.com/doc/setting-the-java_home-variable-in-windows-8895.html)
* Or: In the console run 

                set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_XXX
Where XXX is the version you have installed
## Mac
Download [Java JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* [Follow this guide](http://www.mkyong.com/java/how-to-set-java_home-environment-variable-on-mac-os-x) to set it permanently
* Or: Execute 
             
             export JAVA_HOME=$(/usr/libexec/java_home)
to set it just for the current terminal session.
## Linux
First find where the JDK is installed: 
* If you installed from [repo](http://www.webupd8.org/2014/03/how-to-install-oracle-java-8-in-debian.html) the path to use as JAVA_HOME is */usr/lib/jvm/java-8-oracle* (recommended) 
* If you download the .tar.gz [from oracle.com](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), just unzip it - this is the path to use as JAVA_HOME.
* If you installed the .rpm [from oracle.com](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) the the path to use as JAVA_HOME is */usr/java/latest*

Now either run the command
        
        export JAVA_HOME=XXX
directly to set it just for this terminal session, or the same command to the file */etc/profile* to set it permanently.
