window.addEventListener("load", function () {

    // See overview of <video> events and properties:
    // https://www.w3.org/2010/05/video/mediaevents.html

    const video = document.querySelector("video");
    const playButton = document.querySelector("#play");
    const pauseButton = document.querySelector("#pause");
    const elapsed = document.querySelector("#elapsed");

    video.addEventListener("timeupdate", function () {
        const currentTime = video.currentTime;
        const totalDuration = video.duration;

        // TODO: Hmmm, how far are we really?
        elapsed.style.marginLeft = 30 + "%";
    });

    playButton.addEventListener("click", function () {
        // TODO: How do we play the video?
    });


    // TODO: Should add similar event listener for pauseButton


});