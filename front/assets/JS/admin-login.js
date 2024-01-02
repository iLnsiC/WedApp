const loginBtn = document.querySelector('.admin-login-btn')
const form = document.querySelector('form')
const errorHolder = document.querySelector('.error')
loginBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const payload = new Object()

    for (const [key, value] of formData) {
        payload[key] = value;
    }

    fetch("http://localhost:3085/api/auth/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (response.status === 401) {
                errorHolder.textContent = 'l\'identifiant que vous avez fourni semble incorrecte'
                form.reset()
                return null
            } else if (response.status === 200) {
                return response.json();
            } else {
                return null
            }
        })
        .then(data => {
            if (data) {
                sessionStorage.setItem("token", data.token);
                const origin =
                    window.location.href.split(".html")[0].split("/").slice(0, -1).join("/") +
                    "/";
                window.location.replace(`${origin}admin.html`);
            }
        })
        .catch(err => {
            console.error(err)
        })
})