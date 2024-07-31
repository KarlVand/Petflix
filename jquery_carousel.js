$(document).ready(function () {
  let currentIndex = 0;
  const $carouselContainer = $(".carousel-container");
  const $slide = $(".carousel-slide");
  let $images = $slide.find(".panel");
  const imageCount = $images.length;
  const imagesToShow = 4; // Number of images to display at a time
  const panelWidth = 25; // in rem
  const panelMargin = 1; // in rem
  const buttonWidth = 2; // in rem
  const panelTotalWidth = panelWidth + panelMargin; // Total width including margin

  // Clone first few panels and append them to the end for infinite scrolling
  $images.clone().appendTo($slide);

  // Update images after cloning
  $images = $slide.find(".panel");

  // Set initial dimensions and position
  $carouselContainer.css({
    overflow: "hidden",
    position: "relative",
    display: "flex",
    "align-items": "center",
    width: `calc(${imagesToShow * panelTotalWidth - panelMargin}rem + ${
      2 * buttonWidth
    }rem)`,
  });

  $slide.css({
    display: "flex",
    transition: "margin-left 0.5s ease",
    "margin-left": `${buttonWidth + panelMargin}rem`, // Start margin
  });

  $images.css({
    flex: "0 0 auto",
    width: `${panelWidth}rem`,
    height: `${(9 / 16) * panelWidth}rem`, // Maintain 16:9 ratio
    "margin-right": `${panelMargin}rem`,
  });

  $(".carousel-btn").css({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    "background-color": "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    padding: "0.5rem",
    border: "none",
    cursor: "pointer",
    "text-decoration": "none",
    width: `${buttonWidth}rem`,
    "z-index": 1,
  });

  $(".carousel-btn.prev").css("left", "0");
  $(".carousel-btn.next").css("right", "0");

  function moveToIndex(index) {
    const maxIndex = imageCount; // We've added cloned images

    if (index < 0) {
      currentIndex = imageCount - imagesToShow;
      $slide.css(
        "margin-left",
        `${-maxIndex * panelTotalWidth + panelMargin + buttonWidth}rem`
      );
      setTimeout(() => {
        $slide.css("transition", "none");
        $slide.css(
          "margin-left",
          `${-(currentIndex * panelTotalWidth) + buttonWidth + panelMargin}rem`
        );
        setTimeout(() => $slide.css("transition", "margin-left 0.5s ease"), 0);
      }, 500);
    } else if (index >= maxIndex) {
      currentIndex = 0;
      $slide.css(
        "margin-left",
        `${-maxIndex * panelTotalWidth + panelMargin + buttonWidth}rem`
      );
      setTimeout(() => {
        $slide.css("transition", "none");
        $slide.css("margin-left", `${panelMargin + buttonWidth}rem`);
        setTimeout(() => $slide.css("transition", "margin-left 0.5s ease"), 0);
      }, 500);
    } else {
      currentIndex = index;
      $slide.css(
        "margin-left",
        `${-(currentIndex * panelTotalWidth) + panelMargin + buttonWidth}rem`
      );
    }
  }

  $(".next").click(function (e) {
    e.preventDefault();
    moveToIndex(currentIndex + imagesToShow);
  });

  $(".prev").click(function (e) {
    e.preventDefault();
    moveToIndex(currentIndex - imagesToShow);
  });

  // Initialize
  moveToIndex(0);
});
