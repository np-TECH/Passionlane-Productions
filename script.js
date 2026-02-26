const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
}

const letters = document.querySelectorAll('.letter');
const danceZone = document.getElementById('hero-text');
if (danceZone && letters.length > 0) {
    danceZone.addEventListener('mouseenter', () => {
        letters.forEach(l => {
            gsap.to(l, { x: gsap.utils.random(-20, 20), y: gsap.utils.random(-30, 30), rotation: gsap.utils.random(-15, 15), color: '#FF0033', duration: 0.6 });
        });
        if(cursor) gsap.to(cursor, { scale: 8, mixBlendMode: 'difference', backgroundColor: 'white' });
    });
    danceZone.addEventListener('mouseleave', () => {
        gsap.to(letters, { x: 0, y: 0, rotation: 0, color: 'white', duration: 0.6 });
        if(cursor) gsap.to(cursor, { scale: 1, mixBlendMode: 'normal', backgroundColor: '#FF0033' });
    });
}