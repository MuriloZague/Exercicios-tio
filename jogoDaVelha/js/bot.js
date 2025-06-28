const tipoJogo = document.getElementById('select')

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorUser = 'X';

const combinacoesVitoria = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

tipoJogo.addEventListener("change", (e) => {
    
    const pagina = e.target.value;
    if(pagina){
        window.location.href = pagina
    }
})

const marcarQuadrado = (id) => {

    if (tabuleiro[id-1] !== ''){
        return;
    } 
    tabuleiro[id-1] = jogadorUser;
    document.getElementById(id).textContent = jogadorUser;

    if (verificarVencedor('X')) {
        alert('Você venceu!')
        document.querySelectorAll('.box').forEach(botao => {
            botao.disabled = true;
        });
        return;
    }

    if (verificarEmpate()) {
        alert('Empate!')
        document.querySelectorAll('.box').forEach(botao => {
            botao.disabled = true;
        });
        return;
    }
    jogadaBot()
}

const encontrarMelhorJogada = () => {

    let melhorPontuacao = -Infinity
    let melhorJogada
    for (let i = 0; i < 9; i++) {
        if (tabuleiro[i] === '') {
            tabuleiro[i] = 'O';
            const pontuacao = minimax(tabuleiro, 0, false)
            tabuleiro[i] = '';
            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao
                melhorJogada = i
            }
        }
    }
    return melhorJogada
}

const jogadaBot = () => {

    const melhorJogada = encontrarMelhorJogada();
    tabuleiro[melhorJogada] = 'O';
    document.getElementById((melhorJogada + 1).toString()).textContent = 'O';
   
    if (verificarVencedor('O')) {
        alert('Bot venceu!')
        document.querySelectorAll('.box').forEach(botao => {
            botao.disabled = true;
        });
        return;
    }
    
    if (verificarEmpate()) {
        alert('Empate!')
        document.querySelectorAll('.box').forEach(botao => {
            botao.disabled = true;
        });
        return;
    }
}

const minimax = (tabuleiroAtual, profundidade, maximizador) => {

    if (verificarVencedor('O')){
        return 10 - profundidade;
    }
    if (verificarVencedor('X')){
        return profundidade - 10;
    }
    if (verificarEmpate()){
        return 0;
    }
    if (maximizador) {
        let melhorPontuacao = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (tabuleiroAtual[i] === '') {
                tabuleiroAtual[i] = 'O';
                const pontuacao = minimax(tabuleiroAtual, profundidade + 1, false);
                tabuleiroAtual[i] = '';
                melhorPontuacao = Math.max(pontuacao, melhorPontuacao);
            }
        }
        return melhorPontuacao;
    } else {
        let piorPontuacao = Infinity;
        for (let i = 0; i < 9; i++) {
            if (tabuleiroAtual[i] === '') {
                tabuleiroAtual[i] = 'X';
                const pontuacao = minimax(tabuleiroAtual, profundidade + 1, true);
                tabuleiroAtual[i] = '';
                piorPontuacao = Math.min(pontuacao, piorPontuacao);
            }
        }
        return piorPontuacao;
    }
}

const verificarVencedor = (jogador) => {

    return combinacoesVitoria.some(combinacao => {
        return combinacao.every(index => {
            return tabuleiro[index] === jogador;
        });
    });
}

const verificarEmpate = () => {
    return tabuleiro.every(casa => casa !== '');
}