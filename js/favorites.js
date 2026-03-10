function initFavoritesPopup(){

const popup = document.getElementById("favoritesPopup");
const btn = document.getElementById("favoritesBtn");
const close = document.getElementById("favoritesClose");
const list = document.getElementById("favoritesList");

/* OPEN POPUP */

btn.addEventListener("click",()=>{

renderFavorites();

popup.classList.add("active");
document.body.classList.add("modal-open");

});

/* CLOSE POPUP */

function closePopup(){

popup.classList.remove("active");
document.body.classList.remove("modal-open");

}

close.addEventListener("click",closePopup);

popup.addEventListener("click",(e)=>{
if(e.target === popup){
closePopup();
}
});

function renderFavorites(){

const liked =
JSON.parse(localStorage.getItem("likedDomains")) || [];

list.innerHTML="";

if(liked.length === 0){

list.innerHTML=`
<div style="text-align:center;color:#64748b;font-size:14px;">
No liked domains yet
</div>
`;

return;

}

/* DOMAIN LIST */

let domainsHTML = `<div class="favorites-domains">`;

liked.forEach(domain=>{

domainsHTML += `

<div class="favorite-domain-row">

<div class="favorite-heart active" data-domain="${domain}">
<svg viewBox="0 0 24 24" width="20" height="20">
<path d="M12 20.8c-.3 0-.6-.1-.8-.3C8.5 18.1 2 13.1 2 8.5 2 5.5 4.5 3 7.5 3c1.9 0 3.7 1 4.5 2.6C12.8 4 14.6 3 16.5 3 19.5 3 22 5.5 22 8.5c0 4.6-6.5 9.6-9.2 12-.2.2-.5.3-.8.3z"/>
</svg>
</div>

<div class="favorite-domain-name">
${domain}
</div>

<input
type="checkbox"
class="fav-domain-checkbox"
value="${domain}"
checked
>

</div>

`;

});

domainsHTML += `</div>`;


/* FORM */

const formHTML = `

<div class="favorites-form">

<div class="premium-badge">
PREMIUM DOMAIN
</div>

<div class="domain-desc">
Direct purchase offer for selected domains.
</div>

<div class="form-group">

<label>Your Full Name</label>

<input
type="text"
class="fav-name"
placeholder="John Doe"
autocomplete="name"
>

</div>


<div class="form-group">

<label>Proposed Offer</label>

<div class="flex-row">

<select class="fav-currency">
<option value="USD">USD ($)</option>
<option value="EUR">EURO (€)</option>
<option value="INR">INR (₹)</option>
</select>

<input
type="number"
class="fav-amount"
placeholder="Amount"
>

</div>

</div>


<div class="form-group">

<label>Preferred Contact Method</label>

<div class="contact-method">

<label>
<input type="radio" name="fav-contact" value="whatsapp" checked>
WhatsApp
</label>

<label>
<input type="radio" name="fav-contact" value="email">
Email
</label>

</div>

</div>


<button class="submit-btn fav-submit">
Submit Offer
</button>

</div>

`;

list.innerHTML = domainsHTML + formHTML;


/* HEART TOGGLE (without removing row) */

document.querySelectorAll(".favorite-heart").forEach(heart=>{

heart.addEventListener("click",()=>{

const domain = heart.dataset.domain;

let liked =
JSON.parse(localStorage.getItem("likedDomains")) || [];

const svg = heart.querySelector("svg");

if(heart.classList.contains("active")){

heart.classList.remove("active");
svg.style.fill = "none";
svg.style.stroke = "#64748b";

liked = liked.filter(d => d !== domain);

}else{

heart.classList.add("active");
svg.style.fill = "#ef4444";
svg.style.stroke = "#ef4444";

if(!liked.includes(domain)){
liked.push(domain);
}

}

localStorage.setItem(
"likedDomains",
JSON.stringify(liked)
);

/* update main card hearts */

document.querySelectorAll(".heart").forEach(h=>{

if(h.dataset.domain === domain){

if(liked.includes(domain)){
h.classList.add("active");
}else{
h.classList.remove("active");
}

}

});

/* update navbar counter */

document.dispatchEvent(
new CustomEvent("favoritesUpdated")
);

});

});


/* SUBMIT */

document.querySelector(".fav-submit")
.addEventListener("click",()=>{

const name =
document.querySelector(".fav-name").value.trim();

const amount =
document.querySelector(".fav-amount").value.trim();

const currency =
document.querySelector(".fav-currency").value;

const contact =
document.querySelector("input[name='fav-contact']:checked").value;

const selectedDomains =
Array.from(
document.querySelectorAll(".fav-domain-checkbox:checked")
).map(cb => cb.value);

if(selectedDomains.length === 0){

alert("Please select at least one domain");
return;

}

if(!name || !amount){

alert("Please enter your name and offer amount");
return;

}

const domainList =
selectedDomains.join("\n");

const text = `Hello,

I am interested in purchasing the following domains:

${domainList}

My Name: ${name}
Offer: ${amount} ${currency}

Thank you.`;

if(contact === "whatsapp"){

const url =
`https://wa.me/393319021033?text=${encodeURIComponent(text)}`;

window.open(url,"_blank");

}else{

const subject = `Domain Purchase Offer`;

const mail =
`mailto:info@vadhwa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

window.location.href = mail;

}

});

}



}

document.addEventListener(
"DOMContentLoaded",
initFavoritesPopup
);