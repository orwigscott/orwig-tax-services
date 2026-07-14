document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitBtn = contactForm.querySelector(".btn-submit");
  submitBtn.disabled = true;
  formStatus.textContent = "Sending...";
  formStatus.className = "form-status";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      contactForm.reset();
      formStatus.textContent = "Thanks — your message has been sent. We'll be in touch soon.";
      formStatus.className = "form-status success";
    } else {
      throw new Error("Formspree returned " + response.status);
    }
  } catch (err) {
    formStatus.textContent =
      "Sorry, something went wrong. Please email scott@orwigtaxservices.com instead.";
    formStatus.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
  }
});
