/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.task1 = function task1() {\n  var xhr = new XMLHttpRequest();\n  xhr.open('GET', 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json', true);\n  xhr.send();\n\n  xhr.onreadystatechange = function () {\n    // (3)\n    if (xhr.readyState != 4) return;\n\n    if (xhr.status != 200) {\n      alert(xhr.status + ': ' + xhr.statusText);\n    } else {\n      console.log(xhr.responseText);\n    }\n  };\n};\n\nwindow.task2 = function task2() {\n  var xhr = new XMLHttpRequest();\n  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/data.json', true);\n  xhr.send();\n\n  xhr.onreadystatechange = function () {\n    // (3)\n    if (xhr.readyState != 4) return;\n\n    if (xhr.status != 200) {\n      alert(xhr.status + ': ' + xhr.statusText);\n    } else {\n      var createCard = function createCard(parentElem, human) {\n        var divElem = document.createElement(\"div\");\n        divElem.setAttribute(\"class\", \"card\");\n        var nameElem = document.createElement(\"div\");\n        nameElem.innerText = human.name;\n        nameElem.setAttribute(\"class\", \"card-item card-name\");\n        var sexElem = document.createElement(\"div\");\n        sexElem.setAttribute(\"class\", \"card-item card-sex\");\n\n        if (human['sex'] === \"m\") {\n          sexElem.innerText = \"man\";\n        } else {\n          sexElem.innerText = \"woman\";\n        }\n\n        var agesElem = document.createElement(\"div\");\n        agesElem.innerText = human['born'] + \" - \" + human.died;\n        agesElem.setAttribute(\"class\", \"card-item card-age\");\n        var fatherElem = document.createElement(\"div\");\n        fatherElem.innerText = \"Father: \" + human.father;\n        fatherElem.setAttribute(\"class\", \"card-item card-father\");\n        var motherElem = document.createElement(\"div\");\n        motherElem.innerText = \"Mother: \" + human.mother;\n        motherElem.setAttribute(\"class\", \"card-item card-mother\");\n        divElem.appendChild(nameElem);\n        divElem.appendChild(sexElem);\n        divElem.appendChild(agesElem);\n        divElem.appendChild(fatherElem);\n        divElem.appendChild(motherElem);\n        parentElem.appendChild(divElem);\n      };\n\n      var createCards = function createCards() {\n        var divElem = document.createElement(\"div\");\n        divElem.setAttribute(\"class\", \"cards\");\n        ANCESTRY_FILE.forEach(function (elem) {\n          return createCard(divElem, elem);\n        });\n        document.body.appendChild(divElem);\n      };\n\n      var ANCESTRY_FILE = JSON.parse(xhr.responseText);\n      createCards();\n    }\n  };\n};\n\nwindow.task3 = function task3() {\n  var visitorsTable;\n  var xhr = new XMLHttpRequest();\n  xhr.open('GET', 'https://tanuhaua.github.io/datas-file-json/visitors.json', true);\n  xhr.send();\n\n  xhr.onreadystatechange = function () {\n    // (3)\n    if (xhr.readyState != 4) return;\n\n    function addClickListeners() {\n      var headers = document.getElementsByClassName('table__header');\n\n      var _loop = function _loop(i) {\n        headers[i].addEventListener('click', function () {\n          for (var j = 0; j < headers.length; j++) {\n            if (headers[j] !== headers[i]) {\n              headers[j].classList.remove('js-sort-asc');\n              headers[j].classList.remove('js-sort-desc');\n            }\n          }\n\n          if (headers[i].classList.contains('js-sort-asc')) {\n            headers[i].classList.remove('js-sort-asc');\n            headers[i].classList.add('js-sort-desc');\n            sortByKeyDesc(headers[i].id);\n          } else if (headers[i].classList.contains('js-sort-desc')) {\n            headers[i].classList.remove('js-sort-desc');\n            headers[i].classList.add('js-sort-asc');\n            sortByKeyAsc(headers[i].id);\n          } else {\n            headers[i].classList.add('js-sort-asc');\n            sortByKeyAsc(headers[i].id);\n          }\n\n          document.querySelectorAll('.table__row').forEach(function (elem) {\n            elem.remove();\n          }); // debugger;\n\n          fillTable(visitorsTable, document.getElementsByClassName('table')[0]);\n        });\n      };\n\n      for (var i = 0; i < headers.length; i++) {\n        _loop(i);\n      }\n    }\n\n    if (xhr.status != 200) {\n      alert(xhr.status + ': ' + xhr.statusText);\n    } else {\n      visitorsTable = JSON.parse(xhr.responseText);\n      sortByKeyAsc('id');\n      var tableElem = document.createElement('table');\n      tableElem.classList.add('table');\n      var rowElem = createHeaderRow();\n      tableElem.appendChild(rowElem);\n      fillTable(visitorsTable, tableElem);\n      document.body.appendChild(tableElem);\n      addClickListeners();\n    }\n  };\n\n  function sortByKeyAsc(key) {\n    visitorsTable.sort(function (a, b) {\n      if (a[key] > b[key]) {\n        return 1;\n      }\n\n      if (a[key] < b[key]) {\n        return -1;\n      }\n\n      return 0;\n    });\n  }\n\n  function sortByKeyDesc(key) {\n    visitorsTable.sort(function (a, b) {\n      if (a[key] < b[key]) {\n        return 1;\n      }\n\n      if (a[key] > b[key]) {\n        return -1;\n      }\n\n      return 0;\n    });\n  }\n};\n\nwindow.task4 = function task4() {\n  var counter = 1;\n  var visitorsObj;\n  var tableElem = document.getElementsByClassName('table')[0];\n  var rowElem = createHeaderRow();\n  tableElem.appendChild(rowElem);\n  sendRequest();\n  addClickListeners();\n\n  function sendRequest() {\n    var link = \"https://tanuhaua.github.io/datas-file-json/dynamic-loading/\".concat(counter, \"/users.json\");\n    var xhr = new XMLHttpRequest();\n    xhr.open('GET', link, true);\n    xhr.send();\n\n    xhr.onreadystatechange = function () {\n      // (3)\n      if (xhr.readyState != 4) return;\n\n      if (xhr.status != 200) {\n        alert(xhr.status + ': ' + xhr.statusText);\n      } else {\n        visitorsObj = JSON.parse(xhr.responseText);\n        counter = visitorsObj['page'] + 1;\n        fillTable(visitorsObj.data, tableElem);\n        updateBtn(document.getElementsByClassName('load-more__btn')[0]);\n      }\n    };\n  }\n\n  function addClickListeners() {\n    document.getElementsByClassName('load-more__btn')[0].addEventListener('click', sendRequest);\n  }\n\n  function updateBtn(btnElem) {\n    if (!visitorsObj['loadMore']) {\n      btnElem.disabled = true;\n    }\n  }\n};\n\nfunction createHeaderRow() {\n  var rowElem = document.createElement('tr');\n  rowElem.classList.add('table__headers');\n  var headerIdElem = createElement('th', 'table__header', 'Visitor id', 'id');\n  headerIdElem.classList.add('js-sort-asc');\n  var headerRegElem = createElement('th', 'table__header', 'Registration date', 'createdAt');\n  var headerNameElem = createElement('th', 'table__header', 'Name', 'name');\n  var headerEmailElem = createElement('th', 'table__header', 'Email', 'email');\n  var headerDescrElem = createElement('th', 'table__header', 'Description', 'description');\n  rowElem.appendChild(headerIdElem);\n  rowElem.appendChild(headerRegElem);\n  rowElem.appendChild(headerNameElem);\n  rowElem.appendChild(headerEmailElem);\n  rowElem.appendChild(headerDescrElem);\n  return rowElem;\n}\n\nfunction fillTable(arr, tableElem) {\n  arr.forEach(function (elem) {\n    var date = new Date(elem['createdAt']);\n    var rowElem = document.createElement('tr');\n    rowElem.classList.add('table__row');\n    var idElem = createElement('td', 'table__data', elem['id']);\n    var regElem = createElement('td', 'table__data', date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));\n    var nameElem = createElement('td', 'table__data', elem['name']);\n    var emailElem = createElement('td', 'table__data', elem['email']);\n    var descrElem = createElement('td', 'table__data', elem['description']);\n    rowElem.appendChild(idElem);\n    rowElem.appendChild(regElem);\n    rowElem.appendChild(nameElem);\n    rowElem.appendChild(emailElem);\n    rowElem.appendChild(descrElem);\n    tableElem.appendChild(rowElem);\n  });\n}\n\nfunction createElement(tagName, htmlClass, innerText, id) {\n  var elem = document.createElement(tagName);\n  elem.classList.add(htmlClass);\n  elem.innerText = innerText;\n  elem.id = id;\n  return elem;\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });