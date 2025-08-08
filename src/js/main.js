jQuery(document).ready(function ($) {
    window.App = window.App || {};
    App.winLocHash       = window.location.hash;
    App.$body            = $('body');

    	// opening popups
        App.$body.on('click touch', '.open-dialog, .open-popup, .open-form, .open-modal', function (event) {
            console.log(event)
            event.preventDefault();
            const category = $(this).attr('href');
            const $dialogs = $('.dialogs');
            const $categoryDialogs = $dialogs.find(category);
            const $flexPopup = $dialogs.find('.flex-popup');
            const popupCategory = category.slice(1);
    
            if (popupCategory !== 'policy') {
                localStorage.setItem('popup', popupCategory);
            }
    
            if (popupCategory === 'list') {
                App.$body.css({ 'overflow-y': 'hidden' });
                $dialogs.css({ 'overflow-y': 'hidden' });
            }
    
            $dialogs.find('.popup').removeClass('active').hide();
    
            if (!$categoryDialogs.length) {
                console.log(`Попап с ID ${category} не найден.`);
                return false;
            }
    
            $dialogs.find('.popup').removeClass('active').hide();
            $categoryDialogs.show();
            $dialogs.show();
    
            $flexPopup.addClass('popup--' + popupCategory);
            $dialogs.animate({ opacity: 1 }, 300, () => {
                $categoryDialogs.addClass('active');
                App.$body.css({ 'overflow-y': 'hidden' });
            });
    
            pauseOtherVideos('.video-box');
    
            return false;
        });
    
        // closing popups
        $('.dialogs').on('click touch', '.close, .close-bg', function () {
            const $dialogs = $('.dialogs');
            const $flexPopup = $dialogs.find('.flex-popup');
            const $activePopup = $dialogs.find('.popup.active');
            const popupId = $activePopup.attr('id');
    
            const bodyScroll = () => {
                App.$body.css({ 'overflow-y': 'auto' });
            };
    
            const removeClassPopup = () => {
                $flexPopup.removeClass(function (index, className) {
                    return (className.match(/popup--\S+/g) || []).join(' ');
                });
            };
    
            const $popupActive = $flexPopup.find('.popup.active');
    
            if (popupId === 'cart') { // Корзина
                $popupActive.animate({ right: '-100%', opacity: 0 }, 600, function () {
                    $dialogs.animate({ opacity: 0 }, 300, function () {
                        $dialogs.find('.popup').removeClass('active').hide();
                        $popupActive.removeAttr('style');
                        $dialogs.hide();
                        $dialogs.find('.thanks-popup').hide();
                        removeClassPopup();
                    });
                    bodyScroll();
                });
    
            } else if (popupId === 'policy') { // Политика конфиденциальности
    
                $popupActive.removeClass('active').hide();
    
                let popupCategory = localStorage.getItem('popup');
    
                // Открываем popup с соответствующим ID
                const $popupToOpen = $('.dialogs #' + popupCategory);
                if ($popupToOpen.length) {
                    $popupToOpen.addClass('active').show();
                    $dialogs.show();
                } else {
                    console.log('Попап с ID ' + popupCategory + ' не найден.');
                }
    
            } else if (popupId === 'details') { // Детали преимуществ
    
                $popupActive.animate({ top: '100%', opacity: 0 }, 600, function () {
                    $dialogs.animate({ opacity: 0 }, 400, function () {
                        $dialogs.find('.popup').removeClass('active').hide();
                        $popupActive.removeAttr('style');
                        $dialogs.hide();
                        removeClassPopup();
                    });
                    bodyScroll();
                });
    
            } else if (popupId === 'list') {
    
                $popupActive.animate({ bottom: '-100%', opacity: 0 }, 600, function () {
                    $dialogs.animate({ opacity: 0 }, 300, function () {
                        $dialogs.find('.popup').removeClass('active').hide();
                        $popupActive.removeAttr('style');
                        $dialogs.hide();
                        removeClassPopup();
                    });
                    bodyScroll();
                });
    
            } else { // Остальные окна
    
                $popupActive.removeClass('active').hide();
                $dialogs.animate({ opacity: 0 }, 300, function () {
                    $dialogs.hide();
                    $dialogs.find('.thanks-popup').hide();
                    removeClassPopup();
                    bodyScroll();
                });
            }
            pauseOtherVideos('.swiper-slide');
        });
    try {
        window.frontpage_work_slider = new Swiper('.our-works__slider', {
            slidesPerView: 1,
            spaceBetween: 36,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1024: {
                    slidesPerView: 3,
                },
                620: {
                    slidesPerView: 2,
                }
            }
        })
    } catch (err) {
        window.frontpage_work_slider = false;
        
    }

    try {
        window.deffectsSlider = new Swiper('.deffects__slider-mobile', {
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
              768: {
                enabled: false, 
              }
            }
          });
    } catch(err) {
        window.deffectsSlider = false;
    }

    $('.faq__question').click(function () {
        const item = $(this).closest('.faq__item');
  
        // Закрыть другие
        $('.faq__item').not(item).removeClass('active').find('.faq__answer').slideUp();
  
        // Переключить текущий
        item.toggleClass('active');
        item.find('.faq__answer').slideToggle();
      });

      $('#current-year').text(new Date().getFullYear());

      var burger = $('.burger');
      var  slideMenu = $('.header__nav-outer');

    burger.click(function() {
        burger.toggleClass('open');
        slideMenu.toggleClass('active');
    });

})