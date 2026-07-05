// Core Javascript File - Rahul's Portfolio App

// 1. Pre-cached snapshot data for offline/fallback mode
const fallbackRepositories = [
    {
        name: "Rahul",
        html_url: "https://github.com/rahulmaithili/Rahul",
        description: "A development workspace showcasing clean coding practices, configurations, and general utility tools written in TypeScript.",
        language: "TypeScript",
        stargazers_count: 1,
        forks_count: 0,
        updated_at: "2026-06-25T10:30:00Z"
    },
    {
        name: "hrms-develop",
        html_url: "https://github.com/rahulmaithili/hrms-develop",
        description: "Development codebase for a comprehensive Human Resource Management System (HRMS). Built to manage employees, payroll, and corporate workflows.",
        language: "Python",
        stargazers_count: 2,
        forks_count: 1,
        updated_at: "2026-07-02T14:15:00Z"
    },
    {
        name: "auto-prompt-generator",
        html_url: "https://github.com/rahulmaithili/auto-prompt-generator",
        description: "An automated utility script designed to generate high-quality system and user prompts for large language models dynamically.",
        language: "JavaScript",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2026-05-18T08:45:00Z"
    },
    {
        name: "Gas-ERP",
        html_url: "https://github.com/rahulmaithili/Gas-ERP",
        description: "An enterprise resource planning (ERP) system tailored for gas distribution agencies. Handles bookings, delivery logs, inventory, and analytics.",
        language: "Python",
        stargazers_count: 3,
        forks_count: 1,
        updated_at: "2026-07-04T16:20:00Z"
    },
    {
        name: "Hp-Gas-Cashmemo-Tool",
        html_url: "https://github.com/rahulmaithili/Hp-Gas-Cashmemo-Tool",
        description: "A specialized billing and cashmemo utility application designed to automate invoice printing and cash management for HP gas distributors.",
        language: "JavaScript",
        stargazers_count: 1,
        forks_count: 0,
        updated_at: "2026-06-10T12:00:00Z"
    },
    {
        name: "rahulmaithili",
        html_url: "https://github.com/rahulmaithili/rahulmaithili",
        description: "Personal configuration and profile README repository representing my GitHub developer presence, focus areas, and skill sets.",
        language: "None",
        stargazers_count: 0,
        forks_count: 0,
        updated_at: "2026-07-05T11:10:00Z"
    }
];

// 2. Tech Stack data
const techStack = [
    { name: "Python", icon: "code" },
    { name: "TypeScript", icon: "code-2" },
    { name: "JavaScript", icon: "terminal" },
    { name: "Node.js", icon: "server" },
    { name: "Django", icon: "layers" },
    { name: "SQL & DBs", icon: "database" },
    { name: "Docker", icon: "package" },
    { name: "Git", icon: "git-branch" },
    { name: "GitHub", icon: "github" },
    { name: "REST APIs", icon: "webhook" },
    { name: "Automation", icon: "cpu" },
    { name: "System Design", icon: "git-fork" }
];

// 3. Experience Timeline data
const experienceData = [
    {
        date: "Jan 2025 - Present",
        role: "Full Stack Developer",
        company: "Independent Projects & Freelance",
        bullets: [
            "Architected and built Gas-ERP, a specialized business tool tracking bookings, inventory, and analytics for gas agencies.",
            "Created automation scripts in Python to streamline manual data updates and reporting workflows.",
            "Designed relational database tables, optimized query indices, and minimized database response latency."
        ]
    },
    {
        date: "June 2024 - Dec 2024",
        role: "Backend Developer trainee",
        company: "Self-driven & Systems Practice",
        bullets: [
            "Developed hrms-develop, an open-source Human Resource Management System framework modeled in Python.",
            "Constructed secure API gateways and connected custom endpoints using TypeScript and Node.js.",
            "Studied advanced system design methodologies including horizontal scaling, caching strategies, and load balancing."
        ]
    },
    {
        date: "Jan 2023 - May 2024",
        role: "Open Source contributor",
        company: "Developer Community",
        bullets: [
            "Created Hp-Gas-Cashmemo-Tool to automate cash receipt generations for local agencies.",
            "Built auto-prompt-generator, a utility that constructs optimized system prompts for language models.",
            "Resolved bugs in third-party libraries, documented APIs, and practiced clean, modular code writing."
        ]
    }
];

