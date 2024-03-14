document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.image-box');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.style.backgroundImage = `url(${image.dataset.src})`;
                observer.unobserve(image);
            }
        });
    });

    images.forEach(image => {
        imageObserver.observe(image);
    });
});
