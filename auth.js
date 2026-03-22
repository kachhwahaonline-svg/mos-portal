function toggle() {
    let p = document.getElementById("password");
    p.type = p.type === "password" ? "text" : "password";
}

function login() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    /* ADMIN LOGIN */
    if (user === "admin" && pass === "1234") {
        localStorage.setItem("role", "admin");
        window.location = "dashboard-admin.html";
        return;
    }

    /* OPERATOR LOGIN FROM DATABASE */
    let ops = JSON.parse(localStorage.getItem("operators")) || [];

    let found = ops.find(o => o.username === user && o.password === pass);

    if (found) {
        localStorage.setItem("role", "operator");
        localStorage.setItem("currentOperator", user);
        window.location = "dashboard-operator.html";
        return;
    }

    alert("Invalid login");
}