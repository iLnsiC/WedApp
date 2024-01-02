const toggleBtns = document.querySelectorAll(".toggle-btn")
const toggleSections = document.querySelectorAll(".toggled")
tippy('[data-tippy-content]');

toggleBtns.forEach(btn =>{
    btn.addEventListener('click', (event) => {toggleAction(event)})
})

function toggleAction(){
    event.preventDefault()
    let target = event.target.dataset.target;
    toggleBtns.forEach(btn => {
        if (target === btn.dataset.target) {
            btn.classList.add("active")
        } else {
            btn.classList.remove("active")
        }
    })
    toggleSections.forEach( section => {
        if(target === section.id){
            section.classList.add("active")
        } else {
            section.classList.remove("active")
        }
    })
}

async function fetchGuest() {
    const content = document.querySelector("#guest #tableau-content")

}

async function fetchTable() {
    const content = document.querySelector("#table #tableau-content")
}