(() => {
  "use strict";

  const typedPhrases = [
    "Software Engineer",
    "Java Backend Developer",
    "Problem Solver"
  ];

  const typedElement = document.getElementById("typed-text");
  const backToTopButton = document.getElementById("backToTop");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const sections = document.querySelectorAll("main section, header.hero");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  // Initialize AOS animations.
  AOS.init({
    once: false,
    duration: 850,
    easing: "ease-out-cubic",
    offset: 80
  });

  // Typing effect for hero subtitle.
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typedElement) return;

    const currentPhrase = typedPhrases[phraseIndex];
    typedElement.textContent = isDeleting
      ? currentPhrase.substring(0, charIndex--)
      : currentPhrase.substring(0, charIndex++);

    let typeSpeed = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
      isDeleting = true;
      typeSpeed = 1100;
    }

    if (isDeleting && charIndex === -1) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typedPhrases.length;
      typeSpeed = 250;
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();

  // Project filter logic.
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectItems.forEach((item) => {
        const categories = item.dataset.category;
        const shouldShow = filterValue === "all" || categories.includes(filterValue);
        item.classList.toggle("hide", !shouldShow);
      });

      AOS.refresh();
    });
  });

  // Back-to-top visibility and nav active state.
  function updateOnScroll() {
    const scrollPosition = window.scrollY + 140;

    if (window.scrollY > 350) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }

    sections.forEach((section) => {
      const id = section.getAttribute("id");
      if (!id) return;

      const offsetTop = section.offsetTop;
      const offsetHeight = section.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }

  window.addEventListener("scroll", updateOnScroll);
  updateOnScroll();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Collapse mobile nav menu after link click.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbarCollapse = document.querySelector("#navbarMenu");
      if (!navbarCollapse.classList.contains("show")) return;
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    });
  });

  async function submitContactForm(payload) {
    const endpoint = contactForm?.dataset.endpoint?.trim();
    if (!endpoint) {
      throw new Error("Contact form endpoint is not configured yet.");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to submit the contact form.");
    }

    return response.json();
  }

  // Contact form validation and UI feedback.
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fields = ["name", "email", "subject", "message"].map((id) => document.getElementById(id));
    const submitButton = contactForm.querySelector('button[type="submit"]');
    let isValid = true;

    fields.forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        field.classList.add("is-invalid");
        isValid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    const emailField = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.value.trim() && !emailRegex.test(emailField.value.trim())) {
      emailField.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      formStatus.textContent = "Please correct the highlighted fields.";
      formStatus.classList.remove("text-success");
      formStatus.classList.add("text-danger");
      return;
    }

    const payload = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("message").value.trim(),
      submittedAt: new Date().toISOString()
    };

    submitButton.disabled = true;
    formStatus.textContent = "Sending your message...";
    formStatus.classList.remove("text-danger", "text-success");
    formStatus.classList.add("text-secondary");

    try {
      await submitContactForm(payload);
      formStatus.textContent = "Message sent successfully.";
      formStatus.classList.remove("text-danger", "text-secondary");
      formStatus.classList.add("text-success");
      contactForm.reset();
      fields.forEach((field) => field.classList.remove("is-invalid"));
    } catch (error) {
      formStatus.textContent = error.message || "Unable to send your message right now.";
      formStatus.classList.remove("text-success", "text-secondary");
      formStatus.classList.add("text-danger");
    } finally {
      submitButton.disabled = false;
    }
  });
})();
