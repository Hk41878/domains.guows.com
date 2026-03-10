document.addEventListener("DOMContentLoaded", async function(){

await loadDomains();
initAccordion();

setTimeout(()=>{
initHearts();
},200);

/* open card from URL */

setTimeout(()=>{

const params = new URLSearchParams(window.location.search);
const domain = params.get("domain")?.toLowerCase();

if(!domain) return;

const cards = document.querySelectorAll(".domain-card");

cards.forEach(card=>{

const name = card.querySelector(".domain-name").innerText.trim().toLowerCase();

if(name === domain){

card.classList.add("active");

const btn = card.querySelector(".card-expand");

if(btn){
btn.classList.add("open");
btn.textContent = "×";
}

setTimeout(()=>{

const navbar = document.querySelector(".navbar");
const navHeight = navbar ? navbar.offsetHeight : 0;

const rect = card.getBoundingClientRect();
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

window.scrollTo({
top: rect.top + scrollTop - navHeight,
behavior: "smooth"
});

},250);

}

});

},200);

});