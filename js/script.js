AOS.init({ once: false });

const words = [
  "Train. Fly. Serve. Supply. We Cover the Entire Aerial Journey.",
];
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;
let erasingSpeed = 60;
//   let delayBetweenWords = 1000;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting && charIndex <= currentWord.length) {
    typedText.textContent = currentWord.substring(0, charIndex++);
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex >= 0) {
    typedText.textContent = currentWord.substring(0, charIndex--);
    setTimeout(type, erasingSpeed);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, delayBetweenWords);
  }
}

window.addEventListener("load", () => {
  if (words.length) setTimeout(type, 100);
});

const track = document.getElementById("testimonialTrack");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let position = 0;

function getVisibleCards() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 992) return 2;
  return 3;
}

function getCardWidth() {
  const card = track.querySelector(".testimonial-card");
  return card.offsetWidth + 16;
}

nextBtn.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  const visibleCards = getVisibleCards();
  const totalCards = track.children.length;
  const maxShift = cardWidth * (totalCards - visibleCards);

  if (Math.abs(position) < maxShift) {
    position -= cardWidth;
    track.style.transform = `translateX(${position}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  const cardWidth = getCardWidth();
  if (position < 0) {
    position += cardWidth;
    track.style.transform = `translateX(${position}px)`;
  }
});

window.addEventListener("resize", () => {
  position = 0;
  track.style.transform = `translateX(0px)`;
});
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const overlay = document.querySelector(".overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar a");

  if (hamburger && sidebar && closeBtn && overlay) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.add("show");
      overlay.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
    });
  }

  if (sidebarLinks.length > 0) {
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
      });
    });
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   let lastScrollY = window.scrollY;

//   const target = document.querySelector(".why-choose");

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const currentScrollY = window.scrollY;
//         const isScrollingDown = currentScrollY > lastScrollY;
//         lastScrollY = currentScrollY;

//         if (entry.isIntersecting && isScrollingDown) {
//           entry.target.classList.remove("animate"); // reset
//           void entry.target.offsetWidth; // force reflow
//           entry.target.classList.add("animate"); // retrigger
//         }
//       });
//     },
//     { threshold: 0.4 }
//   );

//   if (target) {
//     observer.observe(target);
//   }
// });

const items = document.querySelectorAll(".accordion-item");

items.forEach((item) => {
  const title = item.querySelector(".accordion-title");

  title.addEventListener("click", () => {
    const openItem = document.querySelector(".accordion-item.open");

    if (openItem && openItem !== item) {
      openItem.classList.remove("open");
      openItem.querySelector(".accordion-content").style.maxHeight = null;
      openItem.querySelector(".icon").classList.remove("rotate");
    }

    item.classList.toggle("open");

    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".icon");

    if (item.classList.contains("open")) {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("rotate");
    } else {
      content.style.maxHeight = null;
      icon.classList.remove("rotate");
    }
  });
});

const slider = document.getElementById("announcementSlider");
const dotsContainer = document.getElementById("dotsContainer");
const cards = slider.querySelectorAll(".announcement-card");
const totalSlides = cards.length;
const cardStyle = window.getComputedStyle(cards[0]);
const gap = parseInt(cardStyle.marginRight || 20);
const isMobile = window.innerWidth <= 767;
const cardWidth = cards[0].offsetWidth + gap;
const visibleCards = isMobile ? 1 : 3;
const totalVisibleSlides = totalSlides - visibleCards + 1;

let currentIndex = 0;
let interval;

for (let i = 0; i < totalVisibleSlides; i++) {
  const dot = document.createElement("button");
  dot.addEventListener("click", () => {
    currentIndex = i;
    updateSlider();
    resetInterval();
  });
  dotsContainer.appendChild(dot);
}

const updateSlider = () => {
  slider.scrollTo({
    left: currentIndex * cardWidth,
    behavior: "smooth",
  });
  updateDots();
};

const updateDots = () => {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
};

const autoSlide = () => {
  currentIndex = (currentIndex + 1) % totalVisibleSlides;
  updateSlider();
};

const resetInterval = () => {
  clearInterval(interval);
  interval = setInterval(autoSlide, 2000);
};

document.querySelector(".nav-arrow.left").addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? totalVisibleSlides - 1 : currentIndex - 1;
  updateSlider();
  resetInterval();
});

document.querySelector(".nav-arrow.right").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalVisibleSlides;
  updateSlider();
  resetInterval();
});

slider.addEventListener("mouseenter", () => clearInterval(interval));
slider.addEventListener("mouseleave", () => resetInterval());

updateSlider();
interval = setInterval(autoSlide, 2000);
let startX = 0;
let isDragging = false;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diffX = currentX - startX;

  // Optional: add drag effect if needed
});

slider.addEventListener("touchend", (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;

  if (Math.abs(diffX) > 50) {
    if (diffX < 0) {
      // Swipe Left → Next
      currentIndex = (currentIndex + 1) % totalVisibleSlides;
    } else {
      // Swipe Right → Prev
      currentIndex =
        currentIndex === 0 ? totalVisibleSlides - 1 : currentIndex - 1;
    }
    updateSlider();
    resetInterval();
  }
});


document.addEventListener("DOMContentLoaded", function() {
const year = new Date().getFullYear();
document.getElementById(
  "copyrightText"
).textContent = `© ${year} Flapone Aviation. All rights reserved.`;
});

function toggleMessage() {
  const message = document.getElementById("message");
  const toggleBtn = document.querySelector(".read-more");
  message.classList.toggle("expanded");
  toggleBtn.textContent = message.classList.contains("expanded")
    ? "Read less"
    : "Read more";
}

const counters = document.querySelectorAll(".count");
let hasCounted = false;

const countUp = (el, target, isDecimal = false) => {
  let current = 0;
  const increment = target / 100;
  const suffix = el.getAttribute("data-suffix") || "";

  const interval = setInterval(() => {
    current += increment;
    const displayValue = current >= target ? target : current;
    const formattedValue = isDecimal
      ? parseFloat(displayValue).toFixed(1)
      : Math.ceil(displayValue);

    const styledSuffix = suffix
      ? `<span class="suffix">${suffix}</span>`
      : "";

    el.innerHTML = `${formattedValue}${styledSuffix}`;

    if (current >= target) {
      clearInterval(interval);
    }
  }, 20);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasCounted) {
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const isDecimal = counter.getAttribute("data-decimal") === "true";
          countUp(counter, target, isDecimal);
        });
        hasCounted = true;
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const section = document.querySelector(".why-choose");
observer.observe(section);




document.addEventListener("DOMContentLoaded", function () {
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parent = toggle.closest(".has-submenu");
      parent.classList.toggle("active");
    });
  });
});