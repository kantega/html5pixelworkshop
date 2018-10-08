# HTML5 Pixel Magic Workshop 


## Requirements 

You need to be able to start a minimal web server. 
For example, you can use Python's built-in web server module, or use npm to install serve.

### Installing python
If you're on OS X or Linux, you should probably have Python installed already. 
If you're using Windows, you can download Python 3 
[here](https://www.python.org/ftp/python/3.6.5/python-3.6.5-amd64.exe).
When installing on Windows, make sure to select "Add Python 3.6 to PATH".

### Installing node/npm
You can download and install Node/npm from [here](https://nodejs.org/en/).

## Getting Started 

You can download the workshop files from https://github.com/kantega/html5pixelworkshop/archive/master.zip

Or, you can use Git to clone the workshop files, by issuing:

    git clone https://github.com/kantega/html5pixelworkshop.git


## Starting the workshop, using Python 3 

1. Open a terminal, and run the following from the project root folder:

        cd dist
        python -m http.server

(Note: You may have to use `python3` if you have both 
Python 2 and Python 3 installed.)

2. Open your browser and navigate to [http://localhost:8000/](http://localhost:8000/).

3. Start solving the tasks!


## Starting the workshop, using Python 2 

1. Open a terminal, and run the following from the project root folder:

        cd dist
        python -m SimpleHTTPServer

2. Open your browser and navigate to [http://localhost:8000/](http://localhost:8000/).

3. Start solving the tasks!

## Starting the workshop, using serve

1. Make sure you have installed Node/npm as described above.
2. Install serve globaly with ```npm install -g serve```
3. Open a terminal, and run the following from the project root folder:

        cd dist
        serve
        
4. Open your browser and navigate to http://localhost:5000
5. Start solving the tasks!