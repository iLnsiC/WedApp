tippy('[data-tippy-content]');

function redirect() {
    const origin =
        window.location.href.split(".html")[0].split("/").slice(0, -1).join("/") +
        "/";
    window.location.replace(`${origin}login.html`);
}

function removeLoader() {
    const loader = document.querySelector('.loader-wrapper')
    loader.style.opacity = 0;
    setTimeout(() => {
        loader ? loader.remove() : null;
    }, 500);
}

function logOffAction() {
    const logOffBtn = document.querySelector('.back-btn')
    logOffBtn.addEventListener('click', () => {
        sessionStorage.removeItem("token")
        redirect();
    })
}

function snackBar(message) {
    const randId = 'snackbar-' + Math.round(Math.random() * 100000)
    const snackbarHolder = document.querySelector('.snackbar-holder')
    const snackbar = `<div id="${randId}" class="snack-bar">${message}</div>`
    snackbarHolder.insertAdjacentHTML('beforeend', snackbar);
    setTimeout(() => {
        const snackbarEl = document.getElementById(randId)
        snackbarEl.remove()
    }, 5000);}

function updateGuestAction(userId) {
    const submitBtn = document.querySelector('#guest-update')
    const form = document.querySelector('#presence-form')
    submitBtn.addEventListener('click', (event)=>{
        event.preventDefault();
        const formData = new FormData(form)
        let payload = {
            diet: '',
            restriction: '',
            isPresent: {
                cityHall: false,
                cityHallValidatedBy: userId,
                reception: false,
                receptionValidatedBy: userId,
            }
        };
        for (const [key, value] of formData) {
            if (key == 'reception' || key == 'cityHall') {
                payload.isPresent[key] = value == 'on' ? true : false
            } else{
                payload[key] = value
            }
        }
        fetch(`http://localhost:3085/api/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${sessionStorage.token}`,
            },
            body: JSON.stringify(payload),
        }).then((res) =>{
            if (res.status === 200) {
                snackBar('merci de nous avoir communiquer vos envies')
            } else {
                snackBar('Une erreur s\'est produite veuillez reessayer de nouveau <br> ou de communiquer directement avec nous')
            }
        }).catch(err => console.error(err))
    })
}

function updateGroupAction(groupPresence) {
    const submitBtn = document.querySelector('#group-update')
    const inputs = document.querySelectorAll('#members input')
    inputs.forEach(input => {
        const [keyName, id] = input.id.split('-')
        input.addEventListener('click', () => {
            groupPresence[id][keyName] = input.checked
        })
    })
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const { userId, ...payload} = groupPresence

    })
}

async function checkAuthorized() {
    let userId = null
    if (sessionStorage.token) {
        await fetch("http://localhost:3085/api/user/is-auth", {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${sessionStorage.token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.userId) {
                    userId = data.userId;
                }
                return null;
            })
            .catch(err => {
                redirect()
            })
    } else {
        redirect()
    }

    return userId;
}

async function getUserData(userId) {
    let userData = null;
    await fetch(`http://localhost:3085/api/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .then(res => res.json())
        .then(data => userData = data)
        .catch(err => console.error(err))
    return userData
}

async function getGroupMember(userId, groupId) {
    let groupData = null;
    await fetch(`http://localhost:3085/api/user/${userId}/group/${groupId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${sessionStorage.token}`,
        },
    })
        .then(res => res.json())
        .then(data => userData = data)
        .catch(err => console.error(err))
    return userData
}

function loadHeader(userData) {
    const header = document.querySelector('header');
    const headerTemplate =
        `
            <div class="header-title">
                <h2>Save the date</h2>
                <h1>Emilie & Walid</h1>
            </div>
            <img class="main-picture" src="assets/img/Groupe36.webp" alt="salle d'invitation" width="300"/>
            <div class="header-text">
                <span class="bold">${userData.firstName} ${userData.lastName}</span> <br>
                Tu es invité au mariage de
                <span class="bold">Walid et Emilie</span>
                Qui se déroulera le
                <span class="bold">20 avril 2024</span>
                À partir de
                <span class="bold">14h</span>
                à la mairie d'<span class="bold">Ozoir-la-ferrière</span>
            </div>
            <img class="main-picture" src="assets/img/calendrier.webp" alt="salle d'invitation"/>
        `
    header.insertAdjacentHTML('beforeend', headerTemplate);
}

