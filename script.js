// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e,i) => {
    if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'), i*70);
  });
},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Safety net: guarantee all reveal content is visible even if the
// observer above fails to fire for any reason on a given page/browser.
setTimeout(()=>{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}, 2000);

// Nav scroll
const navEl = document.getElementById('nav');
let navScrollTicking = false;
window.addEventListener('scroll',()=>{
  if(!navEl || navScrollTicking) return;
  navScrollTicking = true;
  requestAnimationFrame(()=>{
    navEl.style.padding = window.scrollY>50?'1rem 5%':'1.4rem 5%';
    navScrollTicking = false;
  });
},{passive:true});

// Mobile nav
function toggleNav(){
  const l=document.getElementById('navLinks');
  const open=l.style.display==='flex';
  if(open){l.style.display='none'}
  else{
    l.style.cssText='display:flex;flex-direction:column;position:fixed;top:65px;left:0;right:0;background:rgba(10,10,10,.98);padding:2rem 5%;gap:1.5rem;z-index:99;border-bottom:1px solid rgba(201,168,76,.12)';
  }
}

// GA4 event tracking (privacy-safe: only interaction metadata, no PII)
document.addEventListener('click', (e) => {
  const el = e.target.closest('a[data-ga], a[href*="linkedin.com/company/solante-advisory"]');
  if (!el || typeof gtag !== 'function') return;

  const pagePath = window.location.pathname;
  const pageTitle = document.title;
  const linkText = (el.textContent || '').trim();
  const linkUrl = el.href;

  // Outbound LinkedIn clicks -- matched by href, no markup needed
  if (linkUrl.indexOf('linkedin.com/company/solante-advisory') !== -1) {
    gtag('event', 'linkedin_click', {
      link_url: linkUrl,
      page_path: pagePath,
      page_title: pageTitle
    });
  }

  const gaKeys = (el.dataset.ga || '').split(/\s+/).filter(Boolean);

  gaKeys.forEach((key) => {
    if (key === 'strategy_call') {
      gtag('event', 'strategy_call_click', {
        link_text: linkText,
        link_url: linkUrl,
        page_path: pagePath,
        page_title: pageTitle
      });
    } else if (key === 'article_to_service') {
      gtag('event', 'article_to_service_click', {
        article_slug: 'how-to-build-an-ai-strategy',
        service: 'ai-strategy',
        link_text: linkText,
        page_path: pagePath
      });
    } else if (key === 'article_cta') {
      gtag('event', 'article_cta_click', {
        article_slug: 'how-to-build-an-ai-strategy',
        cta_text: linkText,
        cta_url: linkUrl,
        page_path: pagePath
      });
    }
  });
});

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
