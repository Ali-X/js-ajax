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

        for (let i = 0; i < ANCESTRY_FILE.length; i++) {
          createCard(divElem, ANCESTRY_FILE[i]);
        }

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

    function createHeaderRow() {
      let rowElem = document.createElement('tr');
      rowElem.classList.add('table__headers');

      let headerIdElem = document.createElement('th');
      headerIdElem.classList.add('table__header');
      headerIdElem.id = 'id';
      headerIdElem.innerText = 'Visitor id';

      let headerRegElem = document.createElement('th');
      headerRegElem.classList.add('table__header');
      headerRegElem.id = 'createdAt';
      headerRegElem.innerText = 'Registration date';

      let headerNameElem = document.createElement('th');
      headerNameElem.classList.add('table__header');
      headerNameElem.id = 'name';
      headerNameElem.innerText = 'Name';

      let headerEmailElem = document.createElement('th');
      headerEmailElem.classList.add('table__header');
      headerEmailElem.id = 'email';
      headerEmailElem.innerText = 'Email';

      let headerDescrElem = document.createElement('th');
      headerDescrElem.classList.add('table__header');
      headerDescrElem.id = 'description';
      headerDescrElem.innerText = 'Description';

      rowElem.appendChild(headerIdElem);
      rowElem.appendChild(headerRegElem);
      rowElem.appendChild(headerNameElem);
      rowElem.appendChild(headerEmailElem);
      rowElem.appendChild(headerDescrElem);
      return rowElem;
    }

    function fillTable(tableElem) {
      visitorsTable.forEach((elem) => {
        let rowElem = document.createElement('tr');
        rowElem.classList.add('table__row');

        let headerIdElem = document.createElement('th');
        headerIdElem.classList.add('table__data');
        headerIdElem.innerText = elem['id'];

        let headerRegElem = document.createElement('th');
        headerRegElem.classList.add('table__data');
        headerRegElem.innerText = elem['createdAt'];

        let headerNameElem = document.createElement('th');
        headerNameElem.classList.add('table__data');
        headerNameElem.innerText = elem['name'];

        let headerEmailElem = document.createElement('th');
        headerEmailElem.classList.add('table__data');
        headerEmailElem.innerText = elem['email'];

        let headerDescrElem = document.createElement('th');
        headerDescrElem.classList.add('table__data');
        headerDescrElem.innerText = elem['description'];

        rowElem.appendChild(headerIdElem);
        rowElem.appendChild(headerRegElem);
        rowElem.appendChild(headerNameElem);
        rowElem.appendChild(headerEmailElem);
        rowElem.appendChild(headerDescrElem);

        tableElem.appendChild(rowElem);
      });
    }

    function addClickListeners() {
      let headers = document.getElementsByClassName('table__header');

      for (let i = 0; i < headers.length; i++) {
        headers[i].addEventListener('click', () => {
          sortByKey(headers[i].id);

          document.querySelectorAll('.table__row').forEach(elem => {
            elem.remove();
          });

          // debugger;
          fillTable(document.getElementsByClassName('table')[0]);
        })
      }
    }

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      visitorsTable = JSON.parse(xhr.responseText);
      sortByKey('id');

      let tableElem = document.createElement('table');
      tableElem.classList.add('table');

      let rowElem = createHeaderRow();

      tableElem.appendChild(rowElem);
      fillTable(tableElem);

      document.body.appendChild(tableElem);

      addClickListeners();
    }
  };

  function sortByKey(key) {
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
};