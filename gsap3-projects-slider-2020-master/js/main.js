function init() {
  gsap.set(".projects", { autoAlpha: 1 });
  gsap.set(".project", { x: "-100%" });

  const element = document.querySelector(".project.project01");
  const projectClasses = element.className.split(" ");
  const projectClass = projectClasses[1];
  const updateClass = (projectClass) => {
    document.querySelector("body").className = projectClass;
  };

  const tlIn = gsap.timeline();
  tlIn.fromTo(
    element,
    {
      autoAlpha: 0,
      x: "-100%",
    },
    {
      duration: 0.7,
      x: 0,
      autoAlpha: 1,
      onStart: updateClass,
      onStartParams: [projectClass],
    }
  );

  const tlOut = gsap.timeline();
  tlOut.to(element, { duration: 0.7, x: 250, autoAlpha: 0 });

  const tlTransition = gsap.timeline();
  tlTransition.add(tlIn).add(tlOut);
}

window.addEventListener("load", function () {
  init();
});
