let senha = document.getElementById('senha');
let confirmaSenha = document.getElementById('confirmaSenha');
let barraForca = document.getElementById('strengthBar');
let textoForca = document.getElementById('strengthText');
let feedback = document.getElementById('feedback');
let botaoValidar = document.getElementById('btnValidar');
let itemMinuscula = document.getElementById('minuscula');
let itemMaiuscula = document.getElementById('maiuscula');
let itemNumero = document.getElementById('numero');
let itemEspecial = document.getElementById('especial');
let itemTamanho = document.getElementById('tamanho');
let itemConfirmacao = document.getElementById('confirmacao');


function temMinuscula(texto) {
    let regex = /[a-z]/;
    return regex.test(texto);
}


function temMaiuscula(texto) {
    let regex = /[A-Z]/;
    return regex.test(texto);
}


function temNumero(texto) {
    let regex = /[0-9]/;
    return regex.test(texto);
}


function temEspecial(texto) {
    let regex = /[#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;
    return regex.test(texto);
}


function temTamanhoMinimo(texto) {
    return texto.length >= 6;
}


function atualizarLista() {
    let senhaDigitada = senha.value;
    
    
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
    let senhaDigitada = senha.value;
    let pontos = 0;
    
    
    if (temMinuscula(senhaDigitada)){
         pontos++;
    }
    if (temMaiuscula(senhaDigitada)) {
        pontos++;
    }
    if (temNumero(senhaDigitada)) {
        pontos++;
    }
    if (temEspecial(senhaDigitada)) {
        pontos++;
    }
    if (temTamanhoMinimo(senhaDigitada)) {
        pontos++;
    }
    
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
    let senha1 = senha.value;
    let senha2 = confirmaSenha.value;
    
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
    let senhaDigitada = senha.value;
    let confirmaDigitada = confirmaSenha.value;
    
    
    if (senhaDigitada === '') {
        feedback.textContent = 'Por favor, digite uma senha!';
        feedback.className = 'feedback error';
        return;
    }
    
    
    let temTodosRequisitos = temMinuscula(senhaDigitada) && 
                            temMaiuscula(senhaDigitada) && 
                            temNumero(senhaDigitada) && 
                            temEspecial(senhaDigitada) && 
                            temTamanhoMinimo(senhaDigitada);
    
    
    let senhasIguais = senhaDigitada === confirmaDigitada && confirmaDigitada !== '';
    
    
    if (temTodosRequisitos && senhasIguais) {
        feedback.textContent = 'Parabéns! Sua senha atende todos os requisitos.';
        feedback.className = 'feedback success';
    } else {
        feedback.textContent = 'Senha inválida. Verifique os requisitos marcados em vermelho.';
        feedback.className = 'feedback error';
    }
});