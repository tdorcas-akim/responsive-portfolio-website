       // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Modal functionality
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        const closeBtn = document.querySelector('.close');

        const projectDetails = {
            project1: {
                title: 'Personal Portfolio',
                description: 'This responsive portfolio website was built from scratch using pure HTML, CSS, and JavaScript. It features a mobile-first design approach, smooth animations, and interactive elements like modals and form validation.',
                features: ['Fully responsive design', 'Smooth scrolling navigation', 'Form validation', 'Modal windows', 'CSS animations', 'Cross-browser compatibility'],
                challenges: 'The main challenge was creating a responsive design without using any CSS frameworks, which required careful planning of media queries and flexible layouts.',
                learned: 'This project helped me understand the fundamentals of responsive web design and the importance of semantic HTML structure.'
            },
            project2: {
                title: 'Simple Calculator',
                description: 'A functional web-based calculator that performs basic arithmetic operations. Features a clean, intuitive interface with keyboard support for enhanced user experience.',
                features: ['Basic arithmetic operations', 'Keyboard input support', 'Clear and delete functions', 'Responsive button layout', 'Error handling'],
                challenges: 'Handling edge cases like division by zero and maintaining accurate floating-point calculations required careful consideration.',
                learned: 'This project taught me about event handling, DOM manipulation, and the importance of user input validation.'
            },
            project3: {
                title: 'Python Learning Scripts',
                description: 'A collection of Python scripts created during my learning journey, covering topics from basic syntax to more complex algorithms and data structures.',
                features: ['File I/O operations', 'Data structure implementations', 'Algorithm practice', 'Code documentation', 'Version control with Git'],
                challenges: 'Understanding object-oriented programming concepts and implementing efficient algorithms were the main learning curves.',
                learned: 'These projects solidified my understanding of programming fundamentals and best practices in code organization.'
            }
        };

        function openModal(projectId) {
            const project = projectDetails[projectId];
            modalContent.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <h3>Key Features:</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h3>Challenges:</h3>
                <p>${project.challenges}</p>
                <h3>What I Learned:</h3>
                <p>${project.learned}</p>
            `;
            modal.classList.add('show');
        }

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });

        // Form validation
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(error => error.textContent = '');
            
            // Name validation
            if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters long';
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            // Message validation
            if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });

        // Add input event listeners for real-time validation
        document.getElementById('name').addEventListener('input', function() {
            const nameError = document.getElementById('nameError');
            if (this.value.trim().length >= 2) {
                nameError.textContent = '';
            }
        });

        document.getElementById('email').addEventListener('input', function() {
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value.trim())) {
                emailError.textContent = '';
            }
        });

        document.getElementById('message').addEventListener('input', function() {
            const messageError = document.getElementById('messageError');
            if (this.value.trim().length >= 10) {
                messageError.textContent = '';
            }
        });

        // Skill tags hover effect
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero h1');
            const originalText = heroTitle.textContent;
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 100);
            }, 500);
        });

        // Add scroll progress indicator
        const createScrollIndicator = () => {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                z-index: 9999;
                transition: width 0.3s ease;
            `;
            document.body.appendChild(scrollIndicator);

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                scrollIndicator.style.width = scrollPercent + '%';
            });
        };

        createScrollIndicator();