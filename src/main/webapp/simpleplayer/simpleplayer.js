
window.addEventListener("load", function() {

    var video = document.querySelector("video");
    var playButton = document.querySelector("#play");
    var pauseButton = document.querySelector("#pause");
    var elapsed = document.querySelector("#elapsed");

    video.addEventListener("timeupdate", function() {
        elapsed.style.width = Math.ceil(video.currentTime * 320 / video.duration) +"px";
    });

    playButton.addEventListener("click", function() {
        video.play();
    });


    pauseButton.addEventListener("click", function() {
        video.pause();
    });


});