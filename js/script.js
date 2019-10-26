window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';


    const addButton = document.querySelectorAll('button')[0];
    const removeButton = document.querySelectorAll('button')[1];

    const table2 = document.querySelectorAll('table')[2];

    function addRow(table){
        
        
        let rowsAmount = table.querySelectorAll('tr').length;
        let cellsAmount = table.querySelectorAll('tr:last-child td').length;
        let newRow = table.insertRow(rowsAmount-1);
        
        if (rowsAmount < 34) {
            for (let i = 0; i < cellsAmount; i++){
                newRow.insertCell(-1).innerHTML = (rowsAmount-2);
            }
        }

        else {
            alert('Невозможно добавить более 31 строки');
        }
        
    }

    function removeRow(table) {
        let rows = table.rows;
        let rowIndex = rows.length -2;
        if (rows.length > 3) {
            table.deleteRow(rowIndex);
        }
        else {
            alert ('Невозможно удалить: таблица пуста');
        }
    }

    addButton.addEventListener('click', ()=> {
        addRow(table2);
    });

    removeButton.addEventListener('click', ()=> {
        removeRow(table2);
    });
    
});