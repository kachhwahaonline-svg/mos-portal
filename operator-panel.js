let currentService = "";

/* FIELD DEFINITIONS */
const formConfig = {

"New PAN Apply": [
{label:"Full Name", id:"name"},
{label:"Mobile", id:"mobile"},
{label:"DOB", id:"dob"},
{label:"Aadhaar Number", id:"aadhaar"},
{label:"Address", id:"address"}
],

"PAN Correction": [
{label:"PAN Number", id:"pan"},
{label:"Name", id:"name"},
{label:"Correction Type", id:"type"}
],

"PVC Card Apply": [
{label:"Aadhaar Number", id:"aadhaar"},
{label:"Mobile", id:"mobile"}
],

"New Voter Registration": [
{label:"Name", id:"name"},
{label:"DOB", id:"dob"},
{label:"Address", id:"address"}
],

"New Family Registration": [
{label:"Head Name", id:"name"},
{label:"Mobile", id:"mobile"},
{label:"Address", id:"address"}
]

};

/* OPEN FORM */
function req(service){
currentService = service;

document.getElementById("formTitle").innerText = service;

let fields = formConfig[service] || [
{label:"Name", id:"name"},
{label:"Mobile", id:"mobile"}
];

let html = "";

fields.forEach(f=>{
html += `
<input id="f_${f.id}" placeholder="${f.label}">
`;
});

document.getElementById("formFields").innerHTML = html;
document.getElementById("formModal").style.display = "flex";
}

/* CLOSE */
function closeForm(){
document.getElementById("formModal").style.display="none";
}

/* SUBMIT */
function submitForm(){

let fields = formConfig[currentService] || [];
let obj = {};

fields.forEach(f=>{
obj[f.id] = document.getElementById("f_"+f.id).value;
});

if(!obj.name && !obj.mobile){
alert("Fill required fields");
return;
}

let operator = localStorage.getItem("currentOperator") || "Operator";

let data = JSON.parse(localStorage.getItem("req")) || [];

data.push({
id: Date.now(),
service: currentService,
data: obj,
operator: operator,
status: "Pending"
});

localStorage.setItem("req", JSON.stringify(data));

alert("Submitted");
closeForm();
}

/* SECTION SWITCH */
function show(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* LOGOUT */
function logout(){
localStorage.removeItem("role");
window.location="login.html";
}