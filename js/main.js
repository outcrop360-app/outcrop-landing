function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);

    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');

    const t = translations[lang];

    // Nav y Hero
    document.getElementById('nav-features').textContent = t.navFeatures;
    document.getElementById('nav-plans').textContent = t.navPlans;
    document.getElementById('nav-cta').textContent = t.navCta;
    document.getElementById('hero-title').innerHTML = t.heroTitle;
    document.getElementById('hero-subtitle').textContent = t.heroSubtitle;
    document.getElementById('hero-cta').textContent = t.heroCta;

    // Scroll GSAP
    document.getElementById('feat1-title').textContent = t.feat1Title;
    document.getElementById('feat1-desc').textContent = t.feat1Desc;
    document.getElementById('feat2-title').textContent = t.feat2Title;
    document.getElementById('feat2-desc').textContent = t.feat2Desc;
    document.getElementById('feat3-title').textContent = t.feat3Title;
    document.getElementById('feat3-desc').textContent = t.feat3Desc;
    document.getElementById('feat4-title').textContent = t.feat4Title;
    document.getElementById('feat4-desc').textContent = t.feat4Desc;

    // Bento Box
    document.getElementById('bento-main-title').textContent = t.bentoTitle;
    document.getElementById('bento1-title').textContent = t.bento1Title;
    document.getElementById('bento1-desc').textContent = t.bento1Desc;
    document.getElementById('bento2-title').textContent = t.bento2Title;
    document.getElementById('bento2-desc').textContent = t.bento2Desc;
    document.getElementById('bento3-title').textContent = t.bento3Title;
    document.getElementById('bento3-desc').textContent = t.bento3Desc;
    document.getElementById('bento4-title').textContent = t.bento4Title;
    document.getElementById('bento4-desc').textContent = t.bento4Desc;

    // Audiencia
    document.getElementById('audience-title').textContent = t.audienceTitle;
}

function injectComponents() {
    const logoContainer = document.getElementById('animated-logo-container');
    if (logoContainer) {
        logoContainer.innerHTML = ANIMATED_LOGO_SVG;
    }
}

function setActiveImage(imgId) {
    document.querySelectorAll('.feature-img').forEach(img => img.classList.remove('active'));
    const target = document.querySelector(imgId);
    if (target) target.classList.add('active');
}

function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".features-scroll-section",
            start: "top top",
            end: "+=300%", // Más largo porque ahora son 4 pasos
            scrub: 1,
            pin: true,
        }
    });

    // Estado inicial
    gsap.set("#fb-2, #fb-3, #fb-4", { opacity: 0, y: 50 });
    gsap.set("#fb-1", { opacity: 1, y: 0 });

    // Secuencia de los 4 pasos
    tl.to("#fb-1", { opacity: 0, y: -50, duration: 1 })
      .call(() => setActiveImage("#f-img-2"))
      .to("#fb-2", { opacity: 1, y: 0, duration: 1 }, "<")
      
      .to("#fb-2", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
      .call(() => setActiveImage("#f-img-3"))
      .to("#fb-3", { opacity: 1, y: 0, duration: 1 }, "<")

      .to("#fb-3", { opacity: 0, y: -50, duration: 1 }, "+=0.5")
      .call(() => setActiveImage("#f-img-4"))
      .to("#fb-4", { opacity: 1, y: 0, duration: 1 }, "<");
}

window.onload = function() {
    injectComponents();
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('es') ? 'es' : 'en';
    setLanguage(savedLang || browserLang);
    initScrollAnimations();
};
