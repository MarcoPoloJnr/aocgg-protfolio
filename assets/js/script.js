
'use strict';

/* =========================================
   1. ELEMENT TOGGLE FUNCTION
========================================= */

const elementToggleFunc = function (elem) {
  if (elem) {
    elem.classList.toggle("active");
  }
};


/* =========================================
   2. SIDEBAR TOGGLE
========================================= */

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}


/* =========================================
   3. TESTIMONIALS MODAL
========================================= */

const testimonialsItem = document.querySelectorAll(
  "[data-testimonials-item]"
);

const modalContainer = document.querySelector(
  "[data-modal-container]"
);

const modalCloseBtn = document.querySelector(
  "[data-modal-close-btn]"
);

const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

testimonialsItem.forEach(function (item) {
  item.addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }

    if (modalTitle && title) {
      modalTitle.textContent = title.textContent;
    }

    if (modalText && text) {
      modalText.innerHTML = text.innerHTML;
    }

    testimonialsModalFunc();
  });
});

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}

if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}


/* =========================================
   4. PORTFOLIO FILTERS
========================================= */

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

const filterFunc = function (selectedValue) {
  filterItems.forEach(function (item) {
    const category = item.dataset.category;

    if (
      selectedValue === "all" ||
      selectedValue === category
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Mobile category dropdown
selectItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const selectedValue = (this.dataset.filter || this.innerText).trim().toLowerCase();

    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

    if (select) {
      elementToggleFunc(select);
    }

    filterFunc(selectedValue);
  });
});

// Desktop category buttons
filterBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedValue = (this.dataset.filter || this.innerText).trim().toLowerCase();

    if (selectValue) {
      selectValue.innerText = this.innerText;
    }

    filterFunc(selectedValue);

    filterBtn.forEach(function (btn) {
      btn.classList.remove("active");
    });

    this.classList.add("active");
  });
});


/* =========================================
   5. CONTACT FORM VALIDATION
========================================= */

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  function validateContactForm() {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  }

  formInputs.forEach(function (input) {
    input.addEventListener("input", validateContactForm);
  });
}


/* =========================================
   6. PAGE NAVIGATION
========================================= */

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const targetPage = (this.dataset.navLink || this.innerText).trim().toLowerCase();

    pages.forEach(function (page) {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
    });

    this.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});


/* =========================================
   7. PORTFOLIO AND BLOG IMAGE POPUP
========================================= */

(function () {
  const popup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popupImage");

  // Check that the popup HTML exists
  if (!popup || !popupImage) {
    console.warn(
      "Image popup not found. Check the imagePopup HTML in your page."
    );
    return;
  }

  const closeButton = popup.querySelector(".close-popup");

  // Open the selected image
  function openImage(image) {
    popupImage.src = image.currentSrc || image.src;
    popupImage.alt = image.alt || "Enlarged image";

    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    if (closeButton) {
      closeButton.focus();
    }
  }

  // Close the popup
  function closeImage() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");

    popupImage.removeAttribute("src");

    document.body.style.overflow = "";
  }

  // Resolve clicked portfolio/blog media to its image
  function getClickedImage(event) {
    const portfolioCard = event.target.closest(".portfolio .project-img");
    if (portfolioCard) {
      return portfolioCard.querySelector("img");
    }

    const blogBanner = event.target.closest(".blog .blog-banner-box");
    if (blogBanner) {
      return blogBanner.querySelector("img");
    }

    return event.target.closest(
      ".portfolio .project-img img, .blog .blog-banner-box img"
    );
  }

  // Handle image clicks and popup closing
  document.addEventListener("click", function (event) {
    // Open when a Portfolio or Blog image area is clicked
    const image = getClickedImage(event);

    if (image) {
      event.preventDefault();
      openImage(image);
      return;
    }

    // Close when clicking the X button
    if (event.target.closest(".close-popup")) {
      closeImage();
      return;
    }

    // Close when clicking outside the enlarged image
    if (event.target === popup) {
      closeImage();
    }
  });

  // Close with the Escape key
  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      popup.classList.contains("is-open")
    ) {
      closeImage();
    }
  });
})();



/* =========================================
   8. LANGUAGE SWITCHER (EN / FR)
========================================= */

