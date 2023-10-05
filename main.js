const carousel = document.querySelector('[data-carousel]');
const carouselImages = carousel.querySelectorAll('img');
const svg = document.querySelector('.svg-animation');
const polygon = svg.querySelector('polygon');
const path = svg.querySelector('path');

// Carousel 
let currentIndex = 0;

function updateCarousel() {
    currentIndex++;
    if (currentIndex > carouselImages.length - 1) {
        currentIndex = 0;
    }

    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(updateCarousel, 2000);


// SVG Animation
let pathLength = path.getTotalLength();
let points = polygon.getAttribute('points').split(' ');
let pointsString = '';

function updatePolygon(time) {

    // Animate polygon points based on path
    let point = path.getPointAtLength(time);
    points[0] = `${point.x},${point.y}`;
    pointsString = points.join(' ');
    polygon.setAttribute('points', pointsString);

    // Move and rotate polygon based on slope of path
    let tangent = path.getPointAtLength(time + 1);
    let angle = Math.atan2(tangent.y - point.y, tangent.x - point.x) * 180 / Math.PI;
    polygon.setAttribute('transform', `translate(${point.x}, 0) rotate(${angle} ${point.x} ${point.y})`);

}

anime({
    targets: { time: pathLength },
    time: pathLength,
    duration: 6400,
    easing: 'linear',
    loop: true,
    update: updatePolygon
});