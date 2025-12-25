// 1. Initialize AOS (Animation On Scroll)
AOS.init({
    duration: 1000, // Animation speed
    offset: 120,    // Offset from bottom
    once: true      // Animation happens only once
});

// 2. Typing Effect (Hero Section)
var typed = new Typed('.typed-text', {
    strings: ['Frontend Developer', 'Web Designer', 'Freelancer'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// 3. Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleBtn.querySelector('i');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

toggleBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// 4. Skills Progress Bar Animation (Trigger when scrolled into view)
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.getAttribute('data-width');
        progressBar.style.width = value;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
    });
}

// Simple Intersection Observer for Skills
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        } 
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// 5. Active Navbar Link Highlighter
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar-nav .nav-item .nav-link");

window.onscroll = () => {
    var current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.getAttribute("href").includes(current)) {
            li.classList.add("active");
        }
    });
};