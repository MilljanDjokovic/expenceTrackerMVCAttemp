//Get dom elements

const form = document.getElementById('expencesForm');
const expenceName = document.getElementById('expence');
const expenceAmount = document.getElementById('amount');
const expenceMonth = document.getElementById('expenceMonth');
const expenceTime = document.getElementById('expenceTime');
const button = document.getElementById('button');
const outputData = document.getElementById('outputData');
const outputMessage = document.getElementById('outputMessage');
let sumExpences = document.getElementById('sumExpences');
let highestExpence = document.getElementById('highestExpence');

let allExpences = [];

//////////   Expence class  ///////////

class Expence {
    constructor (expence, amount, month, time) {
        this.expence = expenceName.value;
        this.amount = expenceAmount.value;
        this.month = expenceMonth.value;
        this.time = expenceTime.value;
    }
}

//////////   UI class  ///////////

class UI {

    showMessage(message, className) {
        outputMessage.innerHTML = `${message}`
        outputMessage.style.display = 'block';
        outputMessage.classList.add(`${className}`);
            setTimeout(()=> {
                outputMessage.style.display = 'none';
            }, 3000);
    }

    addExpence(expence, array) {
        let tr = document.createElement('tr');
    
        tr.innerHTML += `
            <td>${expence.expence}</td>
            <td id="amount">${expence.amount}</td>
            <td>${expence.month}</td>
            <td>${expence.time}</td>
            <td id="delete"><i class="far fa-trash-alt"></i></td>
        `
        outputData.appendChild(tr);

        //Push expence into passed array
            array.push(parseInt(expence.amount));
            console.log(`All expences after addition ${allExpences}`);
    }

    deleteExpence(target, array){
        if(target.className === "far fa-trash-alt" ){
            let amount = parseInt(target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText); 
            let calculatedSum = parseInt(sumExpences.innerText);
            let newSum = calculatedSum - amount;
            sumExpences.innerHTML = newSum;
            target.parentElement.parentElement.remove();

            function removeExpenceOnce(array, amount) {
                    let index = array.indexOf(amount);
                    if (index > -1) {
                    array.splice(index, 1);
                    console.log(`All expences afret being deleted particular expence ${array} `);
                    }   
                    return array;
                }
            removeExpenceOnce(array, amount);
        }
    }

    resetForm(form) {
       form.reset();
    }

    getHighestExpence(array) {
        if(array.length === 0){
            highestExpence.innerHTML = 0;
        } else{
            highestExpence.innerHTML = Math.max(...array);
        }
    }

    calculateExpences(array, element) {
        let sum = 0;
        for(let i = 0; i < array.length; i++){
            sum += allExpences[i];
        }
        element.innerHTML = sum;
    }
}

///////////Add event listener//////////////

form.addEventListener('submit', e=> {
    e.preventDefault();
    //Get all input values and store them into array
    let inputFields = [expenceAmount.value, expenceMonth.value, expenceName.value, expenceTime.value];
    //Instantiate new expense
    let newExpence = new Expence;
    //Instantiate new UI
    let ui = new UI;

    //Run simple inputs validation
    if(inputFields[0] === '' || inputFields[1] === '' || inputFields[2] === ''  || inputFields[3] === '' ){
        ui.showMessage(`Please, fill all fields!`, `error`);
    } else {
        ui.addExpence(newExpence, allExpences);
        ui.showMessage(`Expence added!`, `success`);
        ui.resetForm(form);
        ui.getHighestExpence(allExpences);
        ui.calculateExpences(allExpences, sumExpences);
        console.log(inputFields);
    }
})

outputData.addEventListener('click', e => {
    //Instantiate new UI
    let ui = new UI;
    ui.deleteExpence(e.target, allExpences);
    ui.showMessage(`Expence is deleted!`, `error`);
    ui.getHighestExpence(allExpences);
})

