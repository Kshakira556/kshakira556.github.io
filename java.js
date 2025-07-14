const iconList = {
  "HTML5": "icons/html5.png",
  "React": "https://raw.githubusercontent.com/Kshakira556/kshakira556.github.io/main/icons/react.png",
  "CSS3": "icons/css3.png",
  "JavaScript": "icons/javascript.png",
  "Kotlin": "https://raw.githubusercontent.com/Kshakira556/kshakira556.github.io/main/icons/kotlin.png",
  "Git": "icons/git.png",
  "Github": "icons/github.png",
  "React Native": "icons/React_Native.png"
};

const projImageList = {
  "Leads Tracker App": "projects/screenshots/lTracker.png",
  "Blackjack Game": "projects/screenshots/bjGame.png",
  "Tutor Website": "projects/screenshots/fuzzyness_tutoring.png",
  "Scrum Agile To-do": "projects/screenshots/scrum.png",
  "Mobile Fitness App (Coming Soon)": "images/coming_soon.png"
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
    projectsEl.innerHTML += `
      <div class="project-card">
        <img src="${projImageList[project]}" alt="${project} screenshot" />
        <h3>${project}</h3>
      </div>
    `;
  }
}

displayIcons();
displayProjects();
