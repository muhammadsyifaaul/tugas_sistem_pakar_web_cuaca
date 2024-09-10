const preLoader = document.querySelector('.splash');

window.addEventListener('load', () => {
    setTimeout(() => {
        preLoader.style.display = 'none';
        preLoader.style.pointerEvents = 'none';
    }, 3000);
});

const icon = document.querySelector('.condition i') 
const classValue = icon.getAttribute('class');
if(classValue.includes('sun')) {
    icon.style.animation = 'rotateSun 5s linear infinite';
}


