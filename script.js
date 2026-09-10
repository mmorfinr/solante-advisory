// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => {
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'), i*70);
  });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Nav scroll
window.addEventListener('scroll',()=>{
  const n=document.getElementById('nav');
  if(!n) return;
  n.style.padding=window.scrollY>50?'1rem 5%':'1.4rem 5%';
});

// Mobile nav
function toggleNav(){
  const l=document.getElementById('navLinks');
  const open=l.style.display==='flex';
  if(open){l.style.display='none'}
  else{
    l.style.cssText='display:flex;flex-direction:column;position:fixed;top:65px;left:0;right:0;background:rgba(10,10,10,.98);padding:2rem 5%;gap:1.5rem;z-index:99;border-bottom:1px solid rgba(201,168,76,.12)';
  }
}

// Mobile Services dropdown (desktop uses CSS :hover instead)
document.querySelectorAll('.nav-item-dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.matchMedia('(max-width:1024px)').matches) {
      e.preventDefault();
      link.parentElement.classList.toggle('dd-open');
    }
  });
});

// Smooth scroll for same-page anchors only (e.g. #services on the homepage)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(!target)return;
    e.preventDefault();
    const nav=document.getElementById('nav');
    const offset=nav?nav.offsetHeight:0;
    window.scrollTo({top:target.offsetTop-offset,behavior:'smooth'});
    const l=document.getElementById('navLinks');
    if(l && window.innerWidth<=1024)l.style.display='none';
  });
});
