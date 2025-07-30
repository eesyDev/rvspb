jQuery(document).ready(function ($) {

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
        window.frontpage_blog_slider = false;
        
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
})