const translations = {
  en: {
    "nav.about": "About",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "theme.light": "Light mode",
    "theme.dark": "Dark mode",
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "sidebar.role": "Web developer",
    "sidebar.showContacts": "Show Contacts",
    "sidebar.email": "Email",
    "sidebar.phone": "Phone",
    "sidebar.birthday": "Birthday",
    "sidebar.birthdayDate": "September 23",
    "sidebar.location": "Location",
    "about.title": "About me",
    "about.p1": "Hi, I'm Andrews Opoku-Antwi, a passionate and creative web developer who enjoys turning ideas into modern, functional, and user-friendly digital experiences. I specialize in building websites that help individuals and businesses establish a strong online presence. From business and portfolio websites to hotel, restaurant, and tourism websites, I focus on creating designs that look professional, work smoothly, and provide a great experience across all devices.",
    "about.p2": "I'm continuously learning and improving my skills in web development, exploring new technologies, and finding innovative ways to solve problems through technology. My goal is to help businesses grow, bring ideas to life, and create digital solutions that make a difference.",
    "about.doing": "What i'm doing",
    "about.testimonials": "Testimonials",
    "about.clients": "Clients",
    "service.webDesign": "Web design",
    "service.webDesignText": "The most modern and high-quality design made at a professional level.",
    "service.webDev": "Web development",
    "service.webDevText": "High-quality development of sites at the professional level.",
    "service.mobile": "Mobile apps",
    "service.mobileText": "Professional development of applications for iOS and Android.",
    "service.photo": "Photography",
    "service.photoText": "I make high-quality photos of any category at a professional level.",
    "resume.title": "Resume",
    "resume.education": "Education",
    "resume.experience": "Experience",
    "resume.skills": "My skills",
    "portfolio.title": "Portfolio",
    "filter.all": "All",
    "filter.webDesign": "Web design",
    "filter.applications": "Applications",
    "filter.webDev": "Web development",
    "filter.select": "Select category",
    "blog.title": "Blog",
    "contact.title": "Contact",
    "contact.formTitle": "Contact Form",
    "contact.firstName": "First name",
    "contact.email": "Email address",
    "contact.message": "Your message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Unable to send your message. Please try again."
  },
  fr: {
    "nav.about": "À propos",
    "nav.resume": "CV",
    "nav.portfolio": "Portfolio",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "theme.light": "Mode clair",
    "theme.dark": "Mode sombre",
    "theme.toLight": "Passer au thème clair",
    "theme.toDark": "Passer au thème sombre",
    "sidebar.role": "Développeur web",
    "sidebar.showContacts": "Afficher les contacts",
    "sidebar.email": "E-mail",
    "sidebar.phone": "Téléphone",
    "sidebar.birthday": "Anniversaire",
    "sidebar.birthdayDate": "23 septembre",
    "sidebar.location": "Localisation",
    "about.title": "À propos de moi",
    "about.p1": "Bonjour, je suis Andrews Opoku-Antwi, un développeur web passionné et créatif qui aime transformer des idées en expériences numériques modernes, fonctionnelles et intuitives. Je me spécialise dans la création de sites web qui aident les particuliers et les entreprises à renforcer leur présence en ligne. Des sites d'entreprise et de portfolio aux sites d'hôtels, de restaurants et de tourisme, je crée des designs professionnels, fluides et adaptés à tous les appareils.",
    "about.p2": "J'apprends et j'améliore continuellement mes compétences en développement web, j'explore de nouvelles technologies et je trouve des solutions innovantes grâce à la technologie. Mon objectif est d'aider les entreprises à grandir, à concrétiser leurs idées et à créer des solutions numériques qui font la différence.",
    "about.doing": "Ce que je fais",
    "about.testimonials": "Témoignages",
    "about.clients": "Clients",
    "service.webDesign": "Design web",
    "service.webDesignText": "Un design moderne et de haute qualité réalisé à un niveau professionnel.",
    "service.webDev": "Développement web",
    "service.webDevText": "Développement de sites de haute qualité au niveau professionnel.",
    "service.mobile": "Applications mobiles",
    "service.mobileText": "Développement professionnel d'applications pour iOS et Android.",
    "service.photo": "Photographie",
    "service.photoText": "Je réalise des photos de haute qualité dans toutes les catégories, au niveau professionnel.",
    "resume.title": "CV",
    "resume.education": "Formation",
    "resume.experience": "Expérience",
    "resume.skills": "Mes compétences",
    "portfolio.title": "Portfolio",
    "filter.all": "Tout",
    "filter.webDesign": "Design web",
    "filter.applications": "Applications",
    "filter.webDev": "Développement web",
    "filter.select": "Choisir une catégorie",
    "blog.title": "Blog",
    "contact.title": "Contact",
    "contact.formTitle": "Formulaire de contact",
    "contact.firstName": "Prénom",
    "contact.email": "Adresse e-mail",
    "contact.message": "Votre message",
    "contact.send": "Envoyer",
    "contact.sending": "Envoi...",
    "contact.success": "Message envoyé avec succès !",
    "contact.error": "Impossible d'envoyer votre message. Veuillez réessayer."
  }
};

