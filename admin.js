function load() {
    let data = JSON.parse(localStorage.getItem("req")) || [];
    let html = "";

    data.forEach((r,i) => {
        html += `
        <tr>
        <td>${r.id}</td>
        <td>${r.service}</td>
        <td>${r.name}</td>
        <td>${r.status}</td>
        <td>
        <button onclick="update(${i},'Approved')">Approve</button>
        <button onclick="update(${i},'Rejected')">Reject</button>
        </td>
        </tr>`;
    });

    document.getElementById("data").innerHTML = html;
}

function update(i,s) {
    let data = JSON.parse(localStorage.getItem("req"));
    data[i].status = s;
    localStorage.setItem("req", JSON.stringify(data));
    load();
}

function view(i){
let d = JSON.parse(localStorage.getItem("req"))[i];
alert(JSON.stringify(d.data, null, 2));
}
load();