// GENRE CARD CAROUSEL

document.addEventListener("DOMContentLoaded", () => {
  const cardContainer = document.querySelector(".cardContainer");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = Array.from(document.querySelectorAll(".card"));

  const cardWidth = 11 * 16; // 11rem converted to pixels
  const cardMargin = 32; // 1rem converted to pixels
  const cardFullWidth = cardWidth + cardMargin;
  const cardsPerPage = 8;
  const pageWidth = cardFullWidth * cardsPerPage;

  let currentIndex = 0;

  function setupCards() {
    cards.forEach((card, index) => {
      card.style.left = `${index * cardFullWidth}px`;
      card.style.transition = "left 1s ease-in-out";
    });

    // Clone cards for infinite effect
    for (let i = 0; i < cardsPerPage; i++) {
      const clone = cards[i].cloneNode(true);
      clone.style.left = `${(cards.length + i) * cardFullWidth}px`;
      cardContainer.appendChild(clone);
    }

    // Set container width to show exactly 9 cards
    cardContainer.style.width = `${pageWidth}px`;
  }

  function moveCards(direction) {
    currentIndex -= direction * cardsPerPage;

    cards.forEach((card, index) => {
      let newLeft =
        ((index - currentIndex) * cardFullWidth) %
        (cards.length * cardFullWidth);
      if (newLeft < 0) newLeft += cards.length * cardFullWidth;

      card.style.left = `${newLeft}px`;
    });

    // Reset index if all original cards are out of view
    if (currentIndex >= cards.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = cards.length - cardsPerPage;
    }
  }

  prevBtn.addEventListener("click", () => moveCards(-1));
  nextBtn.addEventListener("click", () => moveCards(1));

  // Initial setup
  setupCards();

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Remove cloned cards
      Array.from(cardContainer.children).forEach((card, index) => {
        if (index >= cards.length) card.remove();
      });
      // Reset and setup cards again
      currentIndex = 0;
      setupCards();
    }, 250);
  });
});

