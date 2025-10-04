document.querySelectorAll('.data-point').forEach(point => {
    point.addEventListener('mouseenter', () => {
        point.setAttribute('scale', '1.5 1.5 1.5');
    });
    point.addEventListener('mouseleave', () => {
        point.setAttribute('scale', '1 1 1');
    });
});
