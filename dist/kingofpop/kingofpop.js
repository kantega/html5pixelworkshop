window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    const webcam = document.querySelector("#webcam");
    const king = document.querySelector("#king");
    const canvas = document.querySelector("canvas");
    const bufferCanvas = document.querySelector("#buffercanvas");

    // Is the video playing ?
    let playing = false;

    const error = document.querySelector(".error");

    let targetColor = {red: 0, green: 255, blue: 0};
    const targetColorDiv = document.querySelector(".target");
    const targetColorText = document.querySelector(".targettext");


    function animationLoop() {

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        bg.drawImage(king, 0, 0, canvas.width, canvas.height);

        const imageData = g.getImageData(0, 0, canvas.width, canvas.height);

        const pixels = imageData.data;

        const kingPixels = bg.getImageData(0, 0, canvas.width, canvas.height).data;


        let numMatchingPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {

            // Get each color value (0-255)
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];


            // Calculate the color difference
            const diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));


            // TODO: Replace matching pixels with corresponding pixels from kingPixels

            // Count this pixel if matching
            numMatchingPixels++;

        }

        g.putImageData(imageData, 0, 0);

        if (numMatchingPixels > 1000) {
            if (!playing) {
                king.play();
                playing = true;
            }
        } else {
            // The post-it was removed
            // TODO: If the video is playing, pause it

        }

        window.requestAnimationFrame(animationLoop);
    }


    updateTargetColor(targetColor);


    const g = canvas.getContext("2d");

    const bg = bufferCanvas.getContext("2d");

    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        webcam.srcObject = stream;
        webcam.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }

    function getCursorPosition(canvasElement, event) {
        const rect = canvasElement.getBoundingClientRect();
        const xPos = event.clientX - rect.left;
        const yPos = event.clientY - rect.top;
        return {x: xPos, y: yPos};
    }

    canvas.addEventListener("click", function (e) {

        const pos = getCursorPosition(canvas, e);

        g.drawImage(webcam, 0, 0, canvas.width, canvas.height);

        const imageData = g.getImageData(pos.x, pos.y, 1, 1);

        const pixels = imageData.data;

        updateTargetColor({red: pixels[0], green: pixels[1], blue: pixels[2]});

    });

    function updateTargetColor(col) {
        targetColor = col;
        const backgroundColor = "rgba(" + col.red + ", " + col.green + ", " + col.blue + ", 255)";
        targetColorDiv.style.backgroundColor = backgroundColor;
        targetColorText.textContent = backgroundColor;
    }

    window.requestAnimationFrame(animationLoop);

});