function showRegister() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('registerPage').classList.add('active');
}

document.querySelectorAll('.link').forEach(item => {
    item.addEventListener('click', function() {
        showRegister();
    });
});