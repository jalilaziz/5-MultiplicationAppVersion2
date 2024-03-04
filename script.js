// ****************** 2 *********************

// let input = document.querySelectorAll("inputNumber"); 
// let numSelect = document.querySelectorAll("select");

let firstRow = document.querySelectorAll(".firstrow");
let secondRow = document.querySelectorAll(".secondrow");
let result = document.getElementById("result");
let history = document.getElementById("history");
let btnResult = document.getElementById("btnresult");

firstRowNum = 0;
firstRow.forEach(bt => {
    bt.addEventListener("click", (e) => {
        firstRowNum = e.target.innerHTML
    })
})

secondRowNum = 0;
secondRow.forEach(bt => {
    bt.addEventListener("click", (e) => {
        secondRowNum = e.target.innerHTML
    })
})

function populateButtons(rowId) {
    const row = document.getElementById(rowId);
    for (let i = 2; i <= 9; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => toggleSelection(rowId, i));
        row.appendChild(button);
    }
}

function toggleSelection(rowId, number) {
    const row = document.getElementById(rowId);
    const buttons = row.getElementsByTagName('button');

    Array.from(buttons).forEach(button => {
        if (button.textContent != number) {
            button.classList.remove("selected");
        }
    });

    const button = document.querySelector(`#${rowId} button:nth-child(${number - 1})`);
    button.classList.toggle("selected");
}

function getSelectedNumbers(rowId) {
    const selectedButton = document.querySelector(`#${rowId} button.selected`);
    return selectedButton ? [parseInt(selectedButton.textContent)] : [];
}

populateButtons("row1");
populateButtons("row2");

let obj = {}
if (localStorage.length > 0) {
    let localStorageData = JSON.parse(localStorage.getItem("data"))
    obj = { ...localStorageData }

    for (let n in obj) {
        history.innerHTML += `${n} = ${obj[n]} <button style="position:absolute;left:150px;box-shadow: 1px 1px 0px black;border-radius:7px;border:1px solid black;margin-left:20px;color:white;background-color:red;cursor:pointer;" id="deleteline" onclick="deleteLine()">X</button><br>`
    }
}

btnResult.addEventListener("click", () => {
    if (firstRowNum !== "" && secondRowNum !== "") {
        let r = +firstRowNum * +secondRowNum
        result.innerHTML = "Result: " + +firstRowNum + " * " +secondRowNum + " = " + r
        obj[`${firstRowNum} * ${secondRowNum}`] = r
        localStorage.setItem("data", JSON.stringify(obj))
        history.innerHTML += `${firstRowNum} * ${secondRowNum} = ${r} <button style="position:absolute;left:150px;box-shadow: 1px 1px 0px black;border-radius:7px;border:1px solid black;margin-left:20px;color:white;background-color:red;cursor:pointer;" id="deleteline" onclick="deleteLine()">X</button><br>`

    } else {
        alert("please enter a number")
    }
})

function deleteLine(key) {
    delete obj[key];
    localStorage.setItem("data", JSON.stringify(obj));
    refreshHistory();
}

function refreshHistory() {
    history.innerHTML = "";
    for (let n in obj) {
        history.innerHTML += `<div>${n} = ${obj[n]} <button style="position:fixed;left:150px;box-shadow: 1px 1px 0px black;border-radius:7px;border:1px solid black;margin-left:20px;color:white;background-color:red;cursor:pointer;" onclick="deleteLine('${n}')">X</button></div>`;
    }
}

function clearSession() {
    document.getElementById("history").innerHTML = "";
    localStorage.removeItem("history");
}
function clearData() {
    document.getElementById("history").innerHTML = "";
    localStorage.removeItem("data");
}

