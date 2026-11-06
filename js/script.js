
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("show");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
    });
}

// Contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        let isValid = true;

        // Clear previous errors
        const errorFields = [
            "nameError",
            "emailError",
            "phoneError",
            "serviceError",
            "messageError"
        ];

        errorFields.forEach(function (id) {
            document.getElementById(id).textContent = "";
        });

        document.querySelectorAll(".input-error").forEach(function (field) {
            field.classList.remove("input-error");
            field.removeAttribute("aria-invalid");
        });

        const formStatus = document.getElementById("formStatus");
        formStatus.textContent = "";

        function showError(fieldId, errorId, message) {
            const field = document.getElementById(fieldId);
            field.classList.add("input-error");
            field.setAttribute("aria-invalid", "true");

            document.getElementById(errorId).textContent = message;
            isValid = false;
        }

        // Validate name
        if (name.length < 2) {
            showError("fullName", "nameError",
                "Please enter at least 2 characters.");
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showError("email", "emailError",
                "Please enter a valid email address.");
        }

        // Validate optional phone number
        const phonePattern = /^[0-9]{10}$/;

        if (phone !== "" && !phonePattern.test(phone)) {
            showError("phone", "phoneError",
                "Please enter a 10-digit phone number.");
        }

        // Validate service
        if (service === "") {
            showError("service", "serviceError",
                "Please select a service.");
        }

        // Validate message
        if (message.length < 10) {
            showError("message", "messageError",
                "Please enter at least 10 characters.");
        }

        // Display confirmation
        if (isValid) {
            formStatus.textContent =
                "Your form is valid. This is a demo, so no inquiry was sent.";

            contactForm.reset();
        }
    });
}
