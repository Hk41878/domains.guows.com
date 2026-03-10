function initAccordion(){

const container = document.getElementById("domains-container");

container.addEventListener("click",function(e){

if(!e.target.classList.contains("card-expand")) return;

const btn = e.target;
const card = btn.closest(".domain-card");

const domain =
card.querySelector(".domain-name").innerText;

/* close others */

document.querySelectorAll(".domain-card.active").forEach(el=>{
if(el !== card){
el.classList.remove("active");

const otherBtn = el.querySelector(".card-expand");
if(otherBtn){
otherBtn.classList.remove("open");
otherBtn.textContent="+";
}
}
});

/* toggle */

card.classList.toggle("active");

if(card.classList.contains("active")){

btn.classList.add("open");
btn.textContent="×";

/* update url */

history.replaceState(
null,
"",
`?domain=${domain}`
);

/* smooth scroll */

setTimeout(()=>{

const navbar = document.querySelector(".navbar");
const navHeight = navbar ? navbar.offsetHeight : 0;

const cardTop =
card.getBoundingClientRect().top + window.scrollY;

window.scrollTo({
top: cardTop - navHeight,
behavior: "smooth"
});

},350);

}else{

btn.classList.remove("open");
btn.textContent="+";

history.replaceState(null,"","/");

}

});

}