const data = [];

const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];
const dataForm = document.getElementById('data-form');

dataForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const fakultas = document.getElementById('fakultas').value;
    const prodi = document.getElementById('prodi').value;

    if (nama && nim && fakultas && prodi) {
        const newData = {
            id: data.length + 1,
            nama: nama,
            nim: nim,
            fakultas: fakultas,
            prodi: prodi
        };

        data.push(newData);
        renderData();

        dataForm.reset();
    }
});

function renderData() {
    dataTable.innerHTML = '';

    data.forEach((item, index) => {
        const row = dataTable.insertRow();

        const idCell = row.insertCell();
        const namaCell = row.insertCell();
        const nimCell = row.insertCell();
        const fakultasCell = row.insertCell();
        const prodiCell = row.insertCell();
        const actionsCell = row.insertCell();

        idCell.textContent = item.id;
        namaCell.textContent = item.nama;
        nimCell.textContent = item.nim;
        fakultasCell.textContent = item.fakultas;
        prodiCell.textContent = item.prodi;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            editData(item.id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteData(item.id);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

function editData(id) {
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        const row = dataTable.rows[index];

        row.classList.add('editing');
        row.cells[1].innerHTML = '<input type="text" value="' + data[index].nama + '">';
        row.cells[2].innerHTML = '<input type="text" value="' + data[index].nim + '">';
        row.cells[3].innerHTML = '<input type="text" value="' + data[index].fakultas + '">';
        row.cells[4].innerHTML = '<input type="text" value="' + data[index].prodi + '">';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('save-button');
        saveButton.addEventListener('click', () => {
            data[index].nama = row.cells[1].querySelector('input').value;
            data[index].nim = row.cells[2].querySelector('input').value;
            data[index].fakultas = row.cells[3].querySelector('input').value;
            data[index].prodi = row.cells[4].querySelector('input').value;

            row.classList.remove('editing');

            renderData();
        });

        row.cells[5].innerHTML = '';
        row.cells[5].appendChild(saveButton);
    }
}

function deleteData(id) {
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        data.splice(index, 1);
        renderData();
    }
}

renderData();
