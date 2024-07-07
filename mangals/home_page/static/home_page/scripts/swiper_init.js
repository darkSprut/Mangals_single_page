const swiper_hero = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,

    // autoplay: {
    //   delay: 2000,
    // },

    effect: 'coverflow',
    coverflowEffect: {
      depth: 400,
      scale: 0.5,
      slideShadows: false,
      rotate: 30,
      stretch: 60,
      modifier: 0.5,
    },

    pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

  });