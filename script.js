window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");

  try {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      class: 'is-revealed',
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });
    console.log("LocomotiveScroll initialized");

    // Cursor effect
    function cursorEffect() {
      const cursor = document.querySelector('.cursor');
      const page1 = document.querySelector('.page1-content');

      if (!cursor || !page1) {
        console.log("Cursor elements not found");
        return;
      }

      page1.addEventListener('mousemove', function (e) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.inOut"
        });
      });

      page1.addEventListener('mouseleave', function () {
        gsap.to(cursor, {
          scale: 0
        });
      });

      page1.addEventListener('mouseenter', function () {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1
        });
      });
    }

    // Loader timeline
    const tl = gsap.timeline();

    gsap.set(".loader h3", {
      opacity: 0,
      y: 40
    });

    tl.to(".loader h3", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });

    tl.to(".loader h3", {
      y: -40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.in"
    }, "+=1");

    tl.to(".loader", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("Loader animation completed");
        document.body.style.overflow = 'auto';
        
        // Initialize cursor after loader
        cursorEffect();
        
        console.log("Cursor effect initialized");
      }
    }, "-=0.5");

    tl.set(".loader", {
      display: "none"
    });

    // Swiper initialization
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      loop: true,
      freeMode: true,
      freeModeMomentum: true,
      speed: 8000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      }
    });
    
  } catch (error) {
    console.error("Initialization error:", error);
  }

  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: false,          // disable Swiper loop for manual control
    allowTouchMove: false,
    freeMode: true,
    freeModeMomentum: false,
  });
  
  // Get swiper wrapper element
  const wrapper = document.querySelector('.mySwiper .swiper-wrapper');
  
  let scrollAmount = 0;
  const speed = 0.5; // pixels per frame, adjust for speed
  const totalScrollWidth = wrapper.scrollWidth / 2; // since slides are repeated twice
  
  function animate() {
    scrollAmount += speed;
    if (scrollAmount >= totalScrollWidth) {
      scrollAmount = 0;
    }
    wrapper.style.transform = `translateX(${-scrollAmount}px)`;
    requestAnimationFrame(animate);
  }
  
  // Start animation loop
  animate();


});
