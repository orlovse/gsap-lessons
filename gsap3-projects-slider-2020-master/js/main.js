function init() {
  gsap.set(".projects", { autoAlpha: 1 });
  gsap.set(".project", { x: "-100%" });

  const totalSlides = document.querySelectorAll(".project").length;

  const updateClass = (projectClass) => {
    document.querySelector("body").className = projectClass;
  };

  const createTimelineIn = (index) => {
    const element = document.querySelector(".project.project0" + index);
    const projectClasses = element.className.split(" ");
    const projectClass = projectClasses[1];
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

    return tlIn;
  };

  const createTimelineOut = (index) => {
    const element = document.querySelector(".project.project0" + index);
    const tlOut = gsap.timeline();
    tlOut.to(element, { duration: 0.7, x: 250, autoAlpha: 0 });
    return tlOut;
  };

  const createTimelineTransition = (index) => {
    const goToIndex = index < totalSlides ? index + 1 : 1;

    const tlOut = createTimelineOut(index);
    const tlIn = createTimelineIn(goToIndex);

    const tlTransition = gsap.timeline({
      onStart: () => {
        currentStep < totalSlides ? currentStep++ : (currentStep = 1);
      },
    });
    tlTransition.add(tlOut).add(tlIn);

    return tlTransition;
  };

  let currentStep = 1;

  createTimelineIn(currentStep);

  document.querySelector("button.next").addEventListener("click", (event) => {
    event.preventDefault();

    createTimelineTransition(currentStep);
  });
}

window.addEventListener("load", function () {
  init();
});
