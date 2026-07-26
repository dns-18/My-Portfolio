let timeout;

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll("#nav-links a");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
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
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const target = link.getAttribute("href");

            if (!target || !target.startsWith("#")) {
                return;
            }

            e.preventDefault(); 

            scroll.scrollTo(document.querySelector(target)); 

            navLinks.classList.remove("active");

            setTimeout(()=>{
                if (scroll) {
                    scroll.update();
                }
            },300);

        });
    });
}

const scrollContainer = document.querySelector('#main');
const scroll = scrollContainer ? new LocomotiveScroll({
    el : scrollContainer,
    smooth:true
}) : null;


function firstPageAnimate(){
    const hero = document.getElementById('hero');
    if (!hero) return;

    let tl = gsap.timeline();
    tl.from('#nav',{
        y : '-10',
        opacity: 0,
        duration:2,
        ease: Expo.easeInOut
    })
    .to('.boundel',{
        y : '0',
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1, 
        stagger: 0.2
        
    })
    .from('#herofooter',{
        y : '-10',
        opacity: 0,
        duration:2,
        delay: -1, 
        ease: Expo.easeInOut
    })
}
firstPageAnimate();

function circleSkew(){
    const minicircle = document.querySelector('#minicircle');
    if (!minicircle) return;

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
    if (!minicircle) return;

    window.addEventListener('mousemove',(dets)=>{
        minicircle.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
circleMouseFollower();

document.querySelectorAll('.elem').forEach((elem)=>{
    let rotate = 0;
    let diffrotate= 0;
    elem.addEventListener('mousemove',(dets)=>{

        let diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;
       
        gsap.to(elem.querySelector('img'),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrotate*0.5),
        })
    })
    elem.addEventListener('mouseleave',(dets)=>{
       
        gsap.to(elem.querySelector('img'),{
            opacity: 0,
            ease: Power3,
            duration:0.5,
        })
    })
})