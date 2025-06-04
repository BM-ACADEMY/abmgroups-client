// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}

// Smooth scroll for nav links
document.querySelectorAll('header a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        if (navLinks) {
            navLinks.classList.remove("active");
        }
        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.getElementById("header").offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    });
});

// Update Copyright Year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Form submission with POST API
const contactForm = document.querySelector(".contact-form");
const formMessage = document.getElementById("form-message");
const toastMessage = document.getElementById("toast-message");
const submitButton = document.querySelector(".btn-gold");

if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Client-side validation
        if (!name || !email || !message) {
            formMessage.style.display = "block";
            formMessage.style.color = "#FFD700";
            formMessage.textContent = "Please fill out all fields.";
            setTimeout(() => (formMessage.style.display = "none"), 5000);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.style.display = "block";
            formMessage.style.color = "#FFD700";
            formMessage.textContent = "Please enter a valid email address.";
            setTimeout(() => (formMessage.style.display = "none"), 5000);
            return;
        }

        const formData = {
            name: name,
            email: email,
            description: message,
        };

        // Show loading state
        submitButton.textContent = "Loading...";
        submitButton.disabled = true;

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success toast
            toastMessage.textContent = "Thank you for your message! We will get back to you soon.";
            toastMessage.style.display = "block";
            contactForm.reset();
            
            // Hide toast after 5 seconds
            setTimeout(() => {
                toastMessage.classList.add("hide");
                setTimeout(() => {
                    toastMessage.style.display = "none";
                    toastMessage.classList.remove("hide");
                }, 500);
            }, 5000);
        } catch (error) {
            console.error("Error:", error);
            formMessage.style.display = "block";
            formMessage.style.color = "#FFD700";
            formMessage.textContent = "There was an error sending your message. Please try again later.";
            setTimeout(() => (formMessage.style.display = "none"), 5000);
        } finally {
            // Revert button text and enable it
            submitButton.textContent = "Send Message";
            submitButton.disabled = false;
        }
    });
}