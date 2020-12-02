let menuToggle = document.querySelector('#menu-toggle')
let menu = document.querySelector('.sidebar')

menuToggle.addEventListener('click', function (event) {
    event.preventDefault()
    menu.classList.toggle('visible')
})

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignup = document.querySelector('.login-signup')
const userElem = document.querySelector('.user')
const userNameElem = document.querySelector('.user-name')

const exitElem = document.querySelector('.exit')
const editElem = document.querySelector('.edit')
const editContainer = document.querySelector('.edit-container')



const listUsers = [
    {
        id: '01',
        email: 'maks@mail.ru',
        password: '12345',
        displayName: 'MaksJS'
    },
    {
        id: '02',
        email: 'kate@mail.ru',
        password: '123',
        displayName: 'Kate'
    },

]

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден')
            return
        }
        const user = this.getUser(email)
        if (user && user.password === password) {
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с такими данными не найден')
        }

    },
    logOut(handler) {
        this.user = null
        handler()
    },
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден')
            return
        }
        if (!email.trim() || !password.trim()) {
            alert("Введите данные")
            return
        }
        if (!this.getUser(email)) {
            const user = {email, password, displayName: email}
            listUsers.push(user)
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с таким email уже зарегистрирован')
        }

    },
    getUser(email) {
        return listUsers.find((item) => {
            return item.email === email
        })
    },
    authorizedUser(user) {
        this.user = user
    }
}

const toggleAuthDom = () => {
    const user = setUsers.user
    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}


loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const emailValue = emailInput.value
    const passwordValue = passwordInput.value

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom)
    loginForm.reset()

})

loginSignup.addEventListener('click', (event) => {
    event.preventDefault()

    const emailValue = emailInput.value
    const passwordValue = passwordInput.value

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom)
    loginForm.reset()
})

exitElem.addEventListener('click', event => {
    event.preventDefault()

    setUsers.logOut(toggleAuthDom)
})

editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible')
})

toggleAuthDom()