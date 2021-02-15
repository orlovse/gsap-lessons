function init() {
  gsap.set(".projects", { autoAlpha: 1 });
  gsap.set(".project", { x: "-100%" });

  const totalSlides = document.querySelectorAll(".project").length;
  const wrapper = gsap.utils.wrap(0, totalSlides);

  const updateClass = (projectClass) => {
    document.querySelector("body").className = projectClass;
  };

  const createTimelineIn = (direction, index) => {
    const goPrev = direction === "prev";

    const element = document.querySelector(".project.project0" + index);
    const projectClasses = element.className.split(" ");
    const projectClass = projectClasses[1];
    const title = element.querySelector(".project-title");
    const subtitle = element.querySelector(".project-subtitle");
    const button = element.querySelector(".button-container");

    const tlIn = gsap.timeline({
      defaults: {
        modifiers: {
          x: gsap.utils.unitize((x) => {
            return goPrev ? Math.abs(x) : x;
          }),
        },
      },
    });
    tlIn
      .fromTo(
        element,
        {
          autoAlpha: 0,
          x: "-100%",
        },
        {
          duration: 0.3,
          ease: Power4.out,
          x: 0,
          autoAlpha: 1,
          onStart: updateClass,
          onStartParams: [projectClass],
        }
      )
      .from([title, subtitle, button], {
        duration: 0.2,
        x: -20,
        autoAlpha: 0,
        stagger: 0.1,
      });

    return tlIn;
  };

  const createTimelineOut = (direction, index) => {
    const goPrev = direction === "prev";

    const element = document.querySelector(".project.project0" + index);
    const tlOut = gsap.timeline();
    tlOut.to(element, {
      duration: 0.3,
      x: 250,
      autoAlpha: 0,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          return goPrev ? -x : x;
        }),
      },
      ease: "back.in(2)",
    });
    return tlOut;
  };

  const updateCurrentStep = (goToIndex) => {
    currentStep = goToIndex;

    document.querySelectorAll(".dot").forEach((element, index) => {
      element.setAttribute("class", "dot");
      if (index === currentStep) {
        element.classList.add("active");
      }
    });
    positionDot();
  };

  const createTimelineTransition = (direction, toIndex) => {
    const tlOut = createTimelineOut(direction, currentStep);
    const tlIn = createTimelineIn(direction, toIndex);

    const tlTransition = gsap.timeline({
      onStart: () => {
        updateCurrentStep(toIndex);
      },
    });
    tlTransition.add(tlOut).add(tlIn);

    return tlTransition;
  };

  const isTweening = () => {
    return gsap.isTweening(".project");
  };

  let currentStep = 0;

  createTimelineIn("next", currentStep);

  document.querySelector("button.next").addEventListener("click", (event) => {
    event.preventDefault();
    const nextStep = wrapper(currentStep + 1);

    !isTweening() && createTimelineTransition("next", nextStep);
  });

  document.querySelector("button.prev").addEventListener("click", (event) => {
    event.preventDefault();

    // const isFirst = currentStep === 0;
    // const prevStep = isFirst ? totalSlides : currentStep - 1;
    const prevStep = wrapper(currentStep - 1);
    !isTweening() && createTimelineTransition("prev", prevStep);
  });

  const createNavigation = () => {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "dots");

    const spot = document.createElement("div");
    spot.setAttribute("class", "spot");

    for (let index = 0; index < totalSlides; index++) {
      const element = document.createElement("button");
      const text = document.createTextNode(index);
      element.appendChild(text);
      element.setAttribute("class", "dot");
      if (currentStep === index) {
        element.classList.add("active");
      }

      element.addEventListener("click", () => {
        if (!isTweening() && currentStep !== index) {
          const direction = index > currentStep ? "next" : "prev";
          createTimelineTransition(direction, index);
        }
      });
      newDiv.appendChild(element);
    }

    newDiv.appendChild(spot);
    document.querySelector(".projects").append(newDiv);
    positionDot();
  };

  const positionDot = () => {
    const activeDotX = document.querySelector(".dot.active").offsetLeft;
    const spot = document.querySelector(".spot");
    const spotX = spot.offsetLeft;
    const destinationX = Math.round(activeDotX - spotX + 5);

    const dotTl = gsap.timeline();
    dotTl
      .to(spot, {
        duration: 0.4,
        x: destinationX,
        scale: 2.5,
        ease: "powe1.Out",
      })
      .to(spot, { duratiom: 0.2, scale: 1, ease: "power1.in" });
  };

  createNavigation();
}

window.addEventListener("load", function () {
  init();
});
