
window.addEventListener("load", function() {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var video = document.querySelector("video");
    var canvas = document.querySelector("canvas");

    var error = document.querySelector(".error");

    var targetColor = {red: 0, green: 255, blue: 0};
    var targetColorDiv = document.querySelector(".target");
    var targetColorText = document.querySelector(".targettext");

    updateTargetColor(targetColor);


    var g = canvas.getContext("2d");

    window.navigator.mediaDevices.getUserMedia({ video:true, audio:false })
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }



    function animationLoop() {

        g.clearRect(0, 0, canvas.width, canvas.height);
        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(0, 0, canvas.width, canvas.height);


        var pixels = imageData.data;

        // pixels is an array color components: [red, green, blue, alpha, red, green, blue, alpha, ..]
        // So, let's iterate over every 4th component:

        var minx = canvas.width;
        var miny = canvas.height;
        var maxx = 0;
        var maxy = 0;

        var numx = [];
        var numy = [];

        for(var i = 0; i < pixels.length; i+=4) {

            var p = i / 4;

            var x = p % canvas.width;
            var y = Math.floor(p/canvas.width);

            // Get each color value (0-255)
            var red = pixels[i];
            var green = pixels[i+ 1];
            var blue = pixels[i+ 2];


            var diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));

            if(diff < 30) {
                pixels[i] = 255;
                pixels[i+1] = 0;
                pixels[i+2] = 255;
                minx = Math.min(minx, x);
                miny = Math.min(miny, y);
                maxx = Math.max(maxx, x)
                maxy = Math.max(maxy, y)
                numx[x] = numx[x] ? numx[x] + 1 : 1;
                numx[y] = numy[y] ? numy[y] + 1 : 1;
            }
        }

        g.putImageData(imageData, 0, 0);


        g.beginPath()
        g.rect(minx, miny, maxx-minx, maxy-miny);
        g.stroke();

        window.requestAnimationFrame(animationLoop);
    }


    window.requestAnimationFrame(animationLoop);



    video.addEventListener("click", function(e) {


        var x = e.layerX;
        var y = e.layerY;

        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(x, y, 1, 1);

        var pixels = imageData.data;

        updateTargetColor({red: pixels[0], green: pixels[1], blue: pixels[2]});

    });

    function updateTargetColor(col) {
        targetColor = col;
        var backgroundColor = "rgba(" + col.red +", " + col.green +", " + col.blue +", 255)";
        targetColorDiv.style.backgroundColor = backgroundColor;
        targetColorText.textContent = backgroundColor;
    }
});