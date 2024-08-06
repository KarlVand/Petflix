const slide = document.querySelector(".carousel-slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const panelsPerView = 4;
let currentIndex = 0;

// Create an array of all panel contents
const panelContents = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function updatePanels() {
  const panels = slide.querySelectorAll(".panel");
  panels.forEach((panel, index) => {
    // Add fade-out class
    panel.classList.add("fade-out");

    setTimeout(() => {
      const contentIndex = (currentIndex + index) % panelContents.length;
      panel.innerHTML = panelContents[contentIndex];

      // Remove fade-out class to fade in
      setTimeout(() => {
        panel.classList.remove("fade-out");
      }, 50);
    }, 300); // Wait for fade out to complete
  });
}

function moveSlide(direction) {
  currentIndex += direction * panelsPerView;

  // Implement looping behavior
  if (currentIndex >= panelContents.length) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = Math.max(0, panelContents.length - panelsPerView);
  }

  updatePanels();
}

prevBtn.addEventListener("click", () => moveSlide(-1));
nextBtn.addEventListener("click", () => moveSlide(1));

// Initialize
updatePanels();
