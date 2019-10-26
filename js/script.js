window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';


    const addButton = document.querySelectorAll('button')[0];
    const removeButton = document.querySelectorAll('button')[1];
    const inputs2 = document.querySelectorAll('.form2 input');
    const table2 = document.querySelectorAll('table')[2];

    function addRow(table, inputs){
        
        
        let rowsAmount = table.querySelectorAll('tr').length;
        let cellsAmount = table.querySelectorAll('tr:last-child td').length;
        let newRow = table.insertRow(rowsAmount-1);
        let newCells = [];

        if (rowsAmount < 34) {
            let cursor = 0;
            for (let i = 0; i < cellsAmount; i++){
                newCells[i] = newRow.insertCell(-1);
                if (i == 0){
                    newCells[i].textContent = rowsAmount - 2;
                    continue;
                }
                else if (i % 3 == 0){
                    newCells[i].textContent = 
                        (newCells[i-1].textContent / newCells[i-2].textContent) *100;
                    continue;
                }

                newCells[i].textContent = inputs[cursor].value;
                cursor++;
                console.log(i);
                console.log(newCells[i].textContent);
            }



            //newCells[0].textContent = rowsAmount - 2;
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
        addRow(table2, inputs2);
    });

    removeButton.addEventListener('click', ()=> {
        removeRow(table2);
    });
    
});