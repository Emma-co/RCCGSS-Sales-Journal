let sales = JSON.parse(localStorage.getItem("sales")) || [];

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const sale = {
        date: document.getElementById("Date").value,
        name: document.getElementById("Name").value,
        item: document.getElementById("Item").value,
        quantity: Number(document.getElementById("Quantity").value),
        price: parseFloat(document.getElementById("Price").value)

    }
    if (isNaN(sale.price) || isNaN(sale.quantity) || sale.item.trim() === "" || sale.date.trim() === "") {
        alert("Please fill in all fields with valid information.");
        return;
    }
    sale.total = sale.quantity * sale.price;
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
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";
    sales.forEach(sale => {
        tbody.innerHTML += `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.name}</td>
            <td>${sale.item}</td>
            <td>${sale.quantity}</td>
            <td>${sale.price.toFixed(2)}</td>
            <td>${sale.total.toFixed(2)}</td>
        </tr>
        `
    })

}

function clearSales() {
    alert("Are you sure you want to clear all sales? This action cannot be undone.");
    sales = [];
    localStorage.removeItem("sales");
    makeTable();
}
   

makeTable();

function exportExcel(){

    const worksheet = XLSX.utils.json_to_sheet(sales);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");

    XLSX.writeFile(workbook, "SalesJournal.xlsx");

}


