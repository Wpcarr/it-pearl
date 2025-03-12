document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach((carouselContainer) => {
        const carousel = carouselContainer.querySelector(".carousel");
        const images = carousel.querySelectorAll("img");
        let index = 0;

        const nextBtn = carouselContainer.querySelector(".next");
        const prevBtn = carouselContainer.querySelector(".prev");

        function updateCarousel() {
            carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % images.length;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + images.length) % images.length;
            updateCarousel();
        });
    });
});