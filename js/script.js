window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';


    const addButton = document.querySelectorAll('button')[0];
    const removeButton = document.querySelectorAll('button')[1];
    const inputs2 = document.querySelectorAll('.form2 input');
    const table2 = document.querySelectorAll('table')[2];


    function addRow(table, inputs, n){        
        
        let rowsAmount = table.querySelectorAll('tr').length;
        let lastRow = table.querySelectorAll('.total td');
        let newRow = table.insertRow(rowsAmount-1);
        let newCells = [];

                
        if (rowsAmount < 34) {
            //сделаем пустую строку
            const createRow = function(){
                for (let i = 0; i < lastRow.length; i++){
                    newCells[i] = newRow.insertCell(-1);
                }
            };
            createRow();

            //заполниv новую строку данными из инпутов и рассчетами
            let fillRow = ()=> {
                let cursor = 0;

                if (n === 1){

                }

                //заполняем строку второй таблицы
                if (n === 2) {
                    for (let i = 0; i < lastRow.length; i++){
                        
                        //порядковый номер строки в первую ячейку
                        if (i == 0){
                            newCells[i].textContent = rowsAmount - 2;
                            continue;
                        }

                        //в каждую третью - рассчет из того, что находится в двух предыдущих
                        else if (i % 3 == 0){
                            newCells[i].textContent = 
                                    (newCells[i-1].textContent / newCells[i-2].textContent)*100;
                            continue;
                        }
                        newCells[i].textContent = inputs[cursor].value;
                        cursor++;
                    }
                }
            };
            fillRow(inputs);
        }

        else {
            alert('Невозможно добавить более 31 строки');
        }
        
    }

    function calculateTotals(table){
        const lastRow = table.querySelectorAll('.total td');
        let value = 0;
        
        for (let i = 1; i < lastRow.length; i++){
            for (let j = 2; j < table.rows.length-1; j++){
                value += +(table.rows[j].cells[i].textContent);
            }
            lastRow[i].textContent = value;
            value=0;
        }
    }

    calculateTotals(table2);

    document.querySelectorAll('button')[2].addEventListener('click', () =>{
        calculateTotals(table2);
    });

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
        addRow(table2, inputs2, 2);
        calculateTotals(table2);
    });

    removeButton.addEventListener('click', ()=> {
        removeRow(table2);
        calculateTotals(table2);        
    });
    
});