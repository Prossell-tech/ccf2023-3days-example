window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger)

  const ground = document.querySelector('.ground');
  const groundLandscapeContainer = document.querySelector('.ground .landscape-container');

  gsap.to(groundLandscapeContainer, {
    x: () => +(groundLandscapeContainer.clientWidth - ground.clientWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.ground',
      start: 'top top',
      end: () => `-=${groundLandscapeContainer.clientWidth - ground.clientWidth}`,  // landscapeContainerがgroundの外に出た瞬間に終わる
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const underground = document.querySelector('.underground');
  const undergroundLandscapeContainer = document.querySelector('.underground .landscape-container');

  gsap.to(undergroundLandscapeContainer, {
    x: () => +(undergroundLandscapeContainer.clientWidth - underground.clientWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.underground',
      start: 'top top',
      end: () => `-=${undergroundLandscapeContainer.clientWidth - underground.clientWidth}`,  // landscapeContainerがgroundの外に出た瞬間に終わる
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

// ゴール時におめでとう表示
  const allHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const mostBottom = allHeight - window.innerHeight;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop >= mostBottom) {
      const congratulationsAnimation = document.createElement('img')
      congratulationsAnimation.src = 'images/congratulations.webp'
      congratulationsAnimation.alt = 'congratulations'
      congratulationsAnimation.className = 'congratulations-animation'
      const congratulationsTextContainer = document.createElement('div')
      congratulationsTextContainer.className = 'congratulations-text-container'
      const congratulationsText = document.createElement('p')
      congratulationsText.className = 'congratulations-text'
      congratulationsText.innerText = 'CONGRATULATIONS!!'
      congratulationsTextContainer.appendChild(congratulationsText)
      const container = document.querySelector('.congratulations-container')
      container.innerHTML = ''
      container.appendChild(congratulationsAnimation)
      container.appendChild(congratulationsTextContainer)
    }
  });
})