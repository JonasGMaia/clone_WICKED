const bgvideo = document.getElementById('bgTitleVideo');

bgvideo.play().catch(error => {
            console.log("autoplay impedido pelo navegador")});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        bgvideo.currentTime = 2;
        bgvideo.play().catch(error => {
            console.log("autoplay impedido pelo navegador")});

    } else{
        bgvideo.pause();
    }
});