const iconList = {
  "HTML5": "assets/html5.png",
  "React": "assets/react.png",
  "CSS3": "assets/css3.png",
  "JavaScript": "assets/javascript.png",
  "Kotlin": "assets/kotlin.png",
  "Git": "assets/git.png",
  "Github": "assets/github.png",
  "React Native": "assets/react-native.png"
};

const projImageList = {
  "Leads Tracker App": [
    "assets/lTracker.png",
    "assets/lTracker.png",
    "assets/lTracker.png"
  ],
  "Blackjack Game": [
    "assets/bjGame.png",
    "assets/bjGame.png",
    "assets/bjGame.png"
  ],
  "Tutor Website": [
    "assets/fuzzyness_tutoring.png",
    "assets/fuzzyness_tutoring.png",
    "assets/fuzzyness_tutoring.png"
  ],
  "Scrum Agile To-do": [
    "assets/scrum.png",
    "assets/scrum.png",
    "assets/scrum.png"
  ],
  "Mobile Fitness App (Coming Soon)": [
    "assets/coming_soon.png",
    "assets/coming_soon.png",
    "assets/coming_soon.png"
  ]
};

// Only run if visually needed
function displayIcons() {
  const iconsEl = document.getElementById("icons");
  if (!iconsEl || iconsEl.dataset.show !== "true") return;

  for (let tech in iconList) {
    iconsEl.innerHTML += `<img src="${iconList[tech]}" alt="${tech} logo">`;
  }
}

function displayProjects() {
  const projectsEl = document.getElementById("projectImages");
  if (!projectsEl) return;

  for (let project in projImageList) {
    const images = projImageList[project]
      .map((img, i) => `<img src="${img}" alt="${project} screenshot ${i + 1}">`)
      .join("");

    projectsEl.innerHTML += `
      <div class="project-card">
        <h3>${project}</h3>
        <div class="carousel-container" role="region" aria-label="Image carousel for ${project}">
          <button class="carousel-btn left" aria-label="Previous image">&#10094;</button>
          <div class="carousel-track">
            ${images}
          </div>
          <button class="carousel-btn right" aria-label="Next image">&#10095;</button>
          <div class="carousel-indicators"></div>
        </div>
      </div>
    `;
  }

  // Debounce utility
  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Carousel logic with wraparound
  const carousels = document.querySelectorAll(".carousel-container");
  carousels.forEach(container => {
    const track = container.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");
    const leftBtn = container.querySelector(".carousel-btn.left");
    const rightBtn = container.querySelector(".carousel-btn.right");
    const indicators = container.querySelector(".carousel-indicators");

    let index = 0;

    // Create indicators
    images.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
      });
      indicators.appendChild(dot);
    });

    function updateCarousel() {
      const imgWidth = images[0]?.clientWidth || 0;
      track.style.transform = `translateX(-${index * imgWidth}px)`;
      indicators.querySelectorAll("button").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    rightBtn.addEventListener("click", () => {
      index = (index + 1) % images.length;
      updateCarousel();
    });

    leftBtn.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      updateCarousel();
    });

    // Keyboard accessibility
    container.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") rightBtn.click();
      if (e.key === "ArrowLeft") leftBtn.click();
    });
    container.tabIndex = 0; // make focusable

    // Wait for all images in this carousel to load before initial update
    const imagesLoadedPromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => img.addEventListener("load", resolve));
    });

    Promise.all(imagesLoadedPromises).then(() => {
      updateCarousel();
      window.addEventListener("resize", debounce(updateCarousel));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayIcons();
  displayProjects();
});


const toggleBtn = document.querySelector(".menu-toggle");
const closeBtn = document.querySelector(".close-btn");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

// Toggle mobile menu open/close when hamburger clicked
toggleBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
});

// Close mobile menu when close button clicked
closeBtn.addEventListener("click", () => {
  mobileNav.classList.remove("show");
});

// Close mobile menu when any menu link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
  });
});

// Consultation Booking Form
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

if (dateInput && timeInput) {
  // Block past dates
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;

  // Adjust available times based on the day
  dateInput.addEventListener('change', function () {
    const selectedDate = new Date(this.value);
    const day = selectedDate.getDay(); // 0=Sun, 1=Mon, ... 6=Sat

    let minTime, maxTime;

    if (day === 0) { // Sunday
      minTime = "09:00";
      maxTime = "12:00";
    } else if (day === 6) { // Saturday
      minTime = "09:00";
      maxTime = "14:00";
    } else { // Weekdays
      minTime = "08:00";
      maxTime = "19:00";
    }

    timeInput.min = minTime;
    timeInput.max = maxTime;
    timeInput.value = ""; // Reset time selection
  });
}

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch(bookingForm.action, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        bookingForm.reset();
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Toggle visibility of "Other" text inputs on checkbox toggle
document.addEventListener('DOMContentLoaded', () => {
  const otherServiceCheckbox = document.getElementById('other-service-checkbox');
  const otherServiceText = document.getElementById('other-service-text');

  const otherGoalsCheckbox = document.getElementById('other-goals-checkbox');
  const otherGoalsText = document.getElementById('other-goals-text');

  function toggleInput(checkbox, textInput) {
    if (checkbox.checked) {
      textInput.style.display = 'block';
      textInput.focus();
    } else {
      textInput.style.display = 'none';
      textInput.value = '';
    }
  }

  otherServiceCheckbox.addEventListener('change', () => toggleInput(otherServiceCheckbox, otherServiceText));
  otherGoalsCheckbox.addEventListener('change', () => toggleInput(otherGoalsCheckbox, otherGoalsText));

  // Initialize hidden on load
  toggleInput(otherServiceCheckbox, otherServiceText);
  toggleInput(otherGoalsCheckbox, otherGoalsText);
});
