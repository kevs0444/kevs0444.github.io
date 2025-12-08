document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Theme Toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        const profilePic = document.getElementById('profile-pic');

        if (theme === 'dark-mode') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            if (profilePic) profilePic.src = 'assets/images/dark-mode-profile-pic.jpg';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            if (profilePic) profilePic.src = 'assets/images/light-mode-profile-pic.jpg';
        }
    }

    // Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-headings, .intro, .project-card, .about-content, .contact-form').forEach(el => {
        el.classList.add('hidden-animate');
        observer.observe(el);
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent modal opening if clicking on specific buttons
            if (e.target.closest('.github-btn') || e.target.closest('.tiktok-btn')) {
                return;
            }

            const img = card.querySelector('img').src;
            const title = card.querySelector('h3').innerText;
            const role = card.querySelector('.project-role').innerText;
            const date = card.querySelector('.project-date').innerText;
            const desc = card.querySelector('p').innerText;

            // Get links
            const githubLink = card.querySelector('.github-btn') ? card.querySelector('.github-btn').href : '#';
            const tiktokId = card.getAttribute('data-tiktok-id');

            // Populate Modal
            document.getElementById('modal-image').src = img;
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-role').innerText = role;
            document.getElementById('modal-date').innerText = date;
            document.getElementById('modal-description').innerText = desc;
            document.getElementById('modal-github').href = githubLink;

            // Handle TikTok Embed in Modal
            const tiktokContainer = document.getElementById('modal-tiktok-container');
            tiktokContainer.innerHTML = ''; // Clear previous video

            if (tiktokId) {
                const blockquote = document.createElement('blockquote');
                blockquote.className = 'tiktok-embed';
                blockquote.setAttribute('cite', `https://www.tiktok.com/@kevscode.tech/video/${tiktokId}`);
                blockquote.setAttribute('data-video-id', tiktokId);
                blockquote.style.maxWidth = '605px';
                blockquote.style.minWidth = '325px';

                blockquote.innerHTML = `<section> <a target="_blank" title="@kevscode.tech" href="https://www.tiktok.com/@kevscode.tech?refer=embed">@kevscode.tech</a> </section>`;

                tiktokContainer.appendChild(blockquote);

                // Re-load TikTok script to render the new embed
                const script = document.createElement('script');
                script.src = 'https://www.tiktok.com/embed.js';
                script.async = true;
                tiktokContainer.appendChild(script);
            }

            // Show Modal
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('modal-tiktok-container').innerHTML = ''; // Stop video
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.getElementById('modal-tiktok-container').innerHTML = ''; // Stop video
            }, 300);
        }
    });

    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:markevinalcantara40@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
