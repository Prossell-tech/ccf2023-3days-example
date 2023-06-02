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
    markers: true
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
    markers: true
  },
});
