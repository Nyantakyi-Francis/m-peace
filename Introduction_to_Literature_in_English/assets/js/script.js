// assets/js/script.js

// Smooth scrolling for any anchor links (future-proof)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current page in navigation
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.fontWeight = 'bold';
            link.style.color = '#10b981';
        }
    });
}

// Make module sections more interactive - add fade-in effect on scroll
function addScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Keyboard navigation for Previous/Next buttons
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const prevButton = document.querySelector('.nav-buttons button:first-child');
        const nextButton = document.querySelector('.nav-buttons button:last-child');
        
        if (e.key === 'ArrowLeft' && prevButton) {
            prevButton.click();
        }
        if (e.key === 'ArrowRight' && nextButton) {
            nextButton.click();
        }
    });
}

function initYouTubeEmbeds() {
    const embeds = document.querySelectorAll('.youtube-embed[data-youtube-id]');
    if (embeds.length === 0) return;

    embeds.forEach(embed => {
        const videoId = embed.getAttribute('data-youtube-id');
        const start = embed.getAttribute('data-start') || '0';
        const title = embed.getAttribute('data-title') || 'YouTube video';

        embed.style.backgroundImage = `url(https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg)`;

        const load = () => {
            const params = new URLSearchParams({
                autoplay: '1',
                start: String(start),
                rel: '0',
                modestbranding: '1'
            });

            if (window.location.hostname) {
                params.set('origin', window.location.origin);
            }

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
            iframe.title = title;
            iframe.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = '0';

            embed.replaceChildren(iframe);
            embed.classList.add('youtube-embed--loaded');
        };

        const playButton = embed.querySelector('.youtube-embed__play');
        if (playButton) {
            playButton.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                load();
            });
        }

        embed.addEventListener('click', () => load(), { once: true });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    addScrollAnimations();
    addKeyboardNavigation();
    initYouTubeEmbeds();
    
    // Optional: Add a "Back to Top" button on module pages
    if (document.querySelector('.module-container')) {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑ Top';
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '30px';
        backToTop.style.right = '30px';
        backToTop.style.padding = '10px 16px';
        backToTop.style.background = '#10b981';
        backToTop.style.color = 'white';
        backToTop.style.border = 'none';
        backToTop.style.borderRadius = '50px';
        backToTop.style.cursor = 'pointer';
        backToTop.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        backToTop.style.display = 'none';
        backToTop.style.zIndex = '1000';
        
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    console.log('✅ Teaching Listening & Speaking Platform JS loaded successfully!');
});
