function initEmailPopup(){

const btn = document.querySelector(".email-icon");
const popup = document.getElementById("emailPopup");
const close = document.getElementById("emailClose");
const list = document.getElementById("emailDomainsList");
const continueBtn = document.getElementById("emailContinue");

btn.addEventListener("click",()=>{

renderDomains();

popup.classList.add("active");

});

close.addEventListener("click",()=>{
popup.classList.remove("active");
});

popup.addEventListener("click",(e)=>{
if(e.target===popup){
popup.classList.remove("active");
}
});


function renderDomains(){

const liked =
JSON.parse(localStorage.getItem("likedDomains")) || [];

list.innerHTML="";

if(liked.length===0){

list.innerHTML = `
<div style="text-align:center;color:#64748b">
No liked domains
</div>
`;

return;

}

liked.forEach(domain=>{

const row=document.createElement("div");
row.className="email-domain-row";

row.innerHTML=`

<div class="email-domain-name">
${domain}
</div>

<input type="checkbox" value="${domain}" checked>

`;

list.appendChild(row);

});

}


continueBtn.addEventListener("click",()=>{

const selected = Array.from(
document.querySelectorAll("#emailDomainsList input:checked")
).map(cb=>cb.value);

/* message build */

let text = "Hello,\n\n";

if(selected.length>0){

text += `I am interested in purchasing the following domains:\n\n${selected.join("\n")}\n\n`;

}else{

text += "I am interested in purchasing one of your domains.\n\n";

}

text += "Thank you.";

const mail =
`mailto:info@vadhwa.com?subject=Domain Inquiry&body=${encodeURIComponent(text)}`;

window.location.href = mail;

});

}

document.addEventListener(
"DOMContentLoaded",
initEmailPopup
);