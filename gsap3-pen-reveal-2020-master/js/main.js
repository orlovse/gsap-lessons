function init() {
  const height = document.querySelector(".pen-top").clientHeight - 22;
  gsap.set(".part3", {
    y: () => {
      return -height;
    },
    scrollTrigger: {
      id: "pen-body",
      trigger: ".part3",
      start: "top bottom-=270px",
      end: `+=${height}`,
      pin: true,
      pinSpacing: false,
    },
  });

  const allParts = gsap.utils.toArray(".part");
  allParts.forEach((part, index) => {
    let startPosition = "top center";
    if (index === 2) {
      startPosition = `top+=${height} center`;
    }
    gsap.set(part, {
      scrollTrigger: {
        id: `${part.getAttribute("class")}`,
        trigger: part,
        start: startPosition,
        toggleClass: "fade-in",
      },
    });
  });

  const partTopOffsets = [547, 722, 842];

  gsap.utils.toArray([".part4", ".part5", ".part6"]).forEach((part, index) => {
    gsap.set(part, { y: -partTopOffsets[index] });

    gsap.to(part, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".pen-body",
        start: "top bottom-=640px",
        end: `+=${partTopOffsets[index]}`,
        scrub: true,
      },
    });
  });
}

window.addEventListener("load", function () {
  init();
});
