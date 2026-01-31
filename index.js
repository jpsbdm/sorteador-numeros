let numbersQuantity;
let maxNumber;
let minNumber;
let repeatNumbers;

const form = document.querySelector('form');
const divDraw = document.getElementById('div-draw');
const divResult = document.getElementById('div-result');
const results = document.querySelector(".results");
 console.log(results);
function drawNumbers(quantity, min, max, allowRepeat) {
    const results = [];
    for (let i = 0; i < quantity; i++) {
        results[i] = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);;
        for (let j = 0; j < i; j++) {
            if (results[i] === results[j] && allowRepeat) {
                i--;
                break;
            }
        }
    }
    return results;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createResult(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        const p = document.createElement('div');
        p.classList.add('result');
        p.classList.add('result-animation');
        p.textContent = numbers[i];
        results.appendChild(p);
        await sleep(800);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Atualizar as variáveis com os valores dos inputs
    numbersQuantity = parseInt(document.getElementById('min').value);
    maxNumber = parseInt(document.getElementById('to').value);
    minNumber = parseInt(document.getElementById('from').value);
    repeatNumbers = document.getElementById('repeat').checked;

    if (numbersQuantity > (maxNumber - minNumber + 1) && repeatNumbers) {
        alert('Não é possível sortear essa quantidade de números sem repetição nesse intervalo.');
        return;
    }
    else {
          // Remove hidden de div-result
    divResult.classList.remove('hidden');
    // Adiciona hidden em div-draw
    divDraw.classList.add('hidden');

    results.innerHTML = '';
    await createResult(drawNumbers(numbersQuantity, minNumber, maxNumber, repeatNumbers));
   
    }
});

document.getElementById('submit_again').addEventListener('click', () => {
    location.reload(); // Recarrega a página
    // ou
    window.location.href = 'index.html';
});
