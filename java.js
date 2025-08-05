const iconList = {
  "HTML5": "/assets/html5.png",
  "React": "/assets/react.js.png",
  "CSS3": "/assets/css3.png",
  "JavaScript": "/assets/javascript.png",
  "Kotlin": "/assets/kotlin.png",
  "Git": "/assets/git.png",
  "Github": "/assets/github.png",
  "React Native": "/assets/react-native.png"
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
  // Add more projects as needed
};


function displayIcons() {
  const iconsEl = document.getElementById("icons");
  for (let tech in iconList) {
    iconsEl.innerHTML += `<img src="${iconList[tech]}" alt="${tech} logo" />`;
  }
}

function displayProjects() {
  const projectsEl = document.getElementById("projectImages");

  for (let project in projImageList) {
    const images = projImageList[project]
      .map(img => `<img src="${img}" alt="${project} screenshot">`)
      .join("");

    projectsEl.innerHTML += `
      <div class="project-card">
        <h3>${project}</h3>
        <div class="carousel-container">
          <button class="carousel-btn left">&#10094;</button>
          <div class="carousel-track">
            ${images}
          </div>
          <button class="carousel-btn right">&#10095;</button>
        </div>
      </div>
    `;
  }

  // Carousel logic
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach(container => {
    const track = container.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");
    const leftBtn = container.querySelector(".carousel-btn.left");
    const rightBtn = container.querySelector(".carousel-btn.right");

    let index = 0;

    function updateCarousel() {
      const imgWidth = images[0].clientWidth;
      track.style.transform = `translateX(-${index * imgWidth}px)`;
    }

    rightBtn.addEventListener("click", () => {
      if (index < images.length - 1) {
        index++;
        updateCarousel();
      }
    });

    leftBtn.addEventListener("click", () => {
      if (index > 0) {
        index--;
        updateCarousel();
      }
    });

    // Resize fix
    window.addEventListener("resize", updateCarousel);
  });
}

displayIcons();
displayProjects();

function changeSlide(id, direction) {
  const container = document.getElementById(id);
  const images = container.querySelectorAll('.carousel-image');
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));

  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + direction + images.length) % images.length;
  images[currentIndex].classList.add('active');
}

// Swipe support (mobile)
let startX = 0;
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach(carousel => {
      const id = carousel.id;
      changeSlide(id, diff > 0 ? 1 : -1);
    });
  }
});




