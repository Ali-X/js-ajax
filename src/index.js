window.task1 = function task1() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) return;

    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.responseText);
    }
  };
};

window.task2 = function task2() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/data.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) return;

    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      const ANCESTRY_FILE = JSON.parse(xhr.responseText);

      createCards();

      function createCard(parentElem, human) {
        const divElem = document.createElement("div");
        divElem.setAttribute("class", "card");

        const nameElem = document.createElement("div");
        nameElem.innerText = human.name;
        nameElem.setAttribute("class", "card-item card-name");
        const sexElem = document.createElement("div");
        sexElem.setAttribute("class", "card-item card-sex");

        if (human['sex'] === "m") {
          sexElem.innerText = "man";
        } else {
          sexElem.innerText = "woman";
        }

        const agesElem = document.createElement("div");
        agesElem.innerText = human['born'] + " - " + human['died'];
        agesElem.setAttribute("class", "card-item card-age");
        const fatherElem = document.createElement("div");
        fatherElem.innerText = "Father: " + human['father'];
        fatherElem.setAttribute("class", "card-item card-father");
        const motherElem = document.createElement("div");
        motherElem.innerText = "Mother: " + human['mother'];
        motherElem.setAttribute("class", "card-item card-mother");

        divElem.appendChild(nameElem);
        divElem.appendChild(sexElem);
        divElem.appendChild(agesElem);
        divElem.appendChild(fatherElem);
        divElem.appendChild(motherElem);

        parentElem.appendChild(divElem);
      }

      function createCards() {
        const divElem = document.createElement("div");
        divElem.setAttribute("class", "cards");

        ANCESTRY_FILE.forEach(elem => createCard(divElem, elem));

        document.body.appendChild(divElem);
      }
    }
  };
};

window.task3 = function task3() {
  let visitorsTable;
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/visitors.json', true);

  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) return;

    function addClickListeners() {
      const headers = document.getElementsByClassName('table__header');

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

    if (xhr.status !== 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      visitorsTable = JSON.parse(xhr.responseText);
      sortByKeyAsc('id');

      const tableElem = document.createElement('table');
      tableElem.classList.add('table');

      const rowElem = createHeaderRow();

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

  const tableElem = document.getElementsByClassName('table')[0];

  const rowElem = createHeaderRow();
  tableElem.appendChild(rowElem);

  sendRequest();

  addClickListeners();

  function sendRequest() {
    const link = `https://tanuhaua.github.io/datas-file-json/dynamic-loading/${counter}/users.json`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.send();
    xhr.onreadystatechange = function() { // (3)
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
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
  const rowElem = document.createElement('tr');
  rowElem.classList.add('table__headers');

  const headerIdElem = createElement('th', 'table__header', 'Visitor id', 'id');
  headerIdElem.classList.add('js-sort-asc');

  const headerRegElem = createElement('th', 'table__header', 'Registration date', 'createdAt');
  const headerNameElem = createElement('th', 'table__header', 'Name', 'name');
  const headerEmailElem = createElement('th', 'table__header', 'Email', 'email');
  const headerDescrElem = createElement('th', 'table__header', 'Description', 'description');

  rowElem.appendChild(headerIdElem);
  rowElem.appendChild(headerRegElem);
  rowElem.appendChild(headerNameElem);
  rowElem.appendChild(headerEmailElem);
  rowElem.appendChild(headerDescrElem);

  return rowElem;
}

function fillTable(arr, tableElem) {
  arr.forEach((elem) => {
    const date = new Date(elem['createdAt']);
    const rowElem = document.createElement('tr');
    rowElem.classList.add('table__row');

    const idElem = createElement('td', 'table__data', elem['id']);
    const regElem = createElement('td', 'table__data',
      date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
    const nameElem = createElement('td', 'table__data', elem['name']);
    const emailElem = createElement('td', 'table__data', elem['email']);
    const descrElem = createElement('td', 'table__data', elem['description']);

    rowElem.appendChild(idElem);
    rowElem.appendChild(regElem);
    rowElem.appendChild(nameElem);
    rowElem.appendChild(emailElem);
    rowElem.appendChild(descrElem);

    tableElem.appendChild(rowElem);
  });
}

function createElement(tagName, htmlClass, innerText, id) {
  const elem = document.createElement(tagName);
  elem.classList.add(htmlClass);
  elem.innerText = innerText;
  elem.id = id;

  return elem;
}