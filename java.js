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

function displayIcons() {
  const iconsEl = document.getElementById("icons");
  if (!iconsEl) {
    console.error('Element with id "icons" not found.');
    return;
  }

  for (let tech in iconList) {
    iconsEl.innerHTML += `<img src="${iconList[tech]}" alt="${tech} logo" />`;
  }
}

function displayProjects() {
  const projectsEl = document.getElementById("projectImages");
  if (!projectsEl) {
    console.error('Element with id "projectImages" not found.');
    return;
  }

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
      const imgWidth = images[0]?.clientWidth || 0;
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

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  });

  console.log('Project cards added:', projectsEl.innerHTML);
}

document.addEventListener("DOMContentLoaded", () => {
  displayIcons();
  displayProjects();
});
