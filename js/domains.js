async function loadDomains(){

const response = await fetch("/data/domains.json");
const domains = await response.json();

const container = document.getElementById("domains-container");

domains.forEach(domain => {

if(!domain.available) return;

const card = document.createElement("div");
card.className = "domain-card";

card.innerHTML = `

<div class="card-header">

<div class="card-icon heart" data-domain="${domain.domain}">
<svg viewBox="0 0 24 24" width="22" height="22">
<path d="M12 20.8c-.3 0-.6-.1-.8-.3C8.5 18.1 2 13.1 2 8.5 2 5.5 4.5 3 7.5 3c1.9 0 3.7 1 4.5 2.6C12.8 4 14.6 3 16.5 3 19.5 3 22 5.5 22 8.5c0 4.6-6.5 9.6-9.2 12-.2.2-.5.3-.8.3z"/>
</svg>
</div>

<div class="domain-name">
${domain.domain}
</div>

<div class="card-expand">+</div>

</div>


<div class="card-body">

<div class="premium-badge">
PREMIUM DOMAIN
</div>

<div class="domain-desc">
Direct purchase offer for this domain.
</div>


<div class="form-group">

<label>Your Full Name</label>

<input 
type="text"
name="name"
class="name-input"
placeholder="John Doe"
autocomplete="name"
required
>

</div>


<div class="form-group">

<label>Proposed Offer</label>

<div class="flex-row">

<select class="currency">
<option value="USD">USD ($)</option>
<option value="EUR">EURO (€)</option>
<option value="INR">INR (₹)</option>
</select>

<input 
type="number"
class="amount-input"
placeholder="Amount"
required
>

</div>

</div>


<div class="form-group">

<label>Preferred Contact Method</label>

<div class="contact-method">

<button class="contact-btn " data-method="whatsapp">
WhatsApp
</button>

<button class="contact-btn active" data-method="email">
Email
</button>

</div>

</div>


<div class="toggle-row">

<span>Add a personal message</span>

<label class="switch">

<input type="checkbox" class="msgToggle">

<span class="slider"></span>

</label>

</div>


<div class="form-group msgArea" style="display:none">

<textarea 
rows="3"
placeholder="Write your message here..."
></textarea>

</div>


<button class="submit-btn">
Submit Offer
</button>


<div class="card-footer">
Inquiries: <strong>info@vadhwa.com</strong>
</div>

</div>

`;

container.appendChild(card);

});

initMessageToggle();
initContactButtons();
initFormSubmit();

}


/* message toggle */

function initMessageToggle(){

document.querySelectorAll(".msgToggle").forEach(toggle=>{

toggle.addEventListener("change",function(){

const card=this.closest(".card-body");
const area=card.querySelector(".msgArea");

area.style.display=this.checked ? "block" : "none";

});

});

}


/* contact button toggle */

function initContactButtons(){

document.querySelectorAll(".contact-method").forEach(group=>{

const buttons = group.querySelectorAll(".contact-btn");

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");

});

});

});

}


/* submit logic */

function initFormSubmit(){

document.querySelectorAll(".submit-btn").forEach(btn=>{

btn.addEventListener("click",function(){

const card=this.closest(".card-body");

const domain=
this.closest(".domain-card")
.querySelector(".domain-name").innerText;

const name=card.querySelector(".name-input").value.trim();

const amount=card.querySelector(".amount-input").value.trim();

const currency=card.querySelector(".currency").value;

const contact=
card.querySelector(".contact-btn.active").dataset.method;

const messageBox=card.querySelector(".msgArea textarea");

let userMsg="";

if(messageBox){
userMsg=messageBox.value;
}


/* validation */

if(!name || !amount){

showToast("Please enter your name and offer amount");

return;

}


const text=
`Hello,

I am interested in purchasing the domain:

${domain}

My Name: ${name}
Offer: ${amount} ${currency}

Message:
${userMsg}

Thank you.`;


/* contact method */

if(contact==="whatsapp"){

const url=
`https://wa.me/393319021033?text=${encodeURIComponent(text)}`;

window.open(url,"_blank");

}else{

const subject=`Domain Purchase Offer: ${domain}`;

const mail=
`mailto:info@vadhwa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

window.location.href=mail;

}

});

});

}


/* toast */

function showToast(msg){

let toast=document.createElement("div");

toast.innerText=msg;

toast.style.position="fixed";
toast.style.bottom="30px";
toast.style.left="50%";
toast.style.transform="translateX(-50%)";

toast.style.background="#1e293b";
toast.style.color="white";

toast.style.padding="10px 18px";
toast.style.borderRadius="8px";

toast.style.fontSize="14px";

toast.style.zIndex="9999";

document.body.appendChild(toast);

setTimeout(()=>{
toast.remove();
},2500);

}