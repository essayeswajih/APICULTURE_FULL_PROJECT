// ==================== FINAL FIXED 2025 VERSION ====================

// 2. Photoswipe 5 Lightbox (replaces Chocolat)
const initLightbox = async () => {
  try {
    const { default: PhotoSwipeLightbox } = await import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js');
    
    new PhotoSwipeLightbox({
      gallery: '.image-link, [data-gallery]', // supports both classes
      children: 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]',
      pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4'),
      bgOpacity: 0.95,
      spacing: 0.12,
      loop: true,
      showHideAnimationType: 'zoom',
    }).init();
  } catch (e) {
    console.warn('Photoswipe failed to load:', e);
  }
};

// 3. Swiper.js v11+ – All sliders
const initSliders = () => {
  // Hero slider
  if (document.querySelector('.main-swiper')) {
    new Swiper('.main-swiper', {
      speed: 600,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }

  // Category carousel
  if (document.querySelector('.category-carousel')) {
    new Swiper('.category-carousel', {
      slidesPerView: 2,
      spaceBetween: 20,
      navigation: {
        nextEl: '.category-carousel-next',
        prevEl: '.category-carousel-prev',
      },
      breakpoints: {
        768: { slidesPerView: 3 },
        992: { slidesPerView: 5 },
        1500: { slidesPerView: 8 },
      },
    });
  }

  // Products carousels
  document.querySelectorAll('.products-carousel .swiper').forEach(container => {
    const parent = container.closest('.products-carousel');
    new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: parent?.querySelector('.products-carousel-next'),
        prevEl: parent?.querySelector('.products-carousel-prev'),
      },
      breakpoints: {
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      },
    });
  });

  // Product gallery (thumbnail + main)
  const thumb = document.querySelector('.product-thumbnail-slider');
  const large = document.querySelector('.product-large-slider');

  if (thumb && large) {
    const thumbs = new Swiper(thumb, {
      spaceBetween: 15,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
      direction: window.innerWidth >= 992 ? 'vertical' : 'horizontal',
      breakpoints: {
        992: { direction: 'vertical' },
        0: { direction: 'horizontal' }
      }
    });

    new Swiper(large, {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      thumbs: { swiper: thumbs },
      pagination: { el: '.swiper-pagination', clickable: true },
    });
  }
};

// 4. Quantity +/- buttons
const initQuantity = () => {
  document.querySelectorAll('.product-qty').forEach(wrapper => {
    const input = wrapper.querySelector('input[name="quantity"], #quantity');
    if (!input) return;

    wrapper.querySelector('.quantity-right-plus')?.addEventListener('click', () => {
      input.value = (parseInt(input.value) || 0) + 1;
      input.dispatchEvent(new Event('change'));
    });

    wrapper.querySelector('.quantity-left-minus')?.addEventListener('click', () => {
      if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        input.dispatchEvent(new Event('change'));
      }
    });
  });
};

// 5. Jarallax Parallax
const initParallax = () => {
  if (typeof Jarallax !== 'undefined') {
    document.querySelectorAll('.jarallax').forEach(el => {
      new Jarallax(el, {
        speed: el.dataset.speed || 0.5,
        keepImg: el.classList.contains('jarallax-keep-img')
      });
    });
  }
};

// Run everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initSliders();
  initQuantity();
  initParallax();
});