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

document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('mainNav');
    const burgerMenuButtonHeader = document.querySelector('.header_container_button .burgerMenu');
    const burgerMenuButtonNav = document.querySelector('#mainNav .burgerMenu');

    function toggleNav(){
        mainNav.classList.toggle('main-nav--is-visible');
        burgerMenuButtonHeader.classList.toggle('burgerMenu--close');
        burgerMenuButtonNav.classList.toggle('burgerMenu--close');
    }

    burgerMenuButtonHeader.parentElement.addEventListener('click', toggleNav);
    burgerMenuButtonNav.parentElement.addEventListener('click', toggleNav);

});