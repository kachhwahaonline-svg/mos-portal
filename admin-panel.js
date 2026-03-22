/* SECTION SWITCH */
function show(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");

if(id==="request") load();
if(id==="user") loadOperators();
}

/* ================= USER MANAGEMENT ================= */

function createOperator(){
let u=prompt("Username");
let p=prompt("Password");

let ops=JSON.parse(localStorage.getItem("operators"))||[];

ops.push({username:u,password:p});

localStorage.setItem("operators",JSON.stringify(ops));
loadOperators();
}

function loadOperators(){
let ops=JSON.parse(localStorage.getItem("operators"))||[];
let html="";
ops.forEach(o=>{
html+=`<li>${o.username}</li>`;
});
document.getElementById("opList").innerHTML=html;
}

/* ================= SERVICE MANAGEMENT ================= */

function addService(){
let name=prompt("Service Name");

let s=JSON.parse(localStorage.getItem("services"))||[];
s.push(name);

localStorage.setItem("services",JSON.stringify(s));
loadServices();
}

function loadServices(){
let s=JSON.parse(localStorage.getItem("services"))||[];
let html="";
s.forEach(x=> html+=`<li>${x}</li>`);
document.getElementById("serviceList").innerHTML=html;
}

/* ================= REQUEST MANAGEMENT ================= */

function load(){
let data=JSON.parse(localStorage.getItem("req"))||[];
render(data);
}

function render(data){
let html="";
data.forEach((r,i)=>{
html+=`
<tr>
<td>${r.id}</td>
<td>${r.service}</td>
<td>$<td>${r.data?.name || "-"}</td>
<td>${r.operator||"-"}</td>
<td>${r.status}</td>
<td>
<button onclick="update(${i},'Approved')">Approve</button>
<button onclick="update(${i},'Rejected')">Reject</button>
<button onclick="view(${i})">View</button>
</td>
</tr>`;
});
document.getElementById("data").innerHTML=html;
}

function update(i,s){
let d=JSON.parse(localStorage.getItem("req"));
d[i].status=s;
localStorage.setItem("req",JSON.stringify(d));
load();
}

function filterStatus(s){
let d=JSON.parse(localStorage.getItem("req"))||[];
if(s==="All") return render(d);
render(d.filter(x=>x.status===s));
}

/* ================= BACKUP ================= */

function backup(){
let data=localStorage.getItem("req");
alert("Backup Created");
}

function restore(){
alert("Manual restore needed");
}

function exportCSV(){
let d=JSON.parse(localStorage.getItem("req"))||[];
let csv="ID,Service,Name,Status\n";

d.forEach(r=>{
csv+=`${r.id},${r.service},${r.name},${r.status}\n`;
});

let blob=new Blob([csv]);
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="data.csv";
a.click();
}

/* ================= REPORT ================= */

function serviceReport(){
alert("Service Report");
}

function dailyReport(){
alert("Daily Report");
}

/* ================= LOGOUT ================= */

function logout(){
localStorage.clear();
window.location="login.html";
}

/* INIT */
loadServices();
loadOperators();

function toggleSidebar(){

let sidebar = document.getElementById("sidebar");

sidebar.classList.toggle("collapsed");
}