// 4. Certifications data
const certificatesData = [
    {
        name: "Advanced System Design & Microservices",
        issuer: "System Design Academy",
        date: "2025",
        icon: "git-fork",
        link: "https://github.com/rahulmaithili"
    },
    {
        name: "Python Backend & REST API Specialization",
        issuer: "Coursera",
        date: "2024",
        icon: "code",
        link: "https://github.com/rahulmaithili"
    },
    {
        name: "Enterprise Application Development (TypeScript)",
        issuer: "freeCodeCamp",
        date: "2024",
        icon: "code-2",
        link: "https://github.com/rahulmaithili"
    },
    {
        name: "Database Administration & Performance Tuning",
        issuer: "Udemy Certified",
        date: "2023",
        icon: "database",
        link: "https://github.com/rahulmaithili"
    }
];

// App State
let repositories = [];
let activeFilter = 'all';
let searchQuery = '';
let langChartInstance = null;

// Initialize Elements
document.addEventListener("DOMContentLoaded", () => {
    applySocialLinks();
    initTypingAnimation();
    initMobileNav();
    initScrollHighlight();
    renderTechCarousel();
    renderTimeline();
    renderCertificates();
    generateContributionGraph();
    fetchRepositories();
    setupFilters();
    setupContactForm();
});

// Apply custom social media links from localStorage
function applySocialLinks() {
    const defaultSocials = {
        github: "https://github.com/rahulmaithili",
        linkedin: "https://linkedin.com/in/rahulmaithili",
        twitter: "https://twitter.com/rahulmaithili",
        email: "rahulmaithili@gmail.com"
    };
    
    // Load links from localStorage or set defaults
    let socials = localStorage.getItem("portfolio_socials");
    if (!socials) {
        localStorage.setItem("portfolio_socials", JSON.stringify(defaultSocials));
        socials = defaultSocials;
    } else {
        socials = JSON.parse(socials);
    }

    // Update link elements
    document.querySelectorAll(".social-link-github").forEach(el => el.href = socials.github);
    document.querySelectorAll(".social-link-linkedin").forEach(el => el.href = socials.linkedin);
    document.querySelectorAll(".social-link-twitter").forEach(el => el.href = socials.twitter);
    document.querySelectorAll(".social-link-email").forEach(el => {
        if (el.tagName === 'A') el.href = `mailto:${socials.email}`;
    });

    // Update text content placeholders
    const ghText = document.getElementById("contact-github-text");
    if (ghText) ghText.textContent = socials.github.replace("https://github.com/", "github.com/").replace("https://", "");

    const liText = document.getElementById("contact-linkedin-text");
    if (liText) liText.textContent = socials.linkedin.replace("https://linkedin.com/in/", "linkedin.com/in/").replace("https://", "");

    const twText = document.getElementById("contact-twitter-text");
    if (twText) twText.textContent = socials.twitter.replace("https://twitter.com/", "@").replace("https://", "").replace("@", "");

    const emText = document.getElementById("contact-email-text");
    if (emText) emText.textContent = socials.email;
}


// Typing animation in Hero Section
function initTypingAnimation() {
    const typingTextEl = document.getElementById("typing-text");
    const roles = [
        "scalable backend systems",
        "ERP management tools",
        "workflow automations",
        "clean production code",
        "REST API integrations"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before starting next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Mobile Navigation Menu Toggle
function initMobileNav() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        
        // Update menu icon
        const icon = mobileToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.setAttribute("data-lucide", "x");
        } else {
            icon.setAttribute("data-lucide", "menu");
        }
        lucide.createIcons();
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = mobileToggle.querySelector("i");
            icon.setAttribute("data-lucide", "menu");
            lucide.createIcons();
        });
    });
}

// Highlight Nav Link on Scroll
function initScrollHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
}

// Render Tech Stack Carousel
function renderTechCarousel() {
    const track = document.getElementById("carousel-track");
    if (!track) return;
    
    // Duplicate array to enable loop animation
    const doubleStack = [...techStack, ...techStack];
    
    track.innerHTML = doubleStack.map(tech => `
        <div class="carousel-item">
            <i data-lucide="${tech.icon}"></i>
            <span>${tech.name}</span>
        </div>
    `).join("");
}

