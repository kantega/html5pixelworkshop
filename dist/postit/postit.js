window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");

    const error = document.querySelector(".error");

    let targetColor = {red: 0, green: 255, blue: 0};
    const targetColorDiv = document.querySelector(".target");
    const targetColorText = document.querySelector(".targettext");

    updateTargetColor(targetColor);


    const g = canvas.getContext("2d");

    const constraints = {video: true, audio: false};

    window.navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
            error.classList.remove("hide")
        });


    function animationLoop() {

        g.clearRect(0, 0, canvas.width, canvas.height);
        g.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = g.getImageData(0, 0, canvas.width, canvas.height);


        const pixels = imageData.data;

        // pixels is an array color components: [red, green, blue, alpha, red, green, blue, alpha, ..]
        // So, let's iterate over every 4th component:

        let leftMost = canvas.width;
        let topMost = canvas.height;
        let rightMost = 0;
        let bottomMost = 0;


        for (let i = 0; i < pixels.length; i += 4) {

            // Pixel index
            const p = i / 4;

            // Calculate X and Y positions
            const x = p % canvas.width;
            const y = Math.floor(p / canvas.width);

            // Get each color value (0-255)
            const red = pixels[i];
            const green = pixels[i + 1];
            const blue = pixels[i + 2];


            // Calculate the difference between actual and target color in 3D vector space
            const diff = Math.sqrt(Math.pow(targetColor.red - red, 2)
                + Math.pow(targetColor.green - green, 2)
                + Math.pow(targetColor.blue - blue, 2));

            // TODO: Find a better threshold to give a tighter match?
            const threshold = 70;

            if (diff < threshold) {
                // TODO: Replace the pixel values to create a different color


                // Update the leftmost, topmost, rightmost and bottommost locations
                leftMost = Math.min(leftMost, x);
                topMost = Math.min(topMost, y);
                rightMost = Math.max(rightMost, x);
                bottomMost = Math.max(bottomMost, y);
            }
        }

        g.putImageData(imageData, 0, 0);


        // TODO: Use leftMost, rightMost, topMost, bottomMost, to draw a bounding box around the Post-it

        window.requestAnimationFrame(animationLoop);
    }


    window.requestAnimationFrame(animationLoop);

    function getCursorPosition(canvasElement, event) {
        const rect = canvasElement.getBoundingClientRect();
        const xPos = event.clientX - rect.left;
        const yPos = event.clientY - rect.top;
        return {x: xPos, y: yPos};
    }

    video.addEventListener("click", function (e) {
        const pos = getCursorPosition(video, e);
        g.drawImage(video, 0, 0, canvas.width, canvas.height);
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
});