function loadPlanning(userData) {
    const planningSection = document.querySelector('#planning');
    const planningTemplate =
        `
        <div class="wrapper">
            <div class="section-pastille"></div>
            <h2 class="section-title">Déroulé de la journée</h2>
            <div class="event">
                <div class="time">15:00</div>
                <img src="assets/logo/Cocktail.svg" alt="" class="logo">
                <div class="description">Cérémonie civile</div>
            </div>
            <div class="event">
                <div class="time">15:00</div>
                <img src="assets/logo/Cocktail.svg" alt="" class="logo">
                <div class="description">Cocktail Apéritif</div>
            </div>
            <div class="event">
                <div class="time">15:00</div>
                <img src="assets/logo/Cocktail.svg" alt="" class="logo">
                <div class="description">Cérémonie civile</div>
            </div>
            <div class="event">
                <div class="time">15:00</div>
                <img src="assets/logo/Cocktail.svg" alt="" class="logo">
                <div class="description">Cérémonie civile</div>
            </div>
        </div>
    `
    planningSection.insertAdjacentHTML('beforeend', planningTemplate);
}

function loadTheme(userData) {
    const themeSection = document.querySelector('#theme');
    const themeTemplate =
        `
        <div class="wrapper">
            <h2 class="section-title">Thème & Couleurs</h2>
            <h3>Naturel & Romantique</h3>
            <div class="colors">
                <img src="assets/logo/couleur 1.svg" alt="">
                <img src="assets/logo/couleur 2.svg" alt="">
                <img src="assets/logo/couleur 3.svg" alt="">
                <img src="assets/logo/couleur 4.svg" alt="">
            </div>
            <p>(Aucun code vestimentaire n'est imposée)</p>
        </div>
    `
    themeSection.insertAdjacentHTML('beforeend', themeTemplate);
}

function loadPresence(userData) {
    const presenceSection = document.querySelector('#presence');
    const presenceTemplate =
        `
        <div class="wrapper">
            <div class="section-pastille"></div>
            <h2 class="section-title ">Je confirme ma présence</h2>
            <form id="presence-form">
                <div class="form-prencese">
                    <label for="cityHall">
                        À la mairie
                        <input type="checkbox" name="cityHall" id="cityHall" ${userData.isPresent.cityHall ? 'checked' : ''}/>
                    </label>
                    <label for="reception">
                        À la reception
                        <input type="checkbox" name="reception" id="reception" ${userData.isPresent.reception ? 'checked' : ''}/>
                    </label>
                </div>
                <div class="diet-select">
                    <label for="diet">Je suis un régime</label>
                    <select name="diet" id="diet">
                        <option value=""></option>
                        <option value="vegan" ${userData.diet === 'vegan' ? 'selected': null}>Végan</option>
                        <option value="vegetarien"  ${userData.diet === 'vegetarien' ? 'selected': null}>Végétarien</option>
                    </select>
                </div>
                <div class="form-textarea">
                    <label for="restriction">J’ai des allergies ou un régime spécial <br>(Précisez le/léquels)</label>
                    <textarea name="restriction" id="restriction" rows="5">${userData.restriction}</textarea>
                </div>
                <button id="guest-update" type="submit" class="main-btn">Valider</button>
            </form>
        </div>
    `
    presenceSection.insertAdjacentHTML('beforeend', presenceTemplate);
    updateGuestAction(userData._id)
}

