window.task1 = function task1() {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.responseText);
    }
  };
};

window.task2 = function task2() {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/data.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      let ANCESTRY_FILE = JSON.parse(xhr.responseText);

      createCards();

      function createCard(parentElem, human) {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "card");

        let nameElem = document.createElement("div");
        nameElem.innerText = human.name;
        nameElem.setAttribute("class", "card-item card-name");
        let sexElem = document.createElement("div");
        sexElem.setAttribute("class", "card-item card-sex");

        if (human.sex === "m") {
          sexElem.innerText = "man";
        } else {
          sexElem.innerText = "woman";
        }

        let agesElem = document.createElement("div");
        agesElem.innerText = human.born + " - " + human.died;
        agesElem.setAttribute("class", "card-item card-age");
        let fatherElem = document.createElement("div");
        fatherElem.innerText = "Father: " + human.father;
        fatherElem.setAttribute("class", "card-item card-father");
        let motherElem = document.createElement("div");
        motherElem.innerText = "Mother: " + human.mother;
        motherElem.setAttribute("class", "card-item card-mother");

        divElem.appendChild(nameElem);
        divElem.appendChild(sexElem);
        divElem.appendChild(agesElem);
        divElem.appendChild(fatherElem);
        divElem.appendChild(motherElem);

        parentElem.appendChild(divElem);
      }

      function createCards() {
        let divElem = document.createElement("div");
        divElem.setAttribute("class", "cards");

        ANCESTRY_FILE.forEach(elem => createCard(divElem, elem));

        document.body.appendChild(divElem);
      }
    }
  };
};

window.task3 = function task3() {
  let visitorsTable;
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/visitors.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState != 4) return;

    function addClickListeners() {
      let headers = document.getElementsByClassName('table__header');

      for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', () => {

          for (let j = 0; j < headers.length; j++) {
            if (headers[j] !== headers[i]) {
              headers[j].classList.remove('js-sort-asc');
              headers[j].classList.remove('js-sort-desc');
            }
          }

          if (headers[i].classList.contains('js-sort-asc')) {
            headers[i].classList.remove('js-sort-asc');
            headers[i].classList.add('js-sort-desc');
            sortByKeyDesc(headers[i].id);
          } else if (headers[i].classList.contains('js-sort-desc')) {
            headers[i].classList.remove('js-sort-desc');
            headers[i].classList.add('js-sort-asc');
            sortByKeyAsc(headers[i].id);
          } else {
            headers[i].classList.add('js-sort-asc');
            sortByKeyAsc(headers[i].id);
          }

          document.querySelectorAll('.table__row').forEach(elem => {
            elem.remove();
          });

          // debugger;
          fillTable(visitorsTable, document.getElementsByClassName('table')[0]);
        });
      }
    }

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      visitorsTable = JSON.parse(xhr.responseText);
      sortByKeyAsc('id');

      let tableElem = document.createElement('table');
      tableElem.classList.add('table');

      let rowElem = createHeaderRow();

      tableElem.appendChild(rowElem);
      fillTable(visitorsTable, tableElem);

      document.body.appendChild(tableElem);

      addClickListeners();
    }
  };

  function sortByKeyAsc(key) {
    visitorsTable.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }

      return 0;
    });
  }

  function sortByKeyDesc(key) {
    visitorsTable.sort((a, b) => {
      if (a[key] < b[key]) {
        return 1;
      }
      if (a[key] > b[key]) {
        return -1;
      }

      return 0;
    });
  }
};

window.task4 = function task4() {
  let counter = 1;
  let visitorsObj;

  let tableElem = document.getElementsByClassName('table')[0];

  let rowElem = createHeaderRow();
  tableElem.appendChild(rowElem);

  sendRequest();

  addClickListeners();

  function sendRequest() {
    let link = `https://tanuhaua.github.io/datas-file-json/dynamic-loading/${counter}/users.json`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.send();
    xhr.onreadystatechange = function() { // (3)
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        visitorsObj = JSON.parse(xhr.responseText);
        counter = visitorsObj['page'] + 1;

        fillTable(visitorsObj.data, tableElem);

        updateBtn(document.getElementsByClassName('load-more__btn')[0]);
      }
    };
  }

  function addClickListeners() {
    document.getElementsByClassName('load-more__btn')[0].addEventListener('click', sendRequest);
  }

  function updateBtn(btnElem) {
    if (!visitorsObj['loadMore']) {
      btnElem.disabled = true;
    }
  }
};

function createHeaderRow() {
  let rowElem = document.createElement('tr');
  rowElem.classList.add('table__headers');

  let headerIdElem = createElement('th', 'table__header', 'Visitor id', 'id');
  headerIdElem.classList.add('js-sort-asc');

  let headerRegElem = createElement('th', 'table__header', 'Registration date', 'createdAt');
  let headerNameElem = createElement('th', 'table__header', 'Name', 'name');
  let headerEmailElem = createElement('th', 'table__header', 'Email', 'email');
  let headerDescrElem = createElement('th', 'table__header', 'Description', 'description');

  rowElem.appendChild(headerIdElem);
  rowElem.appendChild(headerRegElem);
  rowElem.appendChild(headerNameElem);
  rowElem.appendChild(headerEmailElem);
  rowElem.appendChild(headerDescrElem);

  return rowElem;
}

function fillTable(arr, tableElem) {
  arr.forEach((elem) => {
    let date = new Date(elem['createdAt']);
    let rowElem = document.createElement('tr');
    rowElem.classList.add('table__row');

    let idElem = createElement('td', 'table__data', elem['id']);
    let regElem = createElement('td', 'table__data',
      date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
    let nameElem = createElement('td', 'table__data', elem['name']);
    let emailElem = createElement('td', 'table__data', elem['email']);
    let descrElem = createElement('td', 'table__data', elem['description']);

    rowElem.appendChild(idElem);
    rowElem.appendChild(regElem);
    rowElem.appendChild(nameElem);
    rowElem.appendChild(emailElem);
    rowElem.appendChild(descrElem);

    tableElem.appendChild(rowElem);
  });
}

function createElement(tagName, htmlClass, innerText, id) {
  let elem = document.createElement(tagName);
  elem.classList.add(htmlClass);
  elem.innerText = innerText;
  elem.id = id;

  return elem;
}