// Render Experience Timeline
function renderTimeline() {
    const container = document.getElementById("timeline-container");
    if (!container) return;
    
    container.innerHTML = experienceData.map(exp => `
        <div class="timeline-item">
            <div class="timeline-content glass-card">
                <span class="timeline-date">${exp.date}</span>
                <h3>${exp.role}</h3>
                <div class="timeline-company">${exp.company}</div>
                <ul class="timeline-bullets">
                    ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
                </ul>
            </div>
        </div>
    `).join("");
}

// Render Certificates
function renderCertificates() {
    const grid = document.getElementById("certificates-grid");
    if (!grid) return;
    
    grid.innerHTML = certificatesData.map(cert => `
        <div class="glass-card certificate-card">
            <div class="cert-header">
                <div class="cert-icon">
                    <i data-lucide="${cert.icon}"></i>
                </div>
                <span class="cert-date">${cert.date}</span>
            </div>
            <h4>${cert.name}</h4>
            <div class="cert-issuer">${cert.issuer}</div>
            <a href="${cert.link}" target="_blank" class="cert-link">
                <span>Verify Credential</span>
                <i data-lucide="external-link"></i>
            </a>
        </div>
    `).join("");
}

// GitHub Repos Fetching
async function fetchRepositories() {
    const spinner = document.getElementById("loading-spinner");
    const apiAlert = document.getElementById("api-alert");

    try {
        // Try fetching live data from GitHub API
        const response = await fetch("https://api.github.com/users/rahulmaithili/repos?sort=updated&per_page=30");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
            repositories = data.map(repo => ({
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description || "No description provided for this repository.",
                language: repo.language || "None",
                stargazers_count: repo.stargazers_count || 0,
                forks_count: repo.forks_count || 0,
                updated_at: repo.updated_at
            }));
        } else {
            throw new Error("Empty repos array returned");
        }
    } catch (error) {
        console.warn("GitHub API Fetch failed. Using fallback portfolio data: ", error);
        repositories = [...fallbackRepositories];
        apiAlert.classList.remove("hidden");
    } finally {
        spinner.classList.add("hidden");
        updateStats();
        renderRepositories();
        renderLanguageChart();
        lucide.createIcons(); // Trigger rendering of dynamically injected icons
    }
}

// Setup Repository Search and Filters
function setupFilters() {
    const searchInput = document.getElementById("repo-search");
    const filterBtns = document.querySelectorAll(".filter-btn");

    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderRepositories();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter");
            renderRepositories();
        });
    });
}

// Render Repositories Cards
function renderRepositories() {
    const grid = document.getElementById("projects-grid");
    grid.innerHTML = "";

    const filtered = repositories.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery) || 
                              repo.description.toLowerCase().includes(searchQuery);
        
        const matchesFilter = activeFilter === 'all' || 
                              (repo.language && repo.language.toLowerCase() === activeFilter.toLowerCase());

        return matchesSearch && matchesFilter;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="glass-card" style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-secondary);">
                <i data-lucide="folder-open" style="width: 48px; height: 48px; margin-bottom: 12px; stroke-width: 1.5;"></i>
                <p>No repositories match your current filter or search query.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    filtered.forEach(repo => {
        const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const card = document.createElement("div");
        card.className = `glass-card project-card lang-${repo.language}`;
        card.innerHTML = `
            <div class="project-header">
                <a href="${repo.html_url}" target="_blank" class="project-badge-link">
                    <h4>${repo.name}</h4>
                </a>
                <span class="project-lang-badge ${repo.language || 'None'}">${repo.language || 'None'}</span>
            </div>
            <p class="project-desc">${repo.description}</p>
            <div class="project-footer">
                <div class="project-stats">
                    <div class="stat-item" title="Stars">
                        <i data-lucide="star"></i>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    <div class="stat-item" title="Forks">
                        <i data-lucide="git-fork"></i>
                        <span>${repo.forks_count}</span>
                    </div>
                </div>
                <a href="${repo.html_url}" target="_blank" class="project-link">
                    <span>Code</span>
                    <i data-lucide="external-link"></i>
                </a>
            </div>
        `;
        grid.appendChild(card);
    });

    lucide.createIcons();
}

