window.addEventListener('DOMContentLoaded', ()=> {
    'use strict';

    const addButton1 = document.querySelectorAll('button')[0];
    const removeButton1 = document.querySelectorAll('button')[1];
    const addButton2 = document.querySelectorAll('button')[2];
    const removeButton2 = document.querySelectorAll('button')[3];
    const inputs1 = document.querySelectorAll('.form1 input');
    const inputs2 = document.querySelectorAll('.form2 input');
    const table1 = document.querySelectorAll('table')[1];
    const table2 = document.querySelectorAll('table')[2];


    function addRow(table, inputs, n){        
        
        let rowsAmount = table.querySelectorAll('tr').length;
        let lastRow = table.querySelectorAll('.total td');
        let newRow = table.insertRow(rowsAmount-1);
        let newCells = [];

                
        if (rowsAmount < 34+n) {
            //сделаем пустую строку
            let createRow = function(){
                for (let i = 0; i < lastRow.length; i++){
                    newCells[i] = newRow.insertCell(-1);
                }
            };
            createRow();

            //заполним новую строку данными из инпутов и рассчетами
            let fillRow = ()=> {
                let cursor = 0;

                //для первой таблицы
                if (n === 1){
                    for (let i = 0; i < lastRow.length; i++){
                        
                        if (i === 0){
                            newCells[i].textContent = rowsAmount - 3;
                            continue;
                        }

                        else if (i === 4 || i === 7){
                            newCells[i].textContent = 
                                    +newCells[i-1].textContent + (+newCells[i-2].textContent);
                            continue;
                        }

                        else if (i === 13){
                            newCells[i].textContent = 
                                (+newCells[i-1].textContent) + 
                                (+newCells[i-2].textContent) + 
                                (+newCells[i-3].textContent) +
                                (+newCells[i-4].textContent);
                            continue;
                        }

                        newCells[i].textContent = inputs[cursor].value;
                        cursor++;
                    }
                }

                //заполняем строку второй таблицы
                if (n === 0) {
                    for (let i = 0; i < lastRow.length; i++){
                        
                        //порядковый номер строки в первую ячейку
                        if (i === 0){
                            newCells[i].textContent = rowsAmount - 2;
                            continue;
                        }

                        else if (i % 3 === 0){
                            //избегаем деления на ноль
                            if (newCells[i-2].textContent <= 0) { 
                                newCells[i].textContent = 0;
                            } else {
                                newCells[i].textContent = 
                                        (newCells[i-1].textContent / newCells[i-2].textContent)*100;
                            }
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

    function calculateTotals(table, n){
        const lastRow = table.querySelectorAll('.total td');
        let value = 0;
        
        for (let i = 1; i < lastRow.length; i++){
            for (let j = 2+n; j < table.rows.length-1; j++){
                value += +(table.rows[j].cells[i].textContent);
            }
            lastRow[i].textContent = value;
            value=0;
        }
    }

    calculateTotals(table1, 1);
    calculateTotals(table2, 0);

    function removeRow(table) {
        let rows = table.rows;
        let rowIndex = rows.length -2;
        table.deleteRow(rowIndex);
    }

    function checkRows(){
        removeButton1.disabled = false;
        removeButton2.disabled = false;
        if (table1.rows.length < 5){
            removeButton1.disabled = true;
        }
        if (table2.rows.length < 4){
            removeButton2.disabled = true;
        }
    }
    checkRows();

    addButton1.addEventListener('click', ()=> {
        addRow(table1, inputs1, 1);
        calculateTotals(table1, 1);
        checkRows();
    });

    removeButton1.addEventListener('click', ()=> {
        removeRow(table1);
        calculateTotals(table2, 1);
        checkRows();
    });
    

    addButton2.addEventListener('click', ()=> {
        addRow(table2, inputs2, 0);
        calculateTotals(table2, 0);
        checkRows();
    });

    removeButton2.addEventListener('click', ()=> {
        removeRow(table2);
        calculateTotals(table2, 0);
        checkRows();
    });
    
});