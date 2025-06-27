var senha = document.getElementById('senha');
var confirmaSenha = document.getElementById('confirmaSenha');
var barraForca = document.getElementById('strengthBar');
var textoForca = document.getElementById('strengthText');
var feedback = document.getElementById('feedback');
var botaoValidar = document.getElementById('btnValidar');

var itemMinuscula = document.getElementById('minuscula');
var itemMaiuscula = document.getElementById('maiuscula');
var itemNumero = document.getElementById('numero');
var itemEspecial = document.getElementById('especial');
var itemTamanho = document.getElementById('tamanho');
var itemConfirmacao = document.getElementById('confirmacao');


function temMinuscula(texto) {
    var regex = /[a-z]/;
    return regex.test(texto);
}


function temMaiuscula(texto) {
    var regex = /[A-Z]/;
    return regex.test(texto);
}


function temNumero(texto) {
    var regex = /[0-9]/;
    return regex.test(texto);
}


function temEspecial(texto) {
    var regex = /[#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;
    return regex.test(texto);
}


function temTamanhoMinimo(texto) {
    return texto.length >= 6;
}


function atualizarLista() {
    var senhaDigitada = senha.value;
    
    
    if (temMinuscula(senhaDigitada)) {
        itemMinuscula.className = 'valid';
    } else {
        itemMinuscula.className = '';
    }
    
    if (temMaiuscula(senhaDigitada)) {
        itemMaiuscula.className = 'valid';
    } else {
        itemMaiuscula.className = '';
    }
    
    if (temNumero(senhaDigitada)) {
        itemNumero.className = 'valid';
    } else {
        itemNumero.className = '';
    }
    
    if (temEspecial(senhaDigitada)) {
        itemEspecial.className = 'valid';
    } else {
        itemEspecial.className = '';
    }
    
    if (temTamanhoMinimo(senhaDigitada)) {
        itemTamanho.className = 'valid';
    } else {
        itemTamanho.className = '';
    }
}


function calcularForca() {
    var senhaDigitada = senha.value;
    var pontos = 0;
    
    
    if (temMinuscula(senhaDigitada)) pontos++;
    if (temMaiuscula(senhaDigitada)) pontos++;
    if (temNumero(senhaDigitada)) pontos++;
    if (temEspecial(senhaDigitada)) pontos++;
    if (temTamanhoMinimo(senhaDigitada)) pontos++;
    
    
    if (senhaDigitada.length == 0) {
        barraForca.style.width = '0%';
        barraForca.className = 'strength-bar';
        textoForca.textContent = 'Força da senha';
    } else if (pontos <= 2) {
        barraForca.style.width = '30%';
        barraForca.className = 'strength-bar fraca';
        textoForca.textContent = 'Fraca';
    } else if (pontos <= 4) {
        barraForca.style.width = '60%';
        barraForca.className = 'strength-bar media';
        textoForca.textContent = 'Média';
    } else {
        barraForca.style.width = '100%';
        barraForca.className = 'strength-bar forte';
        textoForca.textContent = 'Forte';
    }
}


function verificarConfirmacao() {
    var senha1 = senha.value;
    var senha2 = confirmaSenha.value;
    
    if (senha2.length > 0) {
        if (senha1 === senha2) {
            itemConfirmacao.className = 'valid';
        } else {
            itemConfirmacao.className = '';
        }
    } else {
        itemConfirmacao.className = '';
    }
}


senha.addEventListener('input', function() {
    atualizarLista();
    calcularForca();
    verificarConfirmacao();
    
    
    feedback.textContent = '';
    feedback.className = 'feedback';
});


confirmaSenha.addEventListener('input', function() {
    verificarConfirmacao();
});


botaoValidar.addEventListener('click', function() {
    var senhaDigitada = senha.value;
    var confirmaDigitada = confirmaSenha.value;
    
    
    if (senhaDigitada === '') {
        feedback.textContent = 'Por favor, digite uma senha!';
        feedback.className = 'feedback error';
        return;
    }
    
    
    var temTodosRequisitos = temMinuscula(senhaDigitada) && 
                            temMaiuscula(senhaDigitada) && 
                            temNumero(senhaDigitada) && 
                            temEspecial(senhaDigitada) && 
                            temTamanhoMinimo(senhaDigitada);
    
    
    var senhasIguais = senhaDigitada === confirmaDigitada && confirmaDigitada !== '';
    
    
    if (temTodosRequisitos && senhasIguais) {
        feedback.textContent = 'Parabéns! Sua senha atende todos os requisitos.';
        feedback.className = 'feedback success';
    } else {
        feedback.textContent = 'Senha inválida. Verifique os requisitos marcados em vermelho.';
        feedback.className = 'feedback error';
    }
});