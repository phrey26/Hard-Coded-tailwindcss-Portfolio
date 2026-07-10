document.addEventListener('DOMContentLoaded', () => {
    
    // responsive mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
 
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Animate Terminal icon to X icon state for HUD
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.className = 'fa-solid fa-terminal transition-transform duration-300';
            } else {
                menuIcon.className = 'fa-solid fa-xmark transition-transform duration-300 text-white';
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
 
    //UI
    let audioCtx;
 
    // audio on first user interaction to bypass browser autoplay blocks
    document.body.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }, { once: true });
 
    function playHoverBlip() {
        if (!audioCtx || audioCtx.state === 'suspended') return;
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03); 
        
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); 
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.03);
    }
 
    // sound effect to all navigation items and buttons
    const navItems = document.querySelectorAll('.nav-item, .filter-btn');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', playHoverBlip);
    });

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
                header.style.top = '1.5rem'; // 1.5rem equals top-6
            }
            
            lastScrollTop = scrollTop;
        });
    }
 
});
