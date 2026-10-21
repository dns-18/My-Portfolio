let timeout;

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links a");

function initNavigationRoll() {
  if (typeof gsap === "undefined") return;

  document.querySelectorAll(".nav-roll-link").forEach((link) => {
    const faces = link.querySelectorAll("span");
    if (faces.length < 2) return;

    gsap.set(faces[1], { yPercent: 100, rotateX: -90 });

    const rollIn = () => {
      gsap.to(faces[0], { yPercent: -100, rotateX: 90, duration: 0.38, ease: "power3.inOut" });
      gsap.to(faces[1], { yPercent: 0, rotateX: 0, duration: 0.38, ease: "power3.inOut" });
    };
    const rollOut = () => {
      gsap.to(faces[0], { yPercent: 0, rotateX: 0, duration: 0.38, ease: "power3.inOut" });
      gsap.to(faces[1], { yPercent: 100, rotateX: -90, duration: 0.38, ease: "power3.inOut" });
    };

    link.addEventListener("mouseenter", rollIn);
    link.addEventListener("mouseleave", rollOut);
    link.addEventListener("focus", rollIn);
    link.addEventListener("blur", rollOut);
  });
}

function scrollToTarget(targetElement) {
    targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

if (menuBtn && navLinks) {
    function setMenuOpen(isOpen) {
        navLinks.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.textContent = isOpen ? "MENU−" : "MENU+";
    }

    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.contains("active");
        setMenuOpen(!isOpen);
    });
    document.addEventListener("keydown",(event)=>{
                if (event.key === "Escape") {
            setMenuOpen(false);
            menuBtn.focus();
        }
    })
        document.addEventListener("click", (event) => {
        const clickedInsideMenu =
            navLinks.contains(event.target) ||
            menuBtn.contains(event.target);

        if (!clickedInsideMenu) {
            setMenuOpen(false);
        }
    });
        navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuOpen(false);
        });
    });
}

function updateTime(){
    const timeElement = document.getElementById("time");
    if (!timeElement) return;

    const now = new Date();

    let time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    document.getElementById("time").textContent = time.toUpperCase();
}

setInterval(updateTime, 1000);
updateTime();


if (links.length) {
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = link.getAttribute("href");

            if (!target || !target.startsWith("#")) return;

            const targetElement = document.querySelector(target);
            if (!targetElement) return;

            event.preventDefault();

            scrollToTarget(targetElement);

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (menuBtn) {
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.textContent = "MENU+";
            }

        });
    });
}


function firstPageAnimate(){
    const hero = document.getElementById('hero');
  if (!hero || typeof gsap === "undefined") return;

    const boundels = hero.querySelectorAll('.boundel');
    const heroIntro = hero.querySelector('.work-hero-intro');
    let tl = gsap.timeline();
    gsap.set(boundels, { y: 0, yPercent: 100 });

    if (heroIntro) {
        gsap.set(heroIntro, { y: 28, opacity: 0 });
    }

    tl.from('#nav',{
        y : '-10',
        opacity: 0,
        duration:2,
        ease: "expo.inOut"
    })
    .to(boundels,{
      y: 0,
      yPercent: 0,
        duration: 2,
        ease: "expo.inOut",
        delay: -1, 
        stagger: 0.2
      });

    if (heroIntro) {
        tl.to(heroIntro, {
            y: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power3.out"
        });
    }

    tl
    .from('#herofooter',{
        y : '-10',
        opacity: 0,
        duration:2,
        delay: -1, 
        ease: "expo.inOut"
    })
}
firstPageAnimate();
initNavigationRoll();

function circleSkew(){
    const minicircle = document.querySelector('#minicircle');
  if (!minicircle || typeof gsap === "undefined") return;

    let xscale = 1;
    let yscale = 1;
    let xprev = 0;
    let yprev = 0;
    
    window.addEventListener('mousemove',(dets)=>{
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8,1.2,dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8,1.2,dets.clientY - yprev);
        // let xdiff = dets.clientX - xprev;
        
        // let ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;
        
        
        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(()=>{
            minicircle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100)
    })
}
circleSkew();

function circleMouseFollower(xscale,yscale){
    const minicircle = document.querySelector('#minicircle');
  if (!minicircle || typeof gsap === "undefined") return;

    window.addEventListener('mousemove',(dets)=>{
        minicircle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circleMouseFollower();

document.querySelectorAll('.elem').forEach((elem)=>{
  if (typeof gsap === "undefined") return;

    let rotate = 0;
    let diffrotate= 0;
    elem.addEventListener('mousemove',(dets)=>{

        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;
       
        gsap.to(elem.querySelector('img'),{
            opacity: 1,
            ease: "power3.out",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrotate*0.5),
        })
    })
    elem.addEventListener('mouseleave',(dets)=>{
       
        gsap.to(elem.querySelector('img'),{
            opacity: 0,
            ease: "power3.out",
            duration:0.5,
        })
    })
})




const backToTop = document.getElementById("back-to-top");
const hero = document.getElementById("hero");

if (backToTop && hero) {
    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        scrollToTarget(hero);
    });
}



/* ==========================================
   PREMIUM GSAP SCROLL REVEALS
========================================== */

