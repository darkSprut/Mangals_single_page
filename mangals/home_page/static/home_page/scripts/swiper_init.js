document.addEventListener('DOMContentLoaded', function() {

  setTimeout(() => {
    const swiper_hero = new Swiper('.swiper-hero', {

      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
  
      autoplay: {
        delay: 2000,
      },
  
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
          el: '.swiper-pagination-hero',
        },
      
      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
      },
  
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
  
    });
  
  
  const swiper_card = new Swiper('.swiper-card', {
  
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 50,
  
  //     autoplay: {
  //       delay: 2000,
  //     },
  
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
          el: '.swiper-pagination-card',
        },
  
      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next-card',
          prevEl: '.swiper-button-prev-card',
      },
  
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar-card',
        },
  
    });
  }, 600)

})

