document.addEventListener('DOMContentLoaded', () => {
    
    // responsive mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const menuLabel = document.getElementById('menu-label');
 
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                menuIcon.className = 'fa-solid fa-xmark transition-transform duration-300';
                if (menuLabel) menuLabel.textContent = 'Close';
                menuBtn.classList.add('bg-accent', 'text-neutral-950');
                menuBtn.classList.remove('bg-accent/10', 'text-accent');
            } else {
                menuIcon.className = 'fa-solid fa-terminal transition-transform duration-300';
                if (menuLabel) menuLabel.textContent = 'Menu';
                menuBtn.classList.remove('bg-accent', 'text-neutral-950');
                menuBtn.classList.add('bg-accent/10', 'text-accent');
            }
        });
    }
 
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });
 
    revealElements.forEach(element => revealObserver.observe(element));
 
    //Home Page
    const typingTarget = document.getElementById('typing-text');
    if (typingTarget) {
        const words = ["WEBSITES_", "APPLICATIONS_", "INTERFACES_", "EXPERIENCES_"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
 
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingTarget.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTarget.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
 
            let typeSpeed = isDeleting ? 30 : 70;
 
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400; 
            }
 
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 500);
    }

    // Loading dots
    const loadingDotsElements = document.querySelectorAll('.loading-dots');
    if (loadingDotsElements.length > 0) {
        loadingDotsElements.forEach(el => {
            let dotCount = 0;
            setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                el.textContent = '.'.repeat(dotCount);
            }, 400);
        });
    }
 
    // Contact form (Web3Forms)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('contact-submit-btn');
        const statusEl = document.getElementById('form-status');
        const emailInput = document.getElementById('email-input');

        function setStatus(message, colorClass) {
            if (!statusEl) return;
            statusEl.textContent = message;
            statusEl.className = 'text-xs font-mono tracking-widest text-center ' + colorClass;
        }

        // Stricter email format
        function isValidEmail(value) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            return pattern.test(value.trim());
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (emailInput && !isValidEmail(emailInput.value)) {
                setStatus('> Invalid return address. Enter a valid email.', 'text-red-500');
                emailInput.focus();
                return;
            }

            const captchaResponse = contactForm.querySelector('[name="h-captcha-response"]');
            if (!captchaResponse || !captchaResponse.value) {
                setStatus('> Please complete the human verification check.', 'text-red-500');
                return;
            }

            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Transmitting...';
            setStatus('> Establishing secure connection...', 'text-neutral-500');

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });
                const result = await response.json();

                if (result.success) {
                    setStatus('> Transmission successful. Message received.', 'text-green-500');
                    contactForm.reset();
                    if (window.hcaptcha) { window.hcaptcha.reset(); }
                } else {
                    setStatus('> Transmission failed: ' + (result.message || 'Unknown error'), 'text-red-500');
                }
            } catch (error) {
                setStatus('> Connection error. Please try again later.', 'text-red-500');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // Mail button
    const mailScrollBtn = document.getElementById('mail-scroll-btn');
    const nameInput = document.getElementById('name-input');
    const mailTriggers = document.querySelectorAll('.mail-scroll-trigger');

    function focusContactForm() {
        if (!nameInput) return;
        nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => nameInput.focus(), 500);
    }

    if (mailScrollBtn && nameInput) {
        mailScrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            focusContactForm();
        });
    }

    if (mailTriggers.length > 0) {
        mailTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (nameInput) {
                    e.preventDefault();
                    focusContactForm();
                }
            });
        });
    }

    // footer mail link
    if (window.location.hash === '#contact-form' && nameInput) {
        setTimeout(focusContactForm, 300);
    }

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const projectModalWindow = document.getElementById('project-modal-window');
    const projectModalBackdrop = document.getElementById('project-modal-backdrop');

    if (projectModal && projectModalWindow) {
        const modalImg = document.getElementById('modal-img');
        const modalTag = document.getElementById('modal-tag');
        const modalTitle = document.getElementById('modal-title');
        const modalWindowTitle = document.getElementById('modal-window-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTech = document.getElementById('modal-tech');
        const modalLink = document.getElementById('modal-link');
        const modalLinkLabel = document.getElementById('modal-link-label');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalCloseBtn2 = document.getElementById('modal-close-btn-2');

        function slugify(text) {
            return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') + '.exe';
        }

        function openProjectModal(card) {
            const tag = card.getAttribute('data-tag') || '';
            const title = card.getAttribute('data-title') || '';
            const img = card.getAttribute('data-img') || '';
            const desc = card.getAttribute('data-desc') || '';
            const tech = card.getAttribute('data-tech') || '';
            const link = card.getAttribute('data-link');
            const linkLabel = card.getAttribute('data-link-label') || 'Launch Project';

            modalTag.textContent = '> ' + tag;
            modalTitle.textContent = title;
            modalWindowTitle.textContent = slugify(title);
            modalImg.src = img;
            modalImg.alt = title;
            modalDesc.textContent = desc;
            modalTech.textContent = tech;

            if (link) {
                modalLink.href = link;
                modalLinkLabel.textContent = linkLabel;
                modalLink.classList.remove('hidden');
            } else {
                modalLink.classList.add('hidden');
            }

            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            requestAnimationFrame(() => {
                projectModalWindow.style.opacity = '1';
                projectModalWindow.style.transform = 'scale(1)';
            });
        }

        function closeProjectModal() {
            projectModalWindow.style.opacity = '0';
            projectModalWindow.style.transform = 'scale(0.95)';
            setTimeout(() => {
                projectModal.classList.add('hidden');
                projectModal.classList.remove('flex');
                document.body.style.overflow = '';
            }, 200);
        }

        projectModalWindow.style.opacity = '0';
        projectModalWindow.style.transform = 'scale(0.95)';

        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => openProjectModal(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(card);
                }
            });
        });

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
        if (modalCloseBtn2) modalCloseBtn2.addEventListener('click', closeProjectModal);
        if (modalLink) modalLink.addEventListener('click', (e) => e.stopPropagation());
        if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);
        projectModalWindow.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
                closeProjectModal();
            }
        });
    }

    //Projects
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
 
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-accent', 'text-neutral-950', 'border-accent', 'shadow-[0_0_10px_rgba(180,83,9,0.3)]');
                    btn.classList.add('bg-neutral-900', 'border-neutral-800', 'text-neutral-400');
                });
                
                button.classList.add('bg-accent', 'text-neutral-950', 'border-accent', 'shadow-[0_0_10px_rgba(180,83,9,0.3)]');
                button.classList.remove('bg-neutral-900', 'border-neutral-800', 'text-neutral-400');
 
                const activeFilter = button.getAttribute('data-filter');
 
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (activeFilter === 'all' || cardCategory === activeFilter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
 
    //smart scroll
    const header = document.querySelector('header');
    
    if (header) {
        header.style.transition = 'top 0.4s ease-in-out';
        
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop <= 0) {
                header.style.top = '1.5rem';
                lastScrollTop = scrollTop;
                return;
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                header.style.top = '-150px'; 
            } else {
                header.style.top = '1.5rem';
            }
            
            lastScrollTop = scrollTop;
        });
    }
 
});
