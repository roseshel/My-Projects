
document.addEventListener("DOMContentLoaded", function () {
    const features = document.querySelectorAll('.feature');
    
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (rect.top <= window.innerHeight && rect.bottom >= 0);
    }

   
    function handleScroll() {
        features.forEach(feature => {
            if (isInViewport(feature)) {
                feature.style.animation = 'fadeIn 2s ease-in-out';
            }
        });
    }

   
    handleScroll();

   
    window.addEventListener('scroll', handleScroll);
});
