// Funciones seguras para evitar que el script se rompa si falta un ID
const safeSetText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
const safeSetHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);

    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');

    const t = translations[lang];

    // Nav y Hero
    safeSetText('nav-features', t.navFeatures);
    safeSetText('nav-plans', t.navPlans);
    safeSetText('nav-cta', t.navCta);
    safeSetHTML('hero-title', t.heroTitle); // Usamos HTML para no romper el span de color
    safeSetText('hero-subtitle', t.heroSubtitle);
    safeSetText('hero-cta', t.heroCta);

    // Scroll GSAP
    safeSetText('feat1-title', t.feat1Title);
    safeSetText('feat1-desc', t.feat1Desc);
    safeSetText('feat2-title', t.feat2Title);
    safeSetText('feat2-desc', t.feat2Desc);
    safeSetText('feat3-title', t.feat3Title);
    safeSetText('feat3-desc', t.feat3Desc);
    safeSetText('feat4-title', t.feat4Title);
    safeSetText('feat4-desc', t.feat4Desc);

    // Bento Box
    safeSetText('bento-main-title', t.bentoTitle);
    safeSetText('bento1-title', t.bento1Title);
    safeSetText('bento1-desc', t.bento1Desc);
    safeSetText('bento2-title', t.bento2Title);
    safeSetText('bento2-desc', t.bento2Desc);
    safeSetText('bento3-title', t.bento3Title);
    safeSetText('bento3-desc', t.bento3Desc);
    safeSetText('bento4-title', t.bento4Title);
    safeSetText('bento4-desc', t.bento4Desc);

    // Audiencia
    safeSetText('audience-title', t.audienceTitle);

    // Footer
    safeSetText('footer-follow', t.footerFollow);
    safeSetText('footer-product-title', t.footerProduct);
    safeSetText('footer-company-title', t.footerCompany);
    safeSetText('footer-support-title', t.footerSupport);
    safeSetText('footer-features', t.navFeatures);
    safeSetText('footer-plans', t.footerPlans);
    safeSetText('footer-about', t.footerAbout);
    safeSetText('footer-contact', t.footerContact);
    safeSetText('footer-terms', t.footerTerms);
    safeSetText('footer-privacy', t.footerPrivacy);
    safeSetText('footer-help', t.footerHelp);
    safeSetText('footer-rights', t.footerRights);
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
            end: "+=300%", 
            scrub: 1,
            pin: true,
        }
    });

    gsap.set("#fb-2, #fb-3, #fb-4", { opacity: 0, y: 50 });
    gsap.set("#fb-1", { opacity: 1, y: 0 });

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

// Función para mostrar/ocultar la tabla de comparación detallada
function toggleMatrix() {
    const container = document.getElementById('matrixContainer');
    const buttonEs = document.getElementById('btn-matrix-es');
    const buttonEn = document.getElementById('btn-matrix-en');
    
    container.classList.toggle('expanded');
    
    if (container.classList.contains('expanded')) {
        if (buttonEs) buttonEs.textContent = "Ocultar características ▲";
        if (buttonEn) buttonEn.textContent = "Hide full comparison ▲";
    } else {
        if (buttonEs) buttonEs.textContent = "Ver todas las características ▼";
        if (buttonEn) buttonEn.textContent = "See full comparison ▼";
    }
}

window.onload = function() {
    injectComponents();
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('es') ? 'es' : 'en';
    setLanguage(savedLang || browserLang);
    initScrollAnimations();
};
