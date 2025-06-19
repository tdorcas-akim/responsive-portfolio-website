
    
        // Navigation functionality
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.getElementById('navbar');

        // Toggle mobile menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active nav link highlighting
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Project slider functionality
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.project-slide');
        const dots = document.querySelectorAll('.dot');
        const sliderContainer = document.getElementById('slider-container');

        function showSlide(index) {
            currentSlideIndex = index;
            const translateX = -index * 100;
            sliderContainer.style.transform = `translateX(${translateX}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            const nextIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function previousSlide() {
            const prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function currentSlide(index) {
            showSlide(index - 1);
        }

        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);

        // Form validation
        const contactForm = document.getElementById('contact-form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Clear previous errors
            const errorElements = document.querySelectorAll('.error');
            errorElements.forEach(error => error.textContent = '');
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            let isValid = true;
            
            // Validate name
            if (name.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters long';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Validate subject
            if (subject.length < 5) {
                document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters long';
                isValid = false;
            }
            
            // Validate message
            if (message.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters long';
                isValid = false;
            }
            
            if (isValid) {
                // Show success modal
                openModal('contact-success');
                contactForm.reset();
            }
        });

        // Modal functionality
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = document.querySelector('.close');

        function openModal(type) {
            let content = '';
            
            switch(type) {
                case 'project1':
                    content = `
                        <h2>Personal Portfolio Website</h2>
                        <p>This portfolio website showcases my growing skills in web development. Built entirely from scratch without any frameworks, it demonstrates my understanding of responsive design, CSS animations, and interactive JavaScript features.</p>
                        <h3>Key Features:</h3>
                        <ul>
                            <li>Fully responsive design that works on all devices</li>
                            <li>Interactive navigation with smooth scrolling</li>
                            <li>CSS animations and hover effects</li>
                            <li>JavaScript form validation</li>
                            <li>Image slider with navigation controls</li>
                            <li>Modal dialogs for enhanced user experience</li>
                        </ul>
                        <p>This project represents my commitment to learning web development best practices and creating engaging user experiences.</p>
                    `;
                    break;
                case 'project2':
                    content = `
                        <h2>Python Learning Scripts</h2>
                        <p>A comprehensive collection of Python scripts that demonstrate my progress in learning programming fundamentals and computer science concepts.</p>
                        <h3>What I've Built:</h3>
                        <ul>
                            <li>Data structure implementations (lists, dictionaries, sets)</li>
                            <li>Algorithm practice (sorting, searching)</li>
                            <li>Object-oriented programming examples</li>
                            <li>File handling and data processing scripts</li>
                            <li>Problem-solving exercises from coursework</li>
                        </ul>
                        <p>These scripts showcase my analytical thinking and problem-solving approach to programming challenges.</p>
                    `;
                    break;
                case 'project3':
                    content = `
                        <h2>Git Version Control Practice</h2>
                        <p>Hands-on experience with Git and GitHub, essential tools for modern software development and collaboration.</p>
                        <h3>Skills Developed:</h3>
                        <ul>
                            <li>Repository creation and management</li>
                            <li>Branching and merging strategies</li>
                            <li>Commit best practices and meaningful messages</li>
                            <li>Collaborative workflows with pull requests</li>
                            <li>Issue tracking and project management</li>
                        </ul>
                        <p>Understanding version control is crucial for any developer, and I've made it a priority to master these fundamental tools.</p>
                    `;
                    break;
                case 'contact-success':
                    content = `
                        <h2>Message Sent Successfully!</h2>
                        <p>Thank you for reaching out! I appreciate your interest and will get back to you as soon as possible.</p>
                        <p>In the meantime, feel free to connect with me on social media or check out my projects on GitHub.</p>
                    `;
                    break;
                default:
                    content = '<h2>Content not available</h2>';
            }
            
            modalBody.innerHTML = content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .contact-form');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add loading animation to form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        contactForm.addEventListener('submit', () => {
            if (contactForm.checkValidity()) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });

        // Add typing effect to hero subtitle
        const subtitle = document.querySelector('.hero .subtitle');
        const subtitleText = subtitle.textContent;
        subtitle.textContent = '';

        function typeText(element, text, delay = 50) {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, delay);
        }

        // Start typing effect after hero animation
        setTimeout(() => {
            typeText(subtitle, subtitleText, 30);
        }, 1500);

        // Add skill tag hover effects
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add scroll-to-top functionality
        const scrollToTop = document.createElement('button');
        scrollToTop.innerHTML = '↑';
        scrollToTop.className = 'scroll-to-top';
        scrollToTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        `;

        document.body.appendChild(scrollToTop);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTop.style.opacity = '1';
                scrollToTop.style.transform = 'scale(1)';
            } else {
                scrollToTop.style.opacity = '0';
                scrollToTop.style.transform = 'scale(0.8)';
            }
        });

        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Show first slide
            showSlide(0);
            
            // Add entrance animations with delay
            const elements = document.querySelectorAll('.skill-category, .timeline-content');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
   