let currentLang = "en";

function t(key) {
  const table = translations[currentLang] || translations.en;
  return table[key] || translations.en[key] || key;
}

function applyTranslations(lang) {
  currentLang = translations[lang] ? lang : "en";
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    const key = el.getAttribute("data-i18n");
    const value = t(key);
    if (!value) return;

    // Theme label key is swapped dynamically in applyTheme
    if (el.id === "themeLabel") return;

    el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    const key = el.getAttribute("data-i18n-placeholder");
    const value = t(key);
    if (value) el.setAttribute("placeholder", value);
  });

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  // Keep theme label in sync with current language
  const isLight = document.documentElement.classList.contains("light-theme");
  const themeLabel = document.getElementById("themeLabel");
  const themeToggle = document.getElementById("themeToggle");
  if (themeLabel) {
    themeLabel.textContent = isLight ? t("theme.dark") : t("theme.light");
  }
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isLight ? t("theme.toDark") : t("theme.toLight")
    );
  }
}

(function initLanguage() {
  let savedLang = null;

  try {
    savedLang = localStorage.getItem("portfolio-lang");
  } catch (error) {
    // Continue without saved preference
  }

  applyTranslations(savedLang === "fr" ? "fr" : "en");

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const nextLang = this.dataset.lang || "en";
      applyTranslations(nextLang);

      try {
        localStorage.setItem("portfolio-lang", nextLang);
      } catch (error) {
        // Language still works for the current session
      }
    });
  });
})();


/* =========================================
   9. LIGHT AND DARK THEME TOGGLE
========================================= */

(function () {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");

  if (!themeToggle) return;

  // Restore the previously selected theme
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    // Continue without saved preferences if storage is unavailable
  }

  function applyTheme(theme) {
    const isLight = theme === "light";

    document.documentElement.classList.toggle("light-theme", isLight);
    document.body.classList.toggle("light-theme", isLight);

    if (themeIcon) {
      themeIcon.setAttribute(
        "name",
        isLight ? "moon-outline" : "sunny-outline"
      );
    }

    if (themeLabel) {
      themeLabel.textContent = isLight ? t("theme.dark") : t("theme.light");
    }

    themeToggle.setAttribute(
      "aria-label",
      isLight ? t("theme.toDark") : t("theme.toLight")
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(isLight)
    );
  }

  // Use the saved theme, or default to dark mode
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeToggle.addEventListener("click", function () {
    const isCurrentlyLight =
      document.documentElement.classList.contains("light-theme");

    const nextTheme = isCurrentlyLight ? "dark" : "light";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      // Theme still works for the current page session
    }
  });
})();


    try {
      if (localStorage.getItem("portfolio-theme") === "light") {
        document.documentElement.classList.add("light-theme");
      }
    } catch (e) {}

    
document.addEventListener("DOMContentLoaded", function () {

  // 1. Add your EmailJS Public Key
  emailjs.init({
    publicKey: "PGGuTZArMIoLwShnC"
  });

  const form = document.getElementById("contact-form");
  const button = document.getElementById("submit-btn");
  const buttonText = document.getElementById("submit-text");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    button.disabled = true;
    buttonText.textContent = t("contact.sending");
    status.textContent = "";

    try {
      // 2. Add your Service ID
      // 3. Add your Template ID
      await emailjs.sendForm(
        "service_lgb9789",
        "template_yps1d1g",
        form
      );

      status.textContent = t("contact.success");
      form.reset();

    } catch (error) {
      console.error("EmailJS error:", error);
      status.textContent = t("contact.error");

    } finally {
      button.disabled = false;
      buttonText.textContent = t("contact.send");
    }
  });

});
