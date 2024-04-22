function registerUser(event) {
    event.preventDefault(); // Предотвращаем стандартное действие отправки формы

    const passwordInput = document.querySelector('input[name="new_password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    const emailInput = document.querySelector('input[name="email"]');
    const usernameInput = document.querySelector('input[name="new_username"]');
    const firstNameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');

    function createToast(type, icon, title, text) {
        let notifications = document.querySelector('.notifications');
        let newToast = document.createElement('div');
        newToast.innerHTML = `
            <div class="toast ${type}">
                <i class="${icon}"></i>
                <div class="content">
                    <div class="title">${title}</div>
                    <span>${text}</span>
                </div>
                <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
            </div>`;
        notifications.appendChild(newToast);
        newToast.timeOut = setTimeout(
            () => newToast.remove(), 5000
        )
    }

    // Проверка наличия данных в полях
    if (!usernameInput.value.trim() || !firstNameInput.value.trim() || !lastNameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value.trim() || !confirmPasswordInput.value.trim()) {
        createToast('error', 'fa-solid fa-circle-exclamation', 'Error', 'All fields are required!');
        return;
    }

    // Проверка совпадения паролей
    if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
        createToast('error', 'fa-solid fa-circle-exclamation', 'Error', 'Passwords do not match!');
        return;
    }

    // Проверка формата email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        createToast('warning', 'fa-solid fa-circle-exclamation', 'Warning', 'Invalid email format!');
        return;
    }

    // Собираем данные из формы
    const formData = {
        username: usernameInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    // Отправляем данные на сервер в формате JSON
    fetch('/register/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
        if (!response.ok) {
            // Если сервер вернул ошибку, отобразить соответствующее уведомление
            createToast('warning', 'fa-solid fa-circle-exclamation', 'Warning', 'Registration failed. Username already exists.');
            throw new Error('Registration failed.');
        }
        return response.json();
    })
        .then(data => {
            // Обработка успешного ответа от сервера
            console.log('Success:', data);
        })
        .catch((error) => {
            // Обработка других ошибок
            console.error('Error:', error);
        });
}
