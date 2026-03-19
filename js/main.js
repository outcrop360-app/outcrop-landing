// js/main.js

function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLang', lang);

    // Actualizar UI del selector
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');

    // Actualizar Textos
    document.getElementById('nav-features').textContent = translations[lang].navFeatures;
    document.getElementById('nav-plans').textContent = translations[lang].navPlans;
    document.getElementById('nav-cta').textContent = translations[lang].navCta;
    document.getElementById('hero-title').innerHTML = translations[lang].heroTitle;
    document.getElementById('hero-subtitle').textContent = translations[lang].heroSubtitle;
    document.getElementById('hero-cta').textContent = translations[lang].heroCta;
}

// NUEVA FUNCIÓN: Inyecta los componentes reutilizables
function injectComponents() {
    const logoContainer = document.getElementById('animated-logo-container');
    if (logoContainer) {
        // ANIMATED_LOGO_SVG viene del archivo js/components.js
        logoContainer.innerHTML = ANIMATED_LOGO_SVG;
    }
}

window.onload = function() {
    // 1. Inyectamos componentes reutilizables (Como el logo)
    injectComponents();

    // 2. Manejamos el idioma
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('es') ? 'es' : 'en';
    setLanguage(savedLang || browserLang);
};
