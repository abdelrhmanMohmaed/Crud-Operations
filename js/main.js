let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let phoneInput = document.getElementById("phone");
let emailInput = document.getElementById("email");
let salaryInput = document.getElementById("salary");
let resuitInput = document.getElementById("resuit");
let addBtn = document.getElementById("btn");
let Inputs = document.getElementsByClassName("form-control");
let submite = document.getElementById("submite");
let employees
let mainIndex = 0;
var error = document.getElementById("error")
let errors = [];

submite.onclick = (e) => {
    e.preventDefault();
}

addBtn.onclick = () => {
    if (validationName() && validationAge() && validationPhone() && validationsalary() && validationresuit() && validationemail() == true) {
        chackForm();
        disPlayData();
        resetForm();
        console.log("vaildate OOOK")
    }
    else {
        console.log("vaildate Not oK")
    }

}
if (localStorage.getItem("empolyeesList") == null) {
    employees = []
}
else {
    employees = JSON.parse(localStorage.getItem("empolyeesList"));
    disPlayData();
}
function addEmployee() {
    let employee = {
        name: nameInput.value,
        age: ageInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        salary: salaryInput.value,
        resuit: resuitInput.value,
    }
    employees.push(employee);
    localStorage.setItem("empolyeesList", JSON.stringify(employees))
}
function disPlayData() {
    trs = "";
    for (var i = 0; i < employees.length; i++) {
        trs += `
        <tr>
        <td>${employees[i].name}</td>
        <td>${employees[i].age}</td>
        <td>${employees[i].phone}</td>
        <td>${employees[i].email}</td>
        <td>${employees[i].salary}</td>
        <td>${employees[i].resuit}  /10</td>
        <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="update(${i})" class="btn btn-warning">Updata</button></td>
        </tr>
        `
    }
    document.getElementById("tablebody").innerHTML = trs;
}
//reset form
function resetForm() {
    for (var i = 0; i < Inputs.length; i++) {
        Inputs[i].value = "";
    }
}
//delete employees
function deleteEmployee(index) {
    employees.splice(index, 1)
    disPlayData();
    localStorage.setItem("empolyeesList", JSON.stringify(employees))
}
//update employees
function update(index) {
    mainIndex = index;
    addBtn.innerHTML = "Edit";
    nameInput.value = employees[index].name;
    ageInput.value = employees[index].age;
    phoneInput.value = employees[index].phone;
    salaryInput.value = employees[index].salary;
    emailInput.value = employees[index].email;
    resuitInput.value = employees[index].resuit;
}
function chackForm() {
    if (addBtn.innerHTML == "Submit") {
        addEmployee()
    }
    else {
        addBtn.innerHTML = "Submit";
        let employee = {
            name: nameInput.value,
            age: ageInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            salary: salaryInput.value,
            resuit: resuitInput.value,
        }
        employees.splice(mainIndex, 1, employee);
    }
    localStorage.setItem("empolyeesList", JSON.stringify(employees));
}
function search(searchTxt) {
    var trs = "";
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].name.toLowerCase().includes(searchTxt.toLowerCase())) {
            trs += `
                <tr>
                <td>${employees[i].name}</td>
                <td>${employees[i].age}</td>
                <td>${employees[i].phone}</td>
                <td>${employees[i].email}</td>
                <td>${employees[i].salary}</td>
                <td>${employees[i].resuit}  /10</td>
                <td><button onclick="deleteEmployee(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="update(${i})" class="btn btn-warning">Updata</button></td>
                </tr>
                `
        }
        document.getElementById("tablebody").innerHTML = trs;
    }
}

//{validation}
function validationName() {
    let nameRejex = /^[A-Z|a-z|0-9][^.]{4,20}$/;
    if (!nameRejex.test(nameInput.value)) {
        $(".name").slideDown(500);
        $("#name").addClass("is-invalid");
        return false

    }
    else {
        $(".name").slideUp(500);
        $("#name").removeClass("is-invalid");
        return true;
    }
}
function validationAge() {
    let ageRejex = /^[0-9][^.]{1}$/;
    if (!ageRejex.test(ageInput.value)) {
        $(".age").slideDown(500);
        $("#age").addClass("is-invalid");
        return false
    }
    else {
        $(".age").slideUp(500);
        $("#age").removeClass("is-invalid");
        return true;
    }
}
function validationPhone() {
    let phoneRejex = /^[011|012|015|010][^.][0-9]{9}$/;
    if (!phoneRejex.test(phoneInput.value)) {
        $(".phone").slideDown(500);
        $("#phone").addClass("is-invalid");
        return false
    }
    else {
        $(".phone").slideUp(500);
        $("#phone").removeClass("is-invalid");
        return true;
    }
}
function validationsalary() {
    let salaryRejex = /^[0-9]{1,4}$/;
    if (!salaryRejex.test(salaryInput.value)) {
        $(".salary").slideDown(500);
        $("#salary").addClass("is-invalid");
        return false
    }
    else {
        $(".salary").slideUp(500);
        $("#salary").removeClass("is-invalid");
        return true;
    }
}
function validationemail() {
    let emailRejex = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[com]{3,}))$/
    if (!emailRejex.test(emailInput.value)) {
        $(".email").slideDown(500);
        $("#email").addClass("is-invalid");
    }
    else {
        $(".email").slideUp(500);
        $("#email").removeClass("is-invalid");
        return true;
    }
}
function validationresuit() {
    let resuitRejex = /^[0-9][0]{0,1}$/;
    if (!resuitRejex.test(resuitInput.value)) {
        $(".resuit").slideDown(500);
        $("#resuit").addClass("is-invalid");
        return false
    }
    else {
        $(".resuit").slideUp(500);
        $("#resuit").removeClass("is-invalid");
        return true;
    }
}
nameInput.onkeyup = () => validationName()
ageInput.onkeyup = () => validationAge()
phoneInput.onkeyup = () => validationPhone()
salaryInput.onkeyup = () => validationsalary()
emailInput.onkeyup = () => validationemail()
resuitInput.onkeyup = () => validationresuit()

// function func1(event) {
//     alert("DIV 1");
//     event.stopPropagation();
// }

// $('addBtn[type!=submit]').click(function nnn(e) {
//     console.log("llll")
//     e.stopPropagation();
// })
// vvv.onclick = function (e) {
//     addBtn = '[type!=submit]'
//     e.stopPropagation();
//     console.log("mk")
// }

// function nnn(e) {
//     addBtn[type != submit]
//     e.stopPropagation();
// }