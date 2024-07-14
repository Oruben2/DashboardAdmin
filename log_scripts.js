const logData = [
    {id: 1, datetime: '2024-07-09 12:34:56', movement: 'Inicio de sesión', user: 'usuario1'},
    {id: 2, datetime: '2024-07-09 13:45:12', movement: 'Creación de un usuario', user: 'admin'},
    {id: 3, datetime: '2024-07-10 09:22:34', movement: 'Inicio de sesión', user: 'usuario2'},
    {id: 4, datetime: '2024-07-10 11:14:20', movement: 'Eliminación de producto', user: 'admin'},
    {id: 5, datetime: '2024-07-11 08:55:45', movement: 'Se creó una reseña', user: 'usuario3'},
    // Más datos estáticos o cargados dinámicamente
];

let currentPage = 1;
const rowsPerPage = 10;

function displayTable(data) {
    const table = document.getElementById('logTable');
    table.innerHTML = '';

    data.forEach(log => {
        const row = table.insertRow();
        row.insertCell(0).textContent = log.id;
        row.insertCell(1).textContent = log.datetime;
        row.insertCell(2).textContent = log.movement;
        row.insertCell(3).textContent = log.user;
    });
}

function setupPagination(data) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    const pageCount = Math.ceil(data.length / rowsPerPage);
    
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mx-1');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderTable(data);
        });
        pagination.appendChild(button);
    }
}

function renderTable(data) {
    const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(start, start + rowsPerPage);
    displayTable(paginatedData);
}

function sortTable(columnIndex) {
    const sortedData = [...logData].sort((a, b) => {
        const columnA = Object.values(a)[columnIndex].toString();
        const columnB = Object.values(b)[columnIndex].toString();
        return columnA.localeCompare(columnB);
    });
    renderTable(sortedData);
    setupPagination(sortedData);
}

function searchTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = logData.filter(log => {
        return Object.values(log).some(value => value.toString().toLowerCase().includes(input));
    });
    renderTable(filteredData);
    setupPagination(filteredData);
}

document.getElementById('searchInput').addEventListener('input', searchTable);

// Inicializar la tabla y la paginación con todos los datos
renderTable(logData);
setupPagination(logData);