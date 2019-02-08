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