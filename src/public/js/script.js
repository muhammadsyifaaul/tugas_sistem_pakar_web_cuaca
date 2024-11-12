const preLoader = document.querySelector('.splash');

window.addEventListener('load', () => {
    setTimeout(() => {
        preLoader.style.display = 'none';
        preLoader.style.pointerEvents = 'none';
    }, 2000);
});

const icon = document.querySelector('.condition i') 
const classValue = icon.getAttribute('class');
if(classValue.includes('sun')) {
    icon.style.animation = 'rotateSun 5s linear infinite';
}


const body = document.body;
const condition = document.querySelector('.place p').textContent;

if(condition.trim() === 'Cerah Berawan') {
    body.style.background = 'linear-gradient(rgba(24, 24, 24, 0.4), rgba(24, 24, 24, 0.4)), url("/img/cerahBerawan.jpg")';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundPosition = 'center center';
} else if(condition.trim() === 'Hujan Sedang' || condition.trim() === 'Hujan Ringan') {
    body.style.background = 'linear-gradient(rgba(24, 24, 24, 0.4), rgba(24, 24, 24, 0.4)), url("/img/gambarHujan.jpg")';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundPosition = 'center center';
} else {
    body.style.background = 'linear-gradient(rgba(24, 24, 24, 0.4), rgba(24, 24, 24, 0.4)), url("/img/hujanDeras.jpg")';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';
    body.style.backgroundPosition = 'center center';
}

function logout() {
    axios.post('/logout',)
    .then(res => {
        window.location.href = '/login';
    })
    .catch(err => {
        console.log(err);
    })
}
