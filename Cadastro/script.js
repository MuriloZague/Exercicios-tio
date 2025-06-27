const regexPatterns = {
  nome: /^[A-Za-zÀ-ÿ\s]{2,50}$/,

  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  celular: /^\(\d{2}\)\s\d{5}-\d{4}$/,

  idade: /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/,

  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

  cep: /^\d{5}-\d{3}$/,
};

function aplicarMascara(campo, valor) {

  const numeros = valor.replace(/\D/g, "");

  if (campo === "celular") {

    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (campo === "cpf") {

    return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (campo === "cep") {

    return numeros.replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  return valor;
}


function validarCPF(cpf) {
  const cpfLimpo = cpf.replace(/[^\d]/g, "");


  if (cpfLimpo.length !== 11) return false;


  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;


  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo[9])) return false;


  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo[10])) return false;

  return true;
}


function mostrarErro(campo, mensagem) {
  const input = document.getElementById(campo);
  const spanErro = document.getElementById("erro-" + campo);

  input.classList.add("campo-invalido");
  input.classList.remove("campo-valido");
  spanErro.textContent = mensagem;
}


function mostrarSucesso(campo) {
  const input = document.getElementById(campo);
  const spanErro = document.getElementById("erro-" + campo);

  input.classList.add("campo-valido");
  input.classList.remove("campo-invalido");
  spanErro.textContent = "";
}


function limparValidacao(campo) {
  const input = document.getElementById(campo);
  const spanErro = document.getElementById("erro-" + campo);

  input.classList.remove("campo-valido", "campo-invalido");
  spanErro.textContent = "";
}


function validarCampo(campo) {
  const input = document.getElementById(campo);
  const valor = input.value.trim();


  if (!valor) {
    mostrarErro(campo, "Este campo é obrigatório");
    return false;
  }


  switch (campo) {
    case "nome":
      if (!regexPatterns.nome.test(valor)) {
        mostrarErro(campo, "Nome deve conter apenas letras e espaços");
        return false;
      }
      break;

    case "endereco":
      if (valor.length < 5) {
        mostrarErro(campo, "Endereço deve ter pelo menos 5 caracteres");
        return false;
      }
      break;

    case "email":
      if (!regexPatterns.email.test(valor)) {
        mostrarErro(campo, "Digite um e-mail válido");
        return false;
      }
      break;

    case "celular":
      if (!regexPatterns.celular.test(valor)) {
        mostrarErro(campo, "Celular deve estar no formato (00) 00000-0000");
        return false;
      }
      break;

    case "idade":
      if (!regexPatterns.idade.test(valor)) {
        mostrarErro(campo, "Idade deve ser entre 1 e 120 anos");
        return false;
      }
      break;

    case "cpf":
      if (!regexPatterns.cpf.test(valor)) {
        mostrarErro(campo, "CPF deve estar no formato 000.000.000-00");
        return false;
      }
      if (!validarCPF(valor)) {
        mostrarErro(campo, "CPF inválido");
        return false;
      }
      break;

    case "cep":
      if (!regexPatterns.cep.test(valor)) {
        mostrarErro(campo, "CEP deve estar no formato 00000-000");
        return false;
      }
      break;
  }

  mostrarSucesso(campo);
  return true;
}


function validarCamposEspeciais() {
  let valido = true;

  // Validar sexo
  const sexo = document.getElementById("sexo");
  if (!sexo.value) {
    mostrarErro("sexo", "Selecione uma opção");
    valido = false;
  } else {
    mostrarSucesso("sexo");
  }


  const redeSocial = document.getElementById("redeSocial");
  if (!redeSocial.value) {
    mostrarErro("redeSocial", "Selecione uma rede social");
    valido = false;
  } else {
    mostrarSucesso("redeSocial");
  }


  const checkboxes = document.querySelectorAll(
    'input[name="interesse"]:checked'
  );
  const spanErroInteresse = document.getElementById("erro-interesse");

  if (checkboxes.length === 0) {
    spanErroInteresse.textContent =
      "Selecione pelo menos uma área de interesse";
    valido = false;
  } else {
    spanErroInteresse.textContent = "";
  }

  return valido;
}


document.addEventListener("DOMContentLoaded", function () {

  const campos = [
    "nome",
    "endereco",
    "email",
    "celular",
    "idade",
    "cpf",
    "cep",
  ];

  document.getElementById("celular").addEventListener("input", function () {
    this.value = aplicarMascara("celular", this.value);
  });

  document.getElementById("cpf").addEventListener("input", function () {
    this.value = aplicarMascara("cpf", this.value);
  });

  document.getElementById("cep").addEventListener("input", function () {
    this.value = aplicarMascara("cep", this.value);
  });


  campos.forEach(function (campo) {
    document.getElementById(campo).addEventListener("blur", function () {
      validarCampo(campo);
    });


    document.getElementById(campo).addEventListener("input", function () {
      limparValidacao(campo);
    });
  });


  document
    .getElementById("sexo")
    .addEventListener("change", validarCamposEspeciais);
  document
    .getElementById("redeSocial")
    .addEventListener("change", validarCamposEspeciais);


  const checkboxes = document.querySelectorAll('input[name="interesse"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", validarCamposEspeciais);
  });


  document
    .getElementById("formulario")
    .addEventListener("submit", function (e) {
      e.preventDefault(); 

      let formularioValido = true;

      campos.forEach(function (campo) {
        if (!validarCampo(campo)) {
          formularioValido = false;
        }
      });

      if (!validarCamposEspeciais()) {
        formularioValido = false;
      }

      if (formularioValido) {
        alert("Formulário enviado com sucesso! 🎉");
        console.log("Dados do formulário válidos!");

      } else {
        alert("Existem erros no formulário. Verifique os campos em vermelho.");
      }
    });
});
