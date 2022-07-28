var selectedRow = null;

// show alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);

}

//Clear all the fields
function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#employeeNumber").value = "";
}

//Add data
document.querySelector("#employee-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    //get form values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const employeeNumber = document.querySelector("#employeeNumber").value;

    //validation
    if(firstName == "" || lastName == "" || employeeNumber == ""){
        showAlert("Please fill in all the empty fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#employee-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${employeeNumber}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Employee Added Successfully", "success");
        }
        else{
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = employeeNumber;
            selectedRow = null;
            showAlert("Employee Details Edited", "info");
        }
        clearFields();
    }
});

//update data
document.querySelector("#employee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value =  selectedRow.children[0].textContent ;
        document.querySelector("#lastName").value =  selectedRow.children[1].textContent ;
        document.querySelector("#employeeNumber").value =  selectedRow.children[2].textContent ;
    }
});

//delete data

document.querySelector("#employee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Employee Data Deleted", "danger");
    }
});