function initHearts(){

const navbarHeart = document.getElementById("favoritesBtn");
const counter = document.getElementById("favoritesCount");

function updateFavoritesUI(){

const liked =
JSON.parse(localStorage.getItem("likedDomains")) || [];

if(counter){

counter.innerText = liked.length;

counter.style.display =
liked.length > 0 ? "block" : "none";

}

if(navbarHeart){

if(liked.length > 0){
navbarHeart.classList.add("active");
}else{
navbarHeart.classList.remove("active");
}

}

}

/* restore states */

const liked =
JSON.parse(localStorage.getItem("likedDomains")) || [];

document.querySelectorAll(".heart").forEach(heart=>{

const domain = heart.dataset.domain;

if(liked.includes(domain)){
heart.classList.add("active");
}

heart.addEventListener("click",()=>{

let list =
JSON.parse(localStorage.getItem("likedDomains")) || [];

if(heart.classList.contains("active")){

heart.classList.remove("active");
list = list.filter(d=>d !== domain);

}else{

heart.classList.add("active");
list.push(domain);

}

localStorage.setItem(
"likedDomains",
JSON.stringify(list)
);

updateFavoritesUI();

/* notify popup system */

document.dispatchEvent(
new CustomEvent("favoritesUpdated")
);

});

});

/* listen popup changes */

document.addEventListener(
"favoritesUpdated",
updateFavoritesUI
);

/* initial */

updateFavoritesUI();

}