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
    const day = selectedDate.getDay(); 

    let minTime, maxTime;

    if (day === 0) { 
      minTime = "09:00";
      maxTime = "12:00";
    } else if (day === 6) {
      minTime = "09:00";
      maxTime = "14:00";
    } else { 
      minTime = "08:00";
      maxTime = "19:00";
    }

    timeInput.min = minTime;
    timeInput.max = maxTime;
    timeInput.value = "";
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

  toggleInput(otherServiceCheckbox, otherServiceText);
  toggleInput(otherGoalsCheckbox, otherGoalsText);
});

// This is the form code edits -------------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('leadQualificationForm');
  if (!form) {
    console.error("Form not found!");
    return;
  }

  const steps = Array.from(form.querySelectorAll('.form-step'));
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('active', i === index);
    });
    console.log(`Showing step ${index + 1} of ${steps.length}`);
  }

  // Utility: Remove any existing error message in the current step
  function clearErrorMessage(stepEl) {
    const prevError = stepEl.querySelector('.step-error-message');
    if (prevError) prevError.remove();
  }

  // Utility: Show error message in current step
  function showErrorMessage(stepEl, message) {
    clearErrorMessage(stepEl);
    const errorMessage = document.createElement('div');
    errorMessage.className = 'step-error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ff4d4d';
    errorMessage.style.fontWeight = '600';
    errorMessage.style.margin = '1rem 0';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.fontFamily = "'Poppins', sans-serif";
    stepEl.appendChild(errorMessage);
  }

  form.addEventListener('click', e => {
    if (e.target.classList.contains('btn-next')) {
      e.preventDefault();

      const currentStepEl = steps[currentStep];

      // Validation before moving next:
      // Step 1,2,5 require at least one checkbox checked
      // Step 3,4,6 require a radio selected
      // Step 7 is textarea (optional, no validation)
      // Last step (contact info) has required inputs, but is submit step
      
      let canProceed = true;
      switch (currentStep) {
        case 0: // Step 1 - checkboxes service_package
          if (!currentStepEl.querySelector('input[type="checkbox"]:checked')) {
            showErrorMessage(currentStepEl, 'Please select at least one service package.');
            canProceed = false;
          }
          break;
        case 1: // Step 2 - checkboxes additional_services (optional, no forced validation)
          clearErrorMessage(currentStepEl);
          break;
        case 2: // Step 3 - radio budget required
          if (!currentStepEl.querySelector('input[type="radio"]:checked')) {
            showErrorMessage(currentStepEl, 'Please select your approximate budget.');
            canProceed = false;
          }
          break;
        case 3: // Step 4 - radio timeline required
          if (!currentStepEl.querySelector('input[type="radio"]:checked')) {
            showErrorMessage(currentStepEl, 'Please select your ideal timeline.');
            canProceed = false;
          }
          break;
        case 4: // Step 5 - checkboxes main_goals max 3 (at least one)
          const checkedGoals = currentStepEl.querySelectorAll('input[type="checkbox"]:checked');
          if (checkedGoals.length === 0) {
            showErrorMessage(currentStepEl, 'Please select at least one main goal.');
            canProceed = false;
          } else if (checkedGoals.length > 3) {
            showErrorMessage(currentStepEl, 'Please select up to 3 main goals only.');
            canProceed = false;
          } else {
            clearErrorMessage(currentStepEl);
          }
          break;
        case 5: // Step 6 - radio questions required
          const radios = currentStepEl.querySelectorAll('input[type="radio"]');
          // For each group (existing_website, branding_materials, content_ready), check if one is selected
          const groups = ['existing_website', 'branding_materials', 'content_ready'];
          for (const group of groups) {
            const checked = currentStepEl.querySelector(`input[name="${group}"]:checked`);
            if (!checked) {
              showErrorMessage(currentStepEl, `Please answer all questions before proceeding.`);
              canProceed = false;
              break;
            }
          }
          break;
        case 6: // Step 7 - textarea, optional
          clearErrorMessage(currentStepEl);
          break;
        default:
          clearErrorMessage(currentStepEl);
      }

      if (!canProceed) return;

      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    }

    if (e.target.classList.contains('btn-prev')) {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    }
  });

  showStep(currentStep);

  // Now get the bookingForm and add submit listener
  const bookingForm = form; // same form element

  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // --- Validation: at least one checkbox/radio checked OR textarea filled ---
    // Remove any previous error message (global)
    const prevError = document.getElementById('formErrorMessage');
    if (prevError) prevError.remove();

    // Validate required contact fields (last step)
    const fullName = bookingForm.querySelector('input[name="fullName"]');
    const email = bookingForm.querySelector('input[name="email"]');
    if (!fullName.value.trim() || !email.value.trim()) {
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const errorMessage = document.createElement('div');
      errorMessage.id = 'formErrorMessage';
      errorMessage.textContent = "Please fill in your full name and email before submitting.";
      errorMessage.style.color = '#ff4d4d';
      errorMessage.style.fontWeight = '600';
      errorMessage.style.margin = '1rem 0';
      errorMessage.style.textAlign = 'center';
      errorMessage.style.fontFamily = "'Poppins', sans-serif";
      submitBtn.parentNode.insertBefore(errorMessage, submitBtn);
      return; // stop submission
    }

    // Validate overall at least one checkbox/radio or textarea (additional notes) filled
    const inputs = bookingForm.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const isAnyChecked = Array.from(inputs).some(input => input.checked);
    const lastTextarea = bookingForm.querySelector('textarea[name="additional_notes"]');
    const isTextareaFilled = lastTextarea && lastTextarea.value.trim() !== '';

    if (!isAnyChecked && !isTextareaFilled) {
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const errorMessage = document.createElement('div');
      errorMessage.id = 'formErrorMessage';
      errorMessage.textContent = "Please select at least one option or provide some notes before submitting.";
      errorMessage.style.color = '#ff4d4d';
      errorMessage.style.fontWeight = '600';
      errorMessage.style.margin = '1rem 0';
      errorMessage.style.textAlign = 'center';
      errorMessage.style.fontFamily = "'Poppins', sans-serif";
      submitBtn.parentNode.insertBefore(errorMessage, submitBtn);
      return; // stop submission
    }
    // --- End validation ---

    fetch(bookingForm.action, {
      method: 'POST',
      body: new FormData(bookingForm),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        bookingForm.style.transition = 'opacity 0.5s ease';
        bookingForm.style.opacity = 0;

        setTimeout(() => {
          bookingForm.style.display = 'none';

          const thankYouMsg = document.createElement('div');
          thankYouMsg.textContent = "Thank you! Your submission was received.";
          thankYouMsg.style.color = '#00f5d4';
          thankYouMsg.style.fontWeight = '600';
          thankYouMsg.style.fontSize = '1.4rem';
          thankYouMsg.style.textAlign = 'center';
          thankYouMsg.style.margin = '3rem auto';
          thankYouMsg.style.fontFamily = "'Poppins', sans-serif";

          bookingForm.parentElement.appendChild(thankYouMsg);
        }, 500);
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    }).catch(() => {
      alert("Network error. Please check your connection and try again.");
    });
  });
});
