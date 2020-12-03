let menuToggle = document.querySelector('#menu-toggle')
let menu = document.querySelector('.sidebar')



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

const editUsername = document.querySelector('.edit-username')
const editPhotoURL = document.querySelector('.edit-photo')
const userAvatarElem = document.querySelector('.user-avatar')

const postsWrapper = document.querySelector('.posts')



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
            const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}
            listUsers.push(user)
            this.authorizedUser(user)
            handler()
        } else {
            alert('Пользователь с таким email уже зарегистрирован')
        }

    },
    editUser(userName, userPhoto, handler) {
        if (userName){
            this.user.displayName = userName
        }
        if (userPhoto){
            this.user.photo = userPhoto
        }
        handler()

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

const setPosts = {
    allPosts: [
        {
            title: 'Из жизни фельдшера',
            text: 'Дело было зимой ночью в Москве. Рассказал знакомый - студент медвуза, подрабатывал на скорой. Вызвала женщина, сильно живот болит. Приехали, заходят, женщина испугана - и тут появляется муж с бешенным взглядом и не туристическим топором в руках - жену тронете, нахер всех перебю. Из квартиры не выпускает, к телефону тоже - знает, что ментов вызовут. У знакомого нет других вариантов, как идти с захватчиком на переговоры. И ему удается ему втолковать, что жену надо везти в больницу, нужно её нести на носилках, а у подъезда чистый лёд, можно подскользнуться, она выпадет, еще что-то сломает.. И муж с топором пошел вниз отбивать лёд.',
            tags: ['Универ', 'Интересное', 'Медицина', 'Мое', 'Фельдшер'],
            author: 'maks@mail.ru',
            date: '11.11.2020, 20:54:00',
            like: 15,
            comments: 20,
        },
        {
            title: 'Заголовок поста',
            text: '1. В универе надо было самим искать себе практику по переводческой работе и писать отчёт по ней. Моя одногруппница и подруга Маша отработала в крутой компании и общалась с поставщиками со всего мира.После проверки ее работы, молодая преподаватель «усомнилась» в истинности этой работы и запросила контакты руководителя',
            tags: ['Универ', 'Интересное', 'Мое', 'Фельдшер'],
            author: 'kate@mail.ru',
            date: '10.11.2020, 20:54:00',
            like: 45,
            comments: 12,
        },

    ],

}

const toggleAuthDom = () => {
    const user = setUsers.user
    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}




const showAllPosts = () => {

    let postsHTML = ''

    setPosts.allPosts.forEach(( { title, text, date  } ) => {

        postsHTML += `
        
        <section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">${text}</p>
                
                <div class="tags">
                    <a href="#" class="tag">#Универ</a>
                    <a href="#" class="tag">#Клиент</a>
                    <a href="#" class="tag">#Актуальное</a>
                    <a href="#" class="tag">#Мое</a>
                    <a href="#" class="tag">#Жадность</a>
                </div>
            </div>
            <div class="post-footer">
                <div class="post-buttons">
                    <button class="post-button likes">
                        <svg width="19" height="20" class="icon icon-like">
                            <use xlink:href="img/icons.svg#likes"></use>
                        </svg>
                        <span class="likes-counter">51</span>
                    </button>
                    <button class="post-button comments">
                        <svg width="21" height="21" class="icon icon-comment">
                            <use xlink:href="img/icons.svg#comments"></use>
                        </svg>
                        <span class="comments-counter">283</span>

                    </button>
                    <button class="post-button save icon-save">
                        <svg width="19" height="19" class="icon">
                            <use xlink:href="img/icons.svg#save"></use>
                        </svg>
                    </button>
                    <button class="post-button share">
                        <svg width="17" height="19" class="icon icon-share">
                            <use xlink:href="img/icons.svg#share"></use>
                        </svg>
                    </button>
                </div>
                <div class="post-author">
                    <div class="author-about">
                        <a href="" class="author-username">yana86</a>
                        <span class="post-time">${date}</span>
                    </div>
                    <a href="#" class="author-link"><img src="img/avatar2.jpg" alt="ava-2" class="author-avatar"></a>
                </div>
            </div>
        </section>
        `
    })

    postsWrapper.innerHTML = postsHTML
}
const init = () => {

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
        editUsername.value = setUsers.user.displayName
    })

    editContainer.addEventListener('submit', event => {
        event.preventDefault()

        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
        editContainer.classList.remove('visible')
    })
    menuToggle.addEventListener('click', function (event) {
        event.preventDefault()
        menu.classList.toggle('visible')
    })

    showAllPosts()
    toggleAuthDom()
}

document.addEventListener('DOMContentLoaded', () => {
    init()
})

