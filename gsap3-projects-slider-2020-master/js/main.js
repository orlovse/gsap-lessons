function init() {
  gsap.set(".projects", { autoAlpha: 1 });
  gsap.set(".project", { x: "-100%" });
}

window.addEventListener("load", function () {
  init();
});
