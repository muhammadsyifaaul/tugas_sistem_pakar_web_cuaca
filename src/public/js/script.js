// const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');

// registerBtn.addEventListener('click', () => {
//     container.classList.add("active");
// });

// loginBtn.addEventListener('click', () => {
//     container.classList.remove("active");
// });


const preLoader = document.querySelector('.splash');

window.addEventListener('load', () => {
    setTimeout(() => {
        preLoader.classList.add('hidden');
    }, 2000);
});

