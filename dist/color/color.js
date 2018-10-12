window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    const video = document.querySelector("video");
    const canvas = document.querySelector("canvas");

    const error = document.querySelector(".error");


    const g = canvas.getContext("2d");


    function animationLoop() {

        g.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = g.getImageData(0, 0, canvas.width, canvas.height);

        const pixelColors = imageData.data;

        // pixelColors is an array color components: [red, green, blue, alpha, red, green, blue, alpha, ..]
        // So, let's iterate over every 4th component:

        for (let i = 0; i < pixelColors.length; i += 4) {

            // Get each color value (0-255)
            const red = pixelColors[i];
            const green = pixelColors[i + 1];
            const blue = pixelColors[i + 2];

            // TODO: insert your solution here!
        }
        g.putImageData(imageData, 0, 0);

        window.requestAnimationFrame(animationLoop);
    }


    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(getUserMediaSuccess)
        .catch(userMediaFailed);


    function getUserMediaSuccess(stream) {
        video.srcObject = stream;
        video.play();
    }

    function userMediaFailed(err) {
        error.innerHTML = "Failed to get user media: " + err.name + " " + err.message;
        error.classList.remove("hide")
    }


    window.requestAnimationFrame(animationLoop);

});
