const ground = document.querySelector('.ground');
const landscapeContainer = document.querySelector('.landscape-container');

gsap.registerPlugin(ScrollTrigger)

gsap.to(landscapeContainer, {
  x: () => +(landscapeContainer.clientWidth - ground.clientWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.ground',
    start: 'top top',
    end: () => `-=${landscapeContainer.clientWidth - ground.clientWidth}`,  // landscapeContainerがgroundの外に出た瞬間に終わる
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    markers: true
  },
});