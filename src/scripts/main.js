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
    

    const mainNav = document.getElementById('mainNav');
    const region = document.getElementById('region');
    const mainNavMenu = document.getElementById('mainNavMenu');
    
    const burgerMenuButtonHeader = document.querySelector('.burgerMenu');
    
    const trailerOverlay = document.getElementById('trailer-overlay');
    const trailerIframe = trailerOverlay.querySelector('iframe');
    let isTrailerOpen = true;

    const trailerButton = document.getElementById('trailer-btn');

    const OpenCalendarReminder = document.getElementById('OpenCalendarReminder');
    const calendarReminder = document.getElementById('calendarReminder');
    const calendarReminderContainer = document.getElementById('calendarReminder_container');
    isCalendarOpen = false;

    function openCalendar(){
        calendarReminder.classList.add('show');
        calendarReminder.style.visibility = 'visible';
        burgerMenuButtonHeader.classList.add('burgerMenu--close');
        OpenCalendarReminder.classList.add('header_container_button--gradient--hide');
        isCalendarOpen = true;
    }

    function closeCalendar(){
        if (isCalendarOpen) {
            calendarReminder.classList.remove('show');
            calendarReminder.style.visibility = 'hidden';
            OpenCalendarReminder.classList.remove('header_container_button--gradient--hide');

            if (burgerMenuButtonHeader.classList.contains('burgerMenu--close')){
                burgerMenuButtonHeader.classList.remove('burgerMenu--close'); 
            }
            isCalendarOpen = false;
        }
    }

    OpenCalendarReminder.addEventListener('click', openCalendar);
    calendarReminder.addEventListener('click', closeCalendar);
    calendarReminderContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    })

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

    function closeTrailerPopout() {
        if (isTrailerOpen) {
            trailerOverlay.classList.remove('show');
            burgerMenuButtonHeader.classList.remove('burgerMenu--close');
            isTrailerOpen = false;
            /*if (trailerIframe && trailerIframe.src.includes("youtube.com")) { 
                trailerIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
            isTrailerOpen = false;
            const currentSrc = trailerIframe.src;
            trailerIframe.src = ''; 
            trailerIframe.src = currentSrc;*/
            if (trailerIframe) {
                // Comando para PAUSAR o vídeo (tentativa)
                trailerIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                
                // Reinicia o src do iframe para garantir que ele volte ao estado inicial (parado)
                // e comece do zero na próxima vez que for aberto.
                // Isso pode causar um pequeno "flash" visual.
                const currentSrc = trailerIframe.src;
                trailerIframe.src = '';
                trailerIframe.src = currentSrc;
            }

            if (burgerMenuButtonHeader.classList.contains('burgeMenu--close')) {
                burgerMenuButtonHeader.classList.remove('burgerMenu--close');
                mainNav.classList.remove('main-nav--is-visible');
                mainNavMenu.classList.remove('main-nav_container--is-visible');
                region.classList.remove('region--is-visible');
            }
        }
    }

    trailerOverlay.addEventListener('click', closeTrailerPopout);
    trailerOverlay.querySelector('.trailer-popout_container').addEventListener('click', (event) => {
        event.stopPropagation();
    });

    function openTrailerPopout() {
        if (!isTrailerOpen) {
            trailerOverlay.classList.add('show');
            trailerOverlay.style.visibility = 'visible';
            isTrailerOpen = true;
            

            if (!burgerMenuButtonHeader.classList.contains('burgerMenu--close')) {
                burgerMenuButtonHeader.classList.add('burgerMenu--close');
            }
            mainNav.classList.remove('main-nav--is-visible');
            mainNavMenu.classList.remove('main-nav_container--is-visible');
            region.classList.remove('region--is-visible');

            if (trailerIframe) {
                // É necessário um pequeno atraso para garantir que o iframe esteja "pronto"
                // para receber o comando após ser exibido.
                setTimeout(() => {
                    trailerIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                }, 100); // Pequeno atraso, pode ser ajustado se necessário
            }

        }
    }

    if (trailerButton){
        trailerButton.addEventListener('click', openTrailerPopout);
    }

    


    function toggleNav(){
        if (isCalendarOpen) {
            burgerMenuButtonHeader.classList.remove('burgerMenu--close');
            closeCalendar();
            isCalendarOpen = false;
            return;
        }
        if (isTrailerOpen) {
            burgerMenuButtonHeader.classList.remove('burgerMenu--close');
            closeTrailerPopout();
        }else{
            burgerMenuButtonHeader.classList.toggle('burgerMenu--close');
            mainNav.classList.toggle('main-nav--is-visible');
            mainNavMenu.classList.toggle('main-nav_container--is-visible');
            region.classList.toggle('region--is-visible');

            let isNavOpen = mainNav.classList.contains('main-nav--is-visible');

            if (mainNav.classList.contains('main-nav--is-visible')) {
                footer.style.visibility = "hidden";
                isFooterVisible = false;
                return;
            } else {
                footer.style.visibility = "visible";
                handleScroll();
            }
        }
    };

    burgerMenuButtonHeader.addEventListener('click', toggleNav);


    


    const handleScroll = () => {
        const curentScrollY = window.scrollY;
        const documentHeight = document.body.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollThreshold = 100;

        let isNavCurrentlyOpen = mainNav.classList.contains('main-nav--is-visible');

        if (mainNav.classList.contains('main-nav--is-visible') || trailerOverlay.classList.contains('show')) {
            footer.classList.remove('footer--is-visible');
            isFooterVisible = false;
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
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    trailerOverlay.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && !trailerOverlay.classList.contains('show')) {
            trailerOverlay.style.visibility = 'hidden';
        }
    });

    if (isTrailerOpen) {
        mainNav.classList.remove('main-nav--is-visible');
        mainNavMenu.classList.remove('main-nav_container--is-visible');
        region.classList.remove('region--is-visible');
        burgerMenuButtonHeader.classList.add('burgerMenu--close');
    }

});