// Update Overview Highlights Stats
function updateStats() {
    const totalReposEl = document.getElementById("stat-total-repos");
    const totalStarsEl = document.getElementById("stat-total-stars");
    const totalForksEl = document.getElementById("stat-total-forks");

    const totalRepos = repositories.length;
    const totalStars = repositories.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, r) => sum + r.forks_count, 0);

    totalReposEl.textContent = totalRepos;
    totalStarsEl.textContent = totalStars;
    totalForksEl.textContent = totalForks;
}

// Render Language Distribution Chart (Chart.js)
function renderLanguageChart() {
    const ctx = document.getElementById("language-chart").getContext("2d");
    
    // Calculate language frequencies
    const languageCounts = {};
    repositories.forEach(repo => {
        const lang = repo.language || "None";
        if (lang !== "None") {
            languageCounts[lang] = (languageCounts[lang] || 0) + 1;
        }
    });

    const labels = Object.keys(languageCounts);
    const data = Object.values(languageCounts);

    const backgroundColors = labels.map(lang => {
        switch(lang.toLowerCase()) {
            case 'typescript': return '#3178c6';
            case 'python': return '#3572a5';
            case 'javascript': return '#f1e05a';
            case 'html': return '#e34c26';
            case 'css': return '#563d7c';
            default: return '#64748b';
        }
    });

    if (langChartInstance) {
        langChartInstance.destroy();
    }

    if (labels.length === 0) {
        labels.push("No Languages Found");
        data.push(1);
        backgroundColors.push("#1e293b");
    }

    langChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.08)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: {
                            family: 'Outfit',
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return ` ${context.label}: ${value} repos (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Generate contribution heat map
function generateContributionGraph() {
    const grid = document.getElementById("activity-grid");
    grid.innerHTML = "";
    
    const totalBlocks = 53 * 7;
    
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.className = "activity-day";
        
        const rand = Math.random();
        let level = 0;
        
        if (rand > 0.85) {
            level = Math.floor(Math.random() * 4) + 1;
        } else if (rand > 0.65) {
            level = 1;
        }
        
        if (i % 7 === 2 || i % 7 === 3) {
            if (Math.random() > 0.4) level = Math.max(level, Math.floor(Math.random() * 2) + 1);
        }
        
        block.classList.add(`lvl-${level}`);
        
        const dateOffset = totalBlocks - i;
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - dateOffset);
        const dateString = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        const commits = level === 0 ? "No contributions" : `${level * 2 - Math.floor(Math.random() * 2)} contributions`;
        
        block.title = `${commits} on ${dateString}`;
        
        grid.appendChild(block);
    }
}

// Seed sample messages if localStorage is empty
function seedMessages() {
    const existing = localStorage.getItem("portfolio_messages");
    if (!existing) {
        const mockMessages = [
            {
                id: 1,
                name: "John Doe",
                email: "john@example.com",
                subject: "Project Collaboration",
                message: "Let's build something scalable...",
                date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
                read: false
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane@company.com",
                subject: "Gas-ERP Query",
                message: "Hi Rahul, I saw your Gas-ERP repo. We would love to collaborate on deploying this for a local distributor in our region. Let's discuss!",
                date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
                read: true
            }
        ];
        localStorage.setItem("portfolio_messages", JSON.stringify(mockMessages));
    }
}

// Contact Form submission handler
function setupContactForm() {
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");
    
    if (!form) return;

    // Seed mock data initially
    seedMessages();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameVal = document.getElementById("name").value.trim();
        const emailVal = document.getElementById("email").value.trim();
        const subjectVal = document.getElementById("subject").value.trim();
        const messageVal = document.getElementById("message").value.trim();

        const submitBtn = form.querySelector(".btn-submit");
        const submitText = submitBtn.querySelector("span");
        const submitIcon = submitBtn.querySelector("i, svg");
        
        submitBtn.style.opacity = "0.7";
        submitBtn.style.pointerEvents = "none";
        submitText.textContent = "Sending Message...";
        
        if (submitIcon) {
            submitIcon.setAttribute("data-lucide", "loader-2");
            submitIcon.classList.add("spinner");
        }
        lucide.createIcons();

        // Capture message to localStorage
        const newMessage = {
            id: Date.now(),
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal,
            date: new Date().toISOString(),
            read: false
        };

        const existingMessages = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
        existingMessages.push(newMessage);
        localStorage.setItem("portfolio_messages", JSON.stringify(existingMessages));

        setTimeout(() => {
            form.classList.add("hidden");
            feedback.classList.remove("hidden");
        }, 1500);
    });
}

