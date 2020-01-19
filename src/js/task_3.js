"use strict";

// Задание 3:

// Нужно создать страницу, на которой будет таблица с полями:
// 1) №
// 2) Name
// 3) E-mail
// 4) Age

// и какими-то произвольными данными.
// Нужно сделать таблицу сортируемой с использованием только VueJS, без плагинов и других библиотек.
// Пример: https://mdbootstrap.com/docs/jquery/tables/sort/

function sortTable(table) {

  function renderTable(sortedData) {
    [...table.querySelectorAll("tr")].forEach(tr => {
      [...tr.querySelectorAll("td")].forEach(td => {
        td.parentElement.remove();
      });
    });
  
    sortedData.forEach(DataTr => {
      const tr = document.createElement("tr");
  
      for(let key in DataTr) {
        const td = document.createElement("td");
        td.innerHTML = DataTr[key];
        tr.append(td);
      }
  
      table.append(tr);
    });
  }

  const sortDataFlags = {
    s: -1,
    m: 1,
  };

  function sortData(inputData) {
    if(inputData.clickSameColumn) {
      [sortDataFlags.m, sortDataFlags.s] = [sortDataFlags.s, sortDataFlags.m];
    } else {
      sortDataFlags.s = -1;
      sortDataFlags.m = 1;
    }
  
    return inputData.tableData.sort((b, a) => {
      if(isFinite(a[inputData.sortType]) && isFinite(b[inputData.sortType])) {
        return (Number(a[inputData.sortType]) > Number(b[inputData.sortType])) ? sortDataFlags.s : sortDataFlags.m;
      }
      return (a[inputData.sortType] > b[inputData.sortType]) ? sortDataFlags.s : sortDataFlags.m;
    });
  }

  function getTableData() {
    const keyTableData = [];
  
    [...table.querySelectorAll("th[data-sort]")].forEach(th => {
      keyTableData.push(th.dataset.sort);
    });
  
    const tableData = [];
  
    [...table.querySelectorAll("tr")].forEach(tr => {
      const objTrData = {};
      const td = tr.querySelectorAll("td");
  
      for(let index = 0; index < td.length; index++) {
        objTrData[keyTableData[index]] = td[index].innerHTML;
      }
      
      if(Object.keys(objTrData).length) tableData.push(objTrData);
    });
  
    return tableData;
  }

  function changeArrow(targetTh) {
    const targetArrow = targetTh.querySelector("span.arrow");
  
    if(targetArrow.classList.contains("arrow_top")) {
      targetArrow.classList.toggle("arrow_bottom");
      return true;
    }
  
    [...table.querySelectorAll("span.arrow")].forEach(arrow => {
      arrow.classList.remove("arrow_top");
      arrow.classList.remove("arrow_bottom");
    });
  
    targetArrow.classList.add("arrow_top");
  }

  function start(event) {
    const targetTh = event.target.closest("th[data-sort]");
    if(!targetTh || !table.contains(targetTh)) return;

    const sortedData = sortData({
      tableData: getTableData(),
      sortType: targetTh.dataset.sort, 
      clickSameColumn: changeArrow(targetTh),
    });
  
    renderTable(sortedData);
  }

  table.addEventListener("click", start);

  (function createArrow() {
    const tableTh = [...table.querySelectorAll("th[data-sort]")];

    class ValidationError extends Error {
      constructor(message) {
        super(message);
        this.name = "ValidationError";
      }
    }
    
    if(!tableTh.length) {
      throw new ValidationError("The table must have element 'th' with data attribute");
    }

    tableTh.forEach(th => {
      const span = document.createElement("span");
      span.classList.add("arrow");

      for(let item = 0; item < 2; item++) {
        const s = document.createElement("s");
        s.classList.add("arrow__item");
        span.append(s);
      }

      th.append(span);
    });

  }());
}

new sortTable(document.querySelector(".users-table"));
new sortTable(document.querySelector(".workers-table"));