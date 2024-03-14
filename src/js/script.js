document.addEventListener("DOMContentLoaded", function () {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.backgroundImage = `url(${entry.target.getAttribute(
          "data-bg"
        )})`;
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll(".image-box").forEach((box) => {
    observer.observe(box);
  });
});
