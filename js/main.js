"use strict";

AOS.init();

let mainSlider = new Swiper(".intro-slider", {
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  loop: true,
});

let brandsSlider = new Swiper(".brands-slider", {
  slidesPerView: 2,
  speed: 1000,
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: ".br-next",
    prevEl: ".br-back",
  },
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 480px
    780: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    1000: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1450: {
      slidesPerView: 5.7,
      spaceBetween: 30,
    },
  },
});

let videoSlider = new Swiper(".video-slider", {
  speed: 2000,
  slidesPerView: 1,
  loop: true,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    800: {
      slidesPerView: 2,
    },
    1450: {
      slidesPerView: 3,
    },
  },
});

let logoSlider = new Swiper(".logo-slider", {
  slidesPerView: 1,
  speed: 1000,
  loop: true,
  spaceBetween: 80,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    650: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    850: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 7,
    },
  },
});

let modalVideoSlider = new Swiper(".modal-video-slider", {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 10);
});

function counterScroll() {
  const statistics = document.querySelector(".statistics");

  if (statistics) {
    let counterItem = document.querySelectorAll("#achv-target");

    counterItem.forEach((element) => {
      const dataTarget = element.getAttribute("data-target");
      let number = 0;
      element.textContent = number;

      function counter() {
        function updateCounter() {
          number++;

          if (number < dataTarget) {
            element.textContent = number;
            setTimeout(updateCounter, 100);
          } else {
            element.textContent = dataTarget;
          }
        }
        updateCounter();
      }
      window.addEventListener("scroll", () => {
        let contentPos = statistics.getBoundingClientRect().top;
        let screenPos = window.pageYOffset;
        if (contentPos < screenPos) {
          counter();
        }
      });
    });
  }
}
counterScroll();

function faqDrop() {
  const faqContainer = document.querySelector(".faq-items");
  if (faqContainer) {
    const faqItem = faqContainer.querySelectorAll(".item");
    faqItem.forEach((element) => {
      element.addEventListener(
        "click",
        () => {
          element.classList.toggle("active");
        },
        false
      );
    });
  }
}
faqDrop();

function modalWindow() {
  const enableBtn = document.querySelectorAll(".contact-modal-open");
  const modalWrapper = document.querySelector(".modal-wrapper");
  const modalWindow = document.querySelector(".modal-window");
  const closeModal = document.querySelector(".closeModal");

  function toggleItem() {
    modalWrapper.classList.toggle("active");
    modalWindow.classList.toggle("active");
    document.body.classList.toggle("_lock");
  }

  enableBtn.forEach((element) => {
    element.addEventListener("click", toggleItem);
  });

  closeModal.addEventListener("click", toggleItem);

  window.addEventListener("click", (event) => {
    if (event.target == modalWrapper) {
      toggleItem();
    }
  });
}
modalWindow();

function burgerMenu() {
  const iconMenu = document.querySelector(".menu-icon");
  if (iconMenu) {
    const menuBody = document.querySelector(".nav-links");
    const header = document.querySelector("header");
    function toggleItem() {
      document.body.classList.toggle("_lock");
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
      header.classList.toggle("_active");
    }

    // function classRemove() {
    //   document.body.classList.remove("_lock");
    //   iconMenu.classList.remove("_active");
    //   menuBody.classList.remove("_active");
    //   header.classList.remove("_active");
    // }

    iconMenu.addEventListener("click", function () {
      toggleItem();
    });

    // window.addEventListener("click", (event) => {
    //   if (
    //     event.target !== iconMenu &&
    //     menuBody.classList.contains("_active") &&
    //     iconMenu.classList.contains("_active")
    //   ) {
    //     classRemove();
    //   }
    // });
  }
}

burgerMenu();

function videoModal() {
  const sliderWrapper = document.querySelector(".vd-wr");
  if (sliderWrapper) {
    const videoEmb = sliderWrapper.querySelectorAll("iframe");
    const navBtn = sliderWrapper.querySelectorAll(".sl-nv");
    const closeModal = sliderWrapper.querySelector(".close-md");
    const videoImg = document.querySelectorAll(".video-slider-slide");

    function stopPlay() {
      videoEmb.forEach((element) => {
        element.contentWindow.postMessage(
          '{"event":"command","func":"stopVideo","args":""}',
          "*"
        );
      });
    }

    navBtn.forEach((element) => {
      element.addEventListener("click", stopPlay);
    });

    function toggleItem() {
      sliderWrapper.classList.toggle("_active");
      document.body.classList.toggle("_lock");
      stopPlay();
    }

    closeModal.addEventListener("click", toggleItem);

    window.addEventListener("click", (event) => {
      if (event.target == sliderWrapper) {
        toggleItem();
      }
    });

    videoImg.forEach((element) => {
      const sliderIndex = element.getAttribute("data-index");
      element.addEventListener("click", () => {
        toggleItem();
        modalVideoSlider.slideTo(sliderIndex, 0);
      });
    });
  }
}

videoModal();

function brandVideoModal() {
  const sliderWrapper = document.querySelector(
    ".brand-video-modal-wrapper"
  );

  if (sliderWrapper) {
    const videoEmb = sliderWrapper.querySelectorAll("iframe");
    const closeModal = sliderWrapper.querySelector(".close-md");
    const playBtn = document.querySelectorAll(".play-video-modal");

    function stopPlay() {
      videoEmb.forEach((element) => {
        element.contentWindow.postMessage(
          '{"event":"command","func":"stopVideo","args":""}',
          "*"
        );
      });
    }

    function toggleItem() {
      sliderWrapper.classList.toggle("_active");
      document.body.classList.toggle("_lock");
      stopPlay();
    }

    closeModal.addEventListener("click", toggleItem);

    window.addEventListener("click", (event) => {
      if (event.target == sliderWrapper) {
        toggleItem();
      }
    });

    playBtn.forEach((element) => {
      element.addEventListener("click", toggleItem);
    });
  }
}

brandVideoModal();
