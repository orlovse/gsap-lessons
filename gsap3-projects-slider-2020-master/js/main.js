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
}

window.addEventListener("load", function () {
  init();
});
