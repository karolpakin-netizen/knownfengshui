const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (menuButton && mobileMenu) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("hidden", isOpen);
    document.body.classList.toggle("overflow-hidden", !isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-faq-button]").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    panel?.classList.toggle("hidden", expanded);
    button.querySelector("[data-faq-icon]")?.classList.toggle("rotate-45", !expanded);
  });
});

// Lemon Squeezy 浮层成功后，定制咨询订单回到联系页提交房间照片。
document.querySelectorAll("[data-custom-review]").forEach((button) => {
  button.addEventListener("click", () => {
    try {
      window.sessionStorage.setItem("knownfengshui-custom-review", "1");
    } catch {
      // 隐私模式禁用 sessionStorage 时，仍允许 Lemon Squeezy 正常结账。
    }
  });
});

let lemonSetupAttempts = 0;
const setupLemonEvents = () => {
  if (window.LemonSqueezy?.Setup) {
    window.LemonSqueezy.Setup({
      eventHandler: (event) => {
        if (event?.event !== "Checkout.Success") return;
        let isCustomReview = false;
        try {
          isCustomReview = window.sessionStorage.getItem("knownfengshui-custom-review") === "1";
          if (isCustomReview) window.sessionStorage.removeItem("knownfengshui-custom-review");
        } catch {
          isCustomReview = false;
        }
        if (isCustomReview) window.location.href = "/contact.html?custom-review=1";
      },
    });
    return;
  }
  if (lemonSetupAttempts < 30) {
    lemonSetupAttempts += 1;
    window.setTimeout(setupLemonEvents, 100);
  }
};
setupLemonEvents();

const params = new URLSearchParams(window.location.search);
if (params.get("sent") === "1") {
  const status = document.querySelector("[data-contact-status]");
  if (status) {
    status.textContent = "Thanks for reaching out. Your message was sent, and we usually reply within 2–3 business days.";
    status.classList.remove("hidden");
  }
}
if (params.get("subscribed") === "1") {
  const status = document.querySelector("[data-subscribe-status]");
  if (status) {
    status.textContent = "You are subscribed. Your free home-space checklist will arrive by email shortly.";
    status.classList.remove("hidden");
  }
}
if (params.get("custom-review") === "1") {
  const status = document.querySelector("[data-custom-review-status]");
  if (status) {
    status.classList.remove("hidden");
    status.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}

document.querySelectorAll("[data-current-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});
