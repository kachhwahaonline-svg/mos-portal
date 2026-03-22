function add(service) {

    let name = prompt("Enter Name");
    let mobile = prompt("Enter Mobile");

    let data = JSON.parse(localStorage.getItem("req")) || [];

    data.push({
        id: Date.now(),
        service,
        name,
        mobile,
        status: "Pending"
    });

    localStorage.setItem("req", JSON.stringify(data));

    alert("Submitted to Admin");
}