(function initPremiumScrollReveals() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP is unavailable. Scroll reveals were skipped.");
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Do not include #hero or its existing .boundel animation.
  const projectRows = [
    ...document.querySelectorAll("#secondhero .elem"),
    ...document.querySelectorAll(".work-card")
  ];

  const sections = [
    document.querySelector("#viewwork"),
    document.querySelector("#companies"),
    document.querySelector("#about"),
    document.querySelector("#follow"),
    document.querySelector(".portfolio-footer"),
    document.querySelector(".work-grid-wrap"),
    document.querySelector(".work-footer")
  ].filter(Boolean);

  // Give project rows a distinctive alternating entrance.
  projectRows.forEach((element, index) => {
    element.classList.add("gsap-reveal");
    element.classList.add(index % 2 === 0 ? "gsap-reveal-up" : "gsap-reveal-left");
  });

  // Section entrance effects.
  sections.forEach((element, index) => {
    element.classList.add("gsap-reveal");
    element.classList.add(index % 2 === 0 ? "gsap-reveal-up" : "gsap-reveal-scale");
  });

  // Animate existing headings with a clipping mask.
  const headings = [
    ...document.querySelectorAll(
      "#companies h2, #about h2, #follow h2, .contact-section h1, .contact-section h2"
    )
  ].filter((heading) => !heading.closest("#hero"));

  headings.forEach((heading) => {
    if (heading.dataset.gsapMaskReady === "true") return;

    // Avoid wrapping a heading that already contains complex child elements.
    if (heading.children.length > 0) return;

    const wrapper = document.createElement("span");
    const inner = document.createElement("span");

    wrapper.className = "gsap-mask";
    inner.className = "gsap-mask-inner";

    heading.dataset.gsapMaskReady = "true";

    while (heading.firstChild) {
      inner.appendChild(heading.firstChild);
    }

    wrapper.appendChild(inner);
    heading.appendChild(wrapper);
  });

  const maskedInners = [
    ...document.querySelectorAll(".gsap-mask-inner")
  ];

  const allTargets = [...new Set([
    ...projectRows,
    ...sections,
    ...maskedInners
  ])];

  if (!("IntersectionObserver" in window)) {
    allTargets.forEach((element) => {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";
    });
    return;
  }

  allTargets.forEach((element) => {
    if (element.classList.contains("gsap-mask-inner")) return;

    gsap.set(element, {
      autoAlpha: 0,
      y: 48
    });

    if (element.classList.contains("gsap-reveal-left")) {
      gsap.set(element, { x: -42, y: 0 });
    }

    if (element.classList.contains("gsap-reveal-scale")) {
      gsap.set(element, { scale: 0.94, y: 0 });
    }
  });

  const revealedGroups = new WeakSet();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (!entry.isIntersecting) {
        if (element.classList.contains("gsap-mask-inner")) {
          gsap.set(element, { y: "110%" });
        } else {
          element.classList.remove("is-revealed");
          gsap.set(element, {
            autoAlpha: 0,
            x: element.classList.contains("gsap-reveal-left") ? -42 : 0,
            y: element.classList.contains("gsap-reveal-up") ? 48 : 0,
            scale: element.classList.contains("gsap-reveal-scale") ? 0.94 : 1
          });
        }
        return;
      }

      // A section and its child heading can enter together.
      if (element.classList.contains("gsap-mask-inner")) {
        gsap.to(element, {
          y: "0%",
          duration: 1,
          ease: "power4.out",
          overwrite: "auto"
        });
        return;
      }

      element.classList.add("is-revealed");

      // Reveal project rows in a staggered group.
      if (projectRows.includes(element)) {
        const pendingRows = projectRows.filter(
          (row) => row !== element && !revealedGroups.has(row)
        );

        const group = [element, ...pendingRows]
          .filter((row) => row.isConnected);

        group.forEach((row) => {
          revealedGroups.add(row);
          row.classList.add("is-revealed");
        });

        gsap.to(group, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: isMobile ? 0.65 : 0.9,
          stagger: isMobile ? 0.08 : 0.14,
          ease: "power3.out",
          overwrite: "auto",
          clearProps: "transform,willChange"
        });

        return;
      }

      gsap.to(element, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
        clearProps: "transform,willChange"
      });
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  allTargets.forEach((element) => observer.observe(element));

  console.info(
    `Premium scroll reveals initialized: ${allTargets.length} targets.`
  );
})();



/* STEP 8.5 — CONTACT GSAP EXPERIENCE */

(() => {
    const section = document.querySelector(".contact-section");

    if (!section || typeof gsap === "undefined") return;

    const revealItems = section.querySelectorAll("[data-contact-reveal]");

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Respect accessibility preferences.
    if (reduceMotion) return;

    // Set the initial state only for elements that will animate.
    gsap.set(revealItems, {
        y: 28,
        opacity: 0
    });

    const revealTimeline = gsap.timeline({ paused: true });

    revealTimeline.to(revealItems, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity"
    });

    // Reveal when the contact section enters the viewport.
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    revealTimeline.play();
                    observer.disconnect();
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    observer.observe(section);

})();
