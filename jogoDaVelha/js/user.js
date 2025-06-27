const tipoJogo = document.getElementById('select')

let box1 = document.getElementById('1');
let box2 = document.getElementById('2');
let box3 = document.getElementById('3');
let box4 = document.getElementById('4');
let box5 = document.getElementById('5');
let box6 = document.getElementById('6');
let box7 = document.getElementById('7');
let box8 = document.getElementById('8');
let box9 = document.getElementById('9');


const winConditions = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9],
    [box1, box4, box7],
    [box2, box5, box8],
    [box3, box6, box9],
    [box1, box5, box9],
    [box3, box5, box7]
];

let user = "X";
let user2 = "O"
let plays = 0
let userSelecteds = [];
let user2Selecteds = [];

tipoJogo.addEventListener("change", (e) => {
    const pagina = e.target.value;
    if(pagina){
        window.location.href = pagina
    }
})

const marcarQuadrado = (id) => {
    let box = document.getElementById(id)
    if (box.classList.contains('selected-user') || box.classList.contains('selected-bot')){
        return;
    }
    if (plays % 2 == 0) {
        if (!box.classList.contains('selected-user' && 'selected-user2')) {
            plays = plays + 1
            box.classList.add('selected-user')
            box.innerHTML = `<span>${user}</span>`
            userSelecteds.push(id);

            if (verificarVitoria(userSelecteds)){
                alert("Usuário 1 venceu!");
                document.querySelectorAll('.box').forEach(botao => {
                    botao.disabled = true;
                });
                return;
            }
        }
        return;

    } else {

        if (!box.classList.contains('selected-user2' && 'selected-user')) {
            plays = plays + 1
            box.classList.add('selected-user2')
            box.innerHTML = `<span>${user2}</span>`
            user2Selecteds.push(id);

            if (verificarVitoria(user2Selecteds)){
                alert("Usuário 2 venceu!");
                document.querySelectorAll('.box').forEach(botao => {
                    botao.disabled = true;
                });
                return;
            }
        }
        return;
    }
}


const verificarVitoria = (array) => {
    return winConditions.some(condition => {
        return condition.every(box => array.includes(box.id));
    });
};