function loadGroup(userData, groupData) {
    if (userData.isMain) {
        let membreList = '';
        let groupPresence = {
            userId: userData._id
        }
        groupData.map(membre => {
            groupPresence[membre.id] = {
                cityHall: membre.isPresent.cityHall,
                reception: membre.isPresent.reception,
            }
            membreList += `
                <div class="member" id="id-user">
                    <p>${membre.firstName} ${membre.lastName}</p>
                    <label for="cityHall-${membre.id}">
                        <input type="checkbox" name="cityHall-${membre.id}" id="cityHall-${membre.id}" ${membre.isPresent.cityHall ? 'checked' : ''}/>
                        mairie
                    </label>
                    <label for="reception-${membre.id}">
                        <input type="checkbox" name="reception-${membre.id}" id="reception-${membre.id}" ${membre.isPresent.reception ? 'checked' : ''}/>
                        dîner
                    </label>
                </div>`
        })
        const groupSection = document.querySelector('#group');
        const groupTemplate =
            `
                <div class="wrapper">
                    <h2 class="section-title">Les membres de ma famille</h2>
                    <h3 class="section-sub-title">Je valide leur presence (optionnel)</h3>
                    <form id="members">
                        ${membreList}
                        <button id="group-update" class="main-btn" type="submit">Valider</button>
                    </form>
                </div>
            `
        groupSection.insertAdjacentHTML('beforeend', groupTemplate);
        updateGroupAction(groupPresence)
    }
}
function hideSection(isRecap = false) {
    const header = document.querySelector('header')
    const sections = document.querySelectorAll('section')
    const backBtn = document.querySelector('#back-btn')
    const recapBtn = document.querySelector('#recap-btn')
    if (isRecap) {
        header.style.display = 'none'
        sections.forEach(section => {
            if (!(section.id === 'recap')){
                section.style.display = 'none'
            } else {
                section.style.display = 'block'
            }
        })

    } else {
        header.style.display = 'block'
        sections.forEach(section => {
            if (!(section.id === 'recap')){
                section.style.display = 'block'
            } else {
                section.style.display = 'none'
            }
        })
    }
}

async function getRecap(userId) {
    const recapBtn = document.querySelector('#recap-btn')
    const recapSection = document.querySelector('#recap')
    recapBtn.addEventListener('click', async () => {
        const userData = await getUserData(userId);
        let message = 'Actuellement vous ne semblez pas pouvoir y participer.<br> Si des changements ont lieu vous pouvez nous reconfirmer votre presence sur votre espace invites'
        const table = userData.table
        const diet = userData.diet ? userData.diet : 'classique'
        let address = ''
        if (userData.isPresent.reception) {
            address = '<h3>Le Garden</h3> Saint-Maur-Des-Fosses 94100'
            message = `À partir de <span class="bold">18h30</span> au restaurent le Garden <span class="bold">Saint-Maure-Des-Fosses</span>`
            if (userData.isPresent.cityHall) {
                address = '<h3>La mairie</h3> Ozoir-la-ferrière 77330'
                message = `À partir de <span class="bold">14h</span> à la mairie d'<span class="bold">Ozoir-la-ferrière</span>`
            }
        }
        const recapTemplate =
            `
                <div class="recap-bg">
                    <div class="back-drop">
                        <div class="wrapper">
                            <div class="header-title">
                                <h2>Save the date</h2>
                                <h1>Emilie & Walid</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="header-text">
                        <span class="bold">${userData.firstName} ${userData.lastName}</span> <br>
                        Tu es invité au mariage de
                        <span class="bold">Walid et Emilie</span>
                        Qui se déroulera le
                        <span class="bold">20 avril 2024</span>
                        ${message}
                    </div>
                    <div class="recap-menu">
                        <div class="trace">
                            <div>
                                RDV
                                ${address}
                            </div>
                        </div>
                        <div class="center-card">
                            <div>
                                <img src="assets/logo/diner.svg" alt="cloche"/>
                                <h3>Menu</h3>
                                <p>${diet}</p>
                            </div>
                        </div>
                        <div class="trace">
                            <div>
                                <h3>Table</h3>
                                <p>${table}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        hideSection(true)
        recapSection.insertAdjacentHTML('beforeend', recapTemplate);
    })
}

async function loadPage() {
    const userId = await checkAuthorized();
    if (!userId) {
        redirect()
    }
    logOffAction();
    const userData = await getUserData(userId);
    const groupData = await getGroupMember(userId, userData.family)
    loadHeader(userData);
    loadPlanning(userData);
    loadTheme(userData);
    loadPresence(userData);
    loadGroup(userData, groupData);
    await getRecap(userId);
    removeLoader()
}

loadPage()