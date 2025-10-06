let hasInitialized = false;

function initStickyHeader() {
  if (hasInitialized) {
    return;
  }
  hasInitialized = true;

  const stickyHeader = document.getElementById("sticky-header");
  const logoContainer = document.getElementById("logo-container");
  const mainCta = document.getElementById("main-cta");
  if (!stickyHeader || !logoContainer) {
    return;
  }

  const originalLogoParent = logoContainer.parentElement;
  const darkSections = document.querySelectorAll(".dark-section");
  const deviceMockup = document.querySelector(".device-mockup");
  const deviceVideo = document.querySelector(".device-mockup-video");
  const leftContainer = stickyHeader.querySelector(".flex-1");

  if (!originalLogoParent || !leftContainer) {
    return;
  }

  if (deviceMockup && deviceVideo) {
    const MINIMUM_LOOP_DURATION = 24;
    const syncAnimationDuration = () => {
      const duration = deviceVideo.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        return;
      }
      const animationSeconds = Math.max(duration, MINIMUM_LOOP_DURATION);
      const durationValue = `${animationSeconds}s`;
      deviceMockup.style.setProperty(
        "--device-animation-duration",
        durationValue
      );
      deviceMockup.style.animationDuration = durationValue;
    };

    if (deviceVideo.readyState >= 1) {
      syncAnimationDuration();
    } else {
      deviceVideo.addEventListener("loadedmetadata", syncAnimationDuration, {
        once: true,
      });
    }

    deviceVideo.addEventListener("durationchange", syncAnimationDuration);
  }

  function checkHeaderContrast() {
    if (stickyHeader.classList.contains("hidden")) {
      stickyHeader.classList.remove("inverted");
      return;
    }
    const headerRect = stickyHeader.getBoundingClientRect();
    let isOverDark = false;
    darkSections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      if (
        sectionRect.top < headerRect.bottom &&
        sectionRect.bottom > headerRect.top
      ) {
        isOverDark = true;
      }
    });
    if (isOverDark) {
      stickyHeader.classList.add("inverted");
    } else {
      stickyHeader.classList.remove("inverted");
    }
  }

  const observer = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) {
        stickyHeader.classList.remove("hidden");
        stickyHeader.classList.add("sticky-header", "scrolled");
        logoContainer.classList.add("scrolled");
        // Insert logo into the left container
        leftContainer.appendChild(logoContainer);
      } else {
        stickyHeader.classList.add("hidden");
        stickyHeader.classList.remove(
          "sticky-header",
          "scrolled",
          "inverted"
        );
        logoContainer.classList.remove("scrolled");
        originalLogoParent.insertBefore(
          logoContainer,
          originalLogoParent.firstChild
        );
      }
      checkHeaderContrast();
    },
    {
      threshold: [0],
    }
  );

  if (mainCta) {
    observer.observe(mainCta);
  }

  window.addEventListener("scroll", checkHeaderContrast, {
    passive: true,
  });
  window.addEventListener("resize", checkHeaderContrast);

  checkHeaderContrast();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStickyHeader);
} else {
  initStickyHeader();
}
