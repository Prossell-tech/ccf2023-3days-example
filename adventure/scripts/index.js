const ground = document.querySelector('.ground');
const groundLandscapeContainer = document.querySelector('.ground .landscape-container');

gsap.registerPlugin(ScrollTrigger)

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