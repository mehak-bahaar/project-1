//applying smooth scrolling using locomotive scroll

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
//defining logic for the circle that follows the mouse move
circleMouseFollower = (xScale, yScale) => {
  window.addEventListener("mousemove", (dets) => {
    // console.log(dets.clientX , dets.clientY);
    document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xScale} , ${yScale})`;
  });
};

//mini circle that follows the mouse animation
// the skew effect on the circle mouse follower
//hum ne define karna hai k jab mouse move ho to slew kar pae or maximum skew or minimum skew define kar pae
//next yeh logic define karni hai k jav mouse move kare to chapta ki valie barhe or jab mouse chalna band ho to chapta hata diya jae
let timeOut;
circleSkewWithMove = () => {
  //define default value
  let xScale = 1;
  let yScale = 1;
  
  let xPrev = 0; 
  let yPrev = 0; 
  
  window.addEventListener("mousemove" , (dets) => {
    clearTimeout(timeOut)

    xScale = gsap.utils.clamp(.8,1.2, dets.clientX - xPrev);
    yScale = gsap.utils.clamp(.8,1.2, dets.clientY - yPrev);
    
    xPrev = dets.clientX;
    yPrev = dets.clientY;  
    
    circleMouseFollower(xScale , yScale)

    timeOut = setTimeout(() => {
        document.querySelector(
          "#miniCircle"
        ).style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1 , 1)`;
    } , 100)
  })
}

//the first page animations
firstPageAnimation = () => {
  let tl = gsap.timeline();

    gsap.set("#heroFooter", { opacity: 0 });

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
    .to(".boundingElement", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 3,
      delay: -1.5,
      stagger: 0.2
    })
    .to("#heroFooter" , {
      y: 10,
      opacity: 1,
      duration: 1.5,
      delay: -1.5,
      ease: Expo.easeInOut
    });
}

//executing the functions
circleMouseFollower()
firstPageAnimation();
circleSkewWithMove();

//animation on the second page
//select the three sections of the second page
//apply mouse hover and find out where the mouse is which means to find out the x and y positions of mouse
//im place of the x and y position of the mouse show the picture there and move that image.
//rotate the image as the mouse moves 
//as the speed of the mouse move increases the rotation also increases

document.querySelectorAll(".sections").forEach((sections) => {
  
  let rotate = 0;
  let diffrot = 0;

  sections.addEventListener("mouseleave" , (dets) => {
        gsap.to(sections.querySelector("img"), {
          opacity: 0,
          ease: Power3.ease,
          duration: 0.5
        });
  })

  sections.addEventListener("mousemove" , (dets) => {

    let diffY = dets.clientY - (sections.querySelector("img").clientHeight / 2) - sections.getBoundingClientRect().top
    let diffX = dets.clientX - (sections.querySelector("img").clientWidth / 2)
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    
    gsap.to(sections.querySelector("img"), {
      opacity: 1,
      ease: Power3.ease,
      top: diffY,
      left: diffX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 1.2 )
    });
  })
});

const about = gsap.utils.toArray("#about");

about.forEach((box , i) => {
  const anim = gsap.fromTo(box , {autoAlpha: 0, y: 50},{duration: 1, autoAlpha:1, y:0});
  ScrollTrigger.create({
    trigger: box,
    animation : anim,
    toggleActions: "play none none none",
    once : true,
  })
})

