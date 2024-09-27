        document.addEventListener('DOMContentLoaded', () => {
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Typing effect
            const typed = new Typed('#typed-text', {
                strings: ['Mujtaba H.', 'a WP Developer', 'a Web Designer'],
                typeSpeed: 50,
                backSpeed: 50,
                loop: true
            });

            // Skill progress animation
            const skillProgress = document.querySelectorAll('.skill-progress');
            const animateSkills = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = entry.target.getAttribute('data-progress');
                        const percentElement = entry.target.querySelector('.skill-percent');
                        let currentPercent = 0;

                        const interval = setInterval(() => {
                            if (currentPercent >= progress) {
                                clearInterval(interval);
                            } else {
                                currentPercent++;
                                percentElement.textContent = `${currentPercent}%`;
                                entry.target.style.background = `conic-gradient(var(--secondary-color) ${currentPercent * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
                            }
                        }, 20);

                        observer.unobserve(entry.target);
                    }
                });
            };

            const skillObserver = new IntersectionObserver(animateSkills, { threshold: 0.5 });
            skillProgress.forEach(skill => skillObserver.observe(skill));

            // Portfolio filtering
            const filterButtons = document.querySelectorAll('.filter-button');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Form validation
            const contactForm = document.getElementById('contact-form');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                let isValid = true;

                if (name.value.trim() === '') {
                    isValid = false;
                    name.style.borderColor = 'red';
                } else {
                    name.style.borderColor = '';
                }

                if (email.value.trim() === '' || !isValidEmail(email.value)) {
                    isValid = false;
                    email.style.borderColor = 'red';
                } else {
                    email.style.borderColor = '';
                }

                if (message.value.trim() === '') {
                    isValid = false;
                    message.style.borderColor = 'red';
                } else {
                    message.style.borderColor = '';
                }

                if (isValid) {
                    // Here you would typically send the form data to a server
                    alert('Form submitted successfully!');
                    contactForm.reset();
                }
            });

            function isValidEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            // Back to top button
            const backToTopButton = document.getElementById('back-to-top');

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Header scroll effect
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        });

        const portfolioData = [
            {
                category: 'wordpress',
                image: '/Images/Screenshot (34).png',
                title: 'NFT Website',
                description: 'WordPress Website',
                link: '#'
            },
            {
                category: 'ecommerce',
                image: '/placeholder.svg?height=300&width=400',
                title: 'Project 2',
                description: 'E-Commerce Website',
                link: '#'
            },
            {
                category: '',
                image: '/placeholder.svg?height=300&width=400',
                title: 'Project 3',
                description: 'Web Design',
                link: '#'
            }
        ];
        
        // Render Portfolio Items Dynamically
        const portfolioGrid = document.getElementById('portfolio-grid');
        const noProjectMessage = document.getElementById('no-project-message');
        
        function renderPortfolioItems(data) {
            portfolioGrid.innerHTML = data.map(item => `
                <div class="portfolio-item" data-category="${item.category}">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="portfolio-link">View Project</a>
                    </div>
                </div>
            `).join('');
        }
        
        // Initial Render
        renderPortfolioItems(portfolioData);
        
        // Portfolio Filtering with "No Project Found" Message
        const filterButtons = document.querySelectorAll('.filter-button');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Set active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
        
                // Filter portfolio items
                let visibleItems = 0;
                document.querySelectorAll('.portfolio-item').forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        visibleItems++;
                    } else {
                        item.style.display = 'none';
                    }
                });
        
                // Show or hide "No Project Found" message
                if (visibleItems === 0) {
                    noProjectMessage.style.display = 'block';
                } else {
                    noProjectMessage.style.display = 'none';
                }
            });
        });




        // JavaScript for Hamburger Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open'); // Toggle the "open" class
    menuToggle.classList.toggle('active'); // Optionally toggle the active class for styling
});
