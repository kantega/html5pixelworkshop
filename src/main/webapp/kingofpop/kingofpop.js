
window.addEventListener("load", function() {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    var webcam = document.querySelector("#webcam");
    var king = document.querySelector("#king");
    var canvas = document.querySelector("canvas");
    var bufferCanvas = document.querySelector("#buffercanvas");

    var playing = false;

    var error = document.querySelector(".error");

    var targetColor = {red: 0, green: 255, blue: 0};
    var targetColorDiv = document.querySelector(".target");
    var targetColorText = document.querySelector(".targettext");

    updateTargetColor(targetColor);


    var g = canvas.getContext("2d");

    var bg = bufferCanvas.getContext("2d");

    window.navigator.mediaDevices.getUserMedia({ video:true, audio:false })
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        webcam.src = window.URL.createObjectURL(stream);
        webcam.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }



    function animationLoop() {

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        bg.drawImage(king, 0, 0, canvas.width, canvas.height);

        var imageData = g.getImageData(0, 0, canvas.width, canvas.height);

        var pixels = imageData.data;

        var kingPixels = bg.getImageData(0, 0, canvas.width, canvas.height).data;


        var num = 0;

        for(var i = 0; i < pixels.length; i+=4) {

            var p = i / 4;

            // Get each color value (0-255)
            var red = pixels[i];
            var green = pixels[i+ 1];
            var blue = pixels[i+ 2];


            var diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));

            if(diff < 50) {
                pixels[i+3] = 0;
                num++;
            }
        }

        if(num > 1000) {
            if(!playing) {
                king.play();
                playing = true;
            }

            for(var i = 0; i < pixels.length; i+=4) {
                if(pixels[i+3] == 0) {
                    pixels[i] = kingPixels[i];
                    pixels[i+1] = kingPixels[i+1];
                    pixels[i+2] = kingPixels[i+2];
                    pixels[i+3] = 255;
                }
            }
            g.putImageData(imageData, 0, 0);
        } else {
            if(playing) {
                king.pause();
                playing = false;
            }
        }

        window.requestAnimationFrame(animationLoop);
    }


    window.requestAnimationFrame(animationLoop);



    canvas.addEventListener("click", function(e) {


        var x = e.layerX;
        var y = e.layerY;

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);

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