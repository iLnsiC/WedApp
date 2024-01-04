tippy('[data-tippy-content]');

function redirect() {
    const origin =
        window.location.href.split(".html")[0].split("/").slice(0, -1).join("/") +
        "/";
    window.location.replace(`${origin}login.html`);
}
function removeLoader(){
    const loader = document.querySelector('.loader-wrapper')
    loader ? loader.remove() : null;
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
async function getUserData(userId){
    let userData = null; 
    await fetch(`http://localhost:3085/api/user/${userId}`)
        .then(res => res.json())
        .then(data => userData = data)
        .catch(err => console.error(err))
    return userData
}

function loadHeader(userData){
    const header = document.querySelector('header');
    const headerTemplate = 
    `
        <div class="header-title">
            <h2>Save the date</h2>
            <h1>Emilie & Walid</h1>
        </div>
        <img class="main-picture" src="assets/logo/Groupe36.svg" alt="salle d'invitation"/>
        <div class="header-text">
            Vous êtes invités au mariage de
            <span class="bold">Walid et Emilie</span>
            Qui se déroulera le
            <span class="bold">20 avril 2024</span>
            À partir de
            <span class="bold">14h</span>
            à la mairie d'<span class="bold">Ozoir-la-ferrière</span>
        </div>
        <img class="main-picture" src="assets/img/calendrier.svg" alt="salle d'invitation"/>
    `
    header.insertAdjacentHTML('beforeend', headerTemplate);
}

function loadPlanning(userData){
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

function loadTheme(userData){
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

function loadPresence(userData){
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
                        <input type="checkbox" name="cityHall" id="cityHall" />
                    </label>
                    <label for="reception">
                        À la reception
                        <input type="checkbox" name="reception" id="reception" />
                    </label>
                </div>
                <div class="diet-select">
                    <label for="diet">Je suis un régime</label>
                    <select name="diet" id="diet">
                        <option value=""></option>
                        <option value="Vegan">Végan</option>
                        <option value="Vegetarien">Végétarien</option>
                    </select>
                </div>
                <div class="form-textarea">
                    <label for="moreInfo">J’ai des allergies ou un régime spécial <br>(Précisez le/léquels)</label>
                    <textarea name="moreInfo" id="moreInfo" rows="5"></textarea>
                </div>
                <button type="submit" class="main-btn">Valider</button>
            </form>
        </div>
    `
    presenceSection.insertAdjacentHTML('beforeend', presenceTemplate);
}

function loadGroup(userData){
    const groupSection = document.querySelector('#group');
    const groupTemplate = 
    `
        <div class="wrapper">
            <h2 class="section-title">Les membres de ma famille</h2>
            <form id="members">
                <div class="member" id="id-user">
                    <p>Figuigui Ryad</p>
                    <label for="cityHall">
                        <input type="checkbox" name="cityHall" id="cityHall" />
                        À la mairie
                    </label>
                    <label for="cityHall">
                        <input type="checkbox" name="cityHall" id="cityHall" />
                        Au dîner
                    </label>
                </div>
            </div>
        </div>
    `
    groupSection.insertAdjacentHTML('beforeend', groupTemplate);
}

async function loadPage() {
    const userId = await checkAuthorized();
    if (!userId) {
        redirect()
    }
    const userData = await getUserData(userId);
    loadHeader(userData);
    loadPlanning(userData);
    loadTheme(userData);
    loadPresence(userData);
    loadGroup(userData);
    removeLoader()
}

loadPage()