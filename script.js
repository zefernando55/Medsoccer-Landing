/* ============================================
   MEDSOCCER PRO — Landing Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav when link clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // ---- Pricing Toggle ----
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    const pricingAmounts = document.querySelectorAll('.pricing-amount');

    pricingToggle.addEventListener('change', () => {
        const isAnnual = pricingToggle.checked;
        const periods = document.querySelectorAll('.pricing-period');

        monthlyLabel.classList.toggle('active', !isAnnual);
        annualLabel.classList.toggle('active', isAnnual);

        pricingAmounts.forEach(amount => {
            const monthly = amount.getAttribute('data-monthly');
            const annual = amount.getAttribute('data-annual');

            // Animate the number change
            amount.style.opacity = '0';
            amount.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                amount.textContent = isAnnual ? annual : monthly;
                amount.style.opacity = '1';
                amount.style.transform = 'translateY(0)';
            }, 200);
        });

        // Update period text
        periods.forEach(period => {
            period.style.opacity = '0';
            setTimeout(() => {
                period.textContent = isAnnual ? 'pago único' : '/mes';
                period.style.opacity = '1';
            }, 200);
        });
    });

    // Add transition to pricing amounts and periods
    const pricingAmountsAndPeriods = document.querySelectorAll('.pricing-amount, .pricing-period');
    pricingAmountsAndPeriods.forEach(el => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // ---- AOS Animations (Animate On Scroll) ----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            once: true,
            offset: 50,
            delay: 0,
            anchorPlacement: 'top-bottom',
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 72; // navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact Form Handler ----
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        // Mostrar estado de carga
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v4"></path></svg> Enviando...';
        btn.disabled = true;

        fetch("https://formsubmit.co/ajax/info@medsoccerpro.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // Mostrar estado de éxito
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ¡Solicitud Enviada!';
                btn.style.background = '#10B981';
                btn.style.borderColor = '#10B981';
                btn.style.boxShadow = '0 4px 24px rgba(16, 185, 129, 0.25)';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.boxShadow = '';
                    btn.disabled = false;
                    contactForm.reset();

                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            })
            .catch(error => {
                console.error('Error enviando formulario:', error);
                btn.innerHTML = 'Error al enviar';
                btn.style.background = '#EF4444';
                btn.style.borderColor = '#EF4444';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.disabled = false;
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            });
    });

    // ---- Parallax Effect on Hero Background ----
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-bg-img');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
        }
    });

    // ---- Counter Animation for Stats ----
    const statValues = document.querySelectorAll('.hero-stat-value');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const match = text.match(/(\+?)(\d+)(\+?)/);

                if (match) {
                    const prefix = match[1];
                    const number = parseInt(match[2]);
                    const suffix = match[3];
                    let current = 0;
                    const duration = 2000;
                    const step = number / (duration / 16);

                    const counter = setInterval(() => {
                        current += step;
                        if (current >= number) {
                            current = number;
                            clearInterval(counter);
                        }
                        target.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                    }, 16);
                }

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => counterObserver.observe(stat));

    // ---- Language Selector Logic ----
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('open');
            }
        });
    }
});

// Global function to be called from inlineonclick
window.changeLanguage = function(langCode, flag, label) {
    const langFlag = document.getElementById('langFlag');
    const langLabel = document.getElementById('langLabel');
    const langDropdown = document.getElementById('langDropdown');

    if (langFlag) langFlag.textContent = flag;
    if (langLabel) langLabel.textContent = label;
    if (langDropdown) langDropdown.classList.remove('open');

    // Find the Google Translate combo box and dispatch change
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    } else {
        // If it hasn't loaded yet, try again in a bit or set a cookie
        setTimeout(() => {
            const retrySelect = document.querySelector('.goog-te-combo');
            if (retrySelect) {
                retrySelect.value = langCode;
                retrySelect.dispatchEvent(new Event('change'));
            }
        }, 1000);
    }
};
