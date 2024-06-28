const swiper = new Swiper('.swiper', {

  createElements: true,

    direction: 'horizontal',
    loop: true,
    allowTouchMove: true,
    autoHeight: true,

//     autoplay: {
//         delay: 2000,
//       },

    // effect: 'cube',
    effect: 'coverflow',
    coverflowEffect: {
        slideShadows: true,
        depth: 200,
        rotate: 30,
        stretch: 10,
        scale: 0.8,
        modifier: 2,
    },

    slidesPerGroup: 1,
    slidesPerView: 1,
    spaceBetween: 10,

    // Responsive breakpoints
    // breakpoints: {
    // // when window width is >= 320px
    // 320: {
    //     slidesPerView: 1,
    //     spaceBetween: 20
    // },
    // // when window width is >= 480px
    // 480: {
    //     slidesPerView: 1,
    //     spaceBetween: 30
    // },
    // // when window width is >= 640px
    // 640: {
    //     slidesPerView: 1,
    //     spaceBetween: 40
    // }
    // },

    pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },

  });