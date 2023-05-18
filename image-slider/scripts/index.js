window.addEventListener('load', () => {
  const sliderImages = document.querySelectorAll('.slider-image');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  let currentIndex = 0;
  function showPreviousImage() {
    sliderImages[currentIndex].style.opacity = 0;
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    sliderImages[currentIndex].style.opacity = 1;
  }

  function showNextImage() {
    sliderImages[currentIndex].style.opacity = 0;
    currentIndex = (currentIndex + 1) % sliderImages.length;
    sliderImages[currentIndex].style.opacity = 1;
  }
  prevButton.addEventListener('click', showPreviousImage);
  nextButton.addEventListener('click', showNextImage);
})