let sales = JSON.parse(localStorage.getItem("sales")) || [];
var no = 1
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {

    event.preventDefault();
    const sale = {
        number: no,
        date: document.getElementById("Date").value,
        name: document.getElementById("Name").value,
        item: document.getElementById("Item").value,
        quantity: Number(document.getElementById("Quantity").value),
        price: parseFloat(document.getElementById("Price").value),
        discount: parseFloat(document.getElementById("Discount").value) || 0

    }
    if (isNaN(sale.price) || isNaN(sale.quantity) || sale.item.trim() === "" || sale.date.trim() === "") {
        alert("Please fill in all fields with valid information.");
        return;
    }
    sale.total = sale.quantity * sale.price - sale.discount;
    sales.push(sale);
    localStorage.setItem("sales", JSON.stringify(sales));
    let reset  = document.getElementById("reset");
    reset.addEventListener("click", function() {
        form.reset;
    });
    
    makeTable();    
});

console.log(sales);



function makeTable(){
    no++;
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";
    sales.forEach(sale => {
        tbody.innerHTML += `
        <tr>
            <td>${sale.number}</td>
            <td>${sale.date}</td>
            <td>${sale.name}</td>
            <td>${sale.item}</td>
            <td>${sale.quantity}</td>
            <td>${sale.price.toFixed(2)}</td>
            <td>${sale.discount || 0}</td>
            <td>${sale.total.toFixed(2)}</td>
        </tr>
        `
    })

}

function deleteTable() {
    const input = prompt("Enter the number of the sale you want to delete:");
    if (input === null) return;

    const rowNumber = parseInt(input, 10);
    if (isNaN(rowNumber)) {
        alert("Please enter a valid number.");
        return;
    }

    const index = sales.findIndex(sale => sale.number === rowNumber);
    if (index === -1) {
        alert(`No sale found with number ${rowNumber}.`);
        return;
    }

    const confirmDelete = confirm(`Delete sale number ${rowNumber}?`);
    if (!confirmDelete) return;

    sales.splice(index, 1);
    sales.forEach((sale, i) => {
        sale.number = i + 1;
    });

    no = sales.length + 1;
    localStorage.setItem("sales", JSON.stringify(sales));
    makeTable();
}

function clearSales() {
    alert("Are you sure you want to clear all sales? This action cannot be undone.");
    sales = [];
    localStorage.removeItem("sales");
    makeTable();
    no = 1;
}
   

makeTable();

function exportExcel(){

    const worksheet = XLSX.utils.json_to_sheet(sales);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");

    XLSX.writeFile(workbook, "SalesJournal.xlsx");

}


