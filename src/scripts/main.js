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

    const openShareMenu = document.getElementById('openShareMenu');
    const closeShareMenu = document.getElementById('closeShareMenu');
    const menuShare = document.getElementById('menuShare');
    const overlay =  document.getElementById('overlay');
    let isOverlayVisible = false;

    const footer = document.querySelector('.footer');
    let lastScrollY = window.scrollY;
    let isFooterVisible = false;
    let isNavOpen = false;

    const mainNav = document.getElementById('mainNav');
    const region = document.getElementById('region');
    const mainNavMenu = document.getElementById('mainNavMenu');
    
    const burgerMenuButtonHeader = document.querySelector('.header_container_button .burgerMenu');
    const burgerMenuButtonNav = document.querySelector('#mainNav .burgerMenu');

    function openMenu(){
        overlay.style.display = "block";
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            menuShare.classList.add('show');
        });
        isOverlayVisible = true;
    }

    function closeMenu(){
        menuShare.classList.remove('show');
        overlay.classList.remove('show');
        overlay.removeEventListener('transitionend', handleOverlay);
        overlay.addEventListener('transitionend', handleOverlay);
        isOverlayVisible = false;
    }

    function handleOverlay(event){
        if (event.propertyName === 'opacity' && !overlay.classList.contains('show')) {
            overlay.style.display = 'none';
            overlay.removeEventListener('transitionend', handleOverlay);
        }
    }

    openShareMenu.addEventListener('click', openMenu);
    closeShareMenu.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    menuShare.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    function toggleNav(){
        mainNav.classList.toggle('main-nav--is-visible');
        mainNavMenu.classList.toggle('main-nav_container--is-visible');
        region.classList.toggle('region--is-visible');

        isNavOpen = mainNav.classList.contains('main-nav--is-visible');

        if (isNavOpen) {
            footer.classList.remove('footer--is-visible');
            isFooterVisible = false; }

        else{
            handleScroll();
        }
        
        burgerMenuButtonHeader.classList.toggle('burgerMenu--close');
        burgerMenuButtonNav.classList.toggle('burgerMenu--close');
    }

    burgerMenuButtonHeader.parentElement.addEventListener('click', toggleNav);
    burgerMenuButtonNav.parentElement.addEventListener('click', toggleNav);


    const handleScroll = () => window.scrollY;
        const curentScrollY = window.scrollY;
        const documentHeight = document.body.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollThreshold = 100;

        if (isNavOpen) {
            return; 
        }

        if (currentScrollY + viewportHeight >= documentHeight - scrollThreshold) {
            if (!isfootervisible){
                footer.classList.add('footer--is-visible');
                isFooterVisible = true;
            }                                                                                                                         
        } else{
            
            if (currentScrollY < lastScrollY && isFooterVisible) {
                footer.classList.remove('footer--is-visible');
                isFooterVisible = false;
            }
        }

});