var radios = document.getElementsByName("radio");
const velocidade = document.getElementById("velocidade");
const plano = document.getElementById("plano");
const telefonia = document.getElementById("telefonia");

document.getElementById("Vconect").onclick = function () {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      velocidade.style.display = "flex";
      plano.style.display = "none";
      telefonia.style.display = "none";
    }
  }
};
document.getElementById("Plan").onclick = function () {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      velocidade.style.display = "none";
      plano.style.display = "flex";
      telefonia.style.display = "none";
    }
  }
};
document.getElementById("Tel").onclick = function () {
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      velocidade.style.display = "none";
      plano.style.display = "none";
      telefonia.style.display = "flex";
    }
  }
};

function calcularDesconto() {
  var plano = document.getElementById("planoP").value;
  var valor = parseFloat(document.getElementById("valor").value);

  var desconto = 0;

  if (!valor || isNaN(valor)) {
    document.getElementById("resultadoP").textContent = "Valor inválido.";
    return;
  }

  switch (plano) {
    case "basic":
      desconto = 12;
      break;
    case "premium":
      desconto = 24;
      break;
    case "enterprise":
      desconto = 36;
      break;
    default:
      document.getElementById("resultadoP").textContent = "Plano inválido.";
      return;
  }

  var valorComDesconto = valor - valor * (desconto / 100);
  document.getElementById("resultadoP").textContent =
    "Valor promocional: R$ " + valorComDesconto.toFixed(2);
}

function calcularTelefonia() {
  var plano = parseInt(document.getElementById("planoT").value);
  var minutos = parseInt(document.getElementById("minutos").value);

  var valor = plano;

  if (!minutos || isNaN(minutos)) {
    document.getElementById("resultadoT").textContent = "Minutos inválidos.";
    return;
  }

  if (minutos >= 500) {
    valor = valor - valor * 0.08; // Aplicando desconto de 8% para clientes com 500 minutos ou mais
  }

  document.getElementById("resultadoT").textContent =
    "Preço promocional: R$ " + valor.toFixed(2);
}

function coletarVelocidades() {
  var quantidadeClientes = parseInt(document.getElementById("clientes").value);

  if (
    !quantidadeClientes ||
    isNaN(quantidadeClientes) ||
    quantidadeClientes <= 0
  ) {
    document.getElementById("velocidades").textContent =
      "Quantidade de clientes inválida.";
    return;
  }

  var velocidadesDownload = [];
  var velocidadesUpload = [];

  for (var i = 1; i <= quantidadeClientes; i++) {
    var velocidadeDownload = parseFloat(
      prompt("Digite a velocidade de download do cliente " + i + " (em Mbps):")
    );
    var velocidadeUpload = parseFloat(
      prompt("Digite a velocidade de upload do cliente " + i + " (em Mbps):")
    );

    if (isNaN(velocidadeDownload) || isNaN(velocidadeUpload)) {
      document.getElementById("velocidades").textContent =
        "Velocidades inválidas.";
      return;
    }

    velocidadesDownload.push(velocidadeDownload);
    velocidadesUpload.push(velocidadeUpload);
  }

  var mediaDownload = calcularMedia(velocidadesDownload);
  var mediaUpload = calcularMedia(velocidadesUpload);

  var resultado = document.getElementById("resultado");
  resultado.innerHTML =
    "Média de Download: " + mediaDownload.toFixed(2) + " Mbps<br>";
  resultado.innerHTML +=
    "Média de Upload: " + mediaUpload.toFixed(2) + " Mbps<br>";

  if (mediaDownload < 5 && mediaUpload < 2) {
    resultado.innerHTML += "Conexão: Ruim";
  } else if (
    (mediaDownload >= 5 && mediaDownload <= 10) ||
    (mediaUpload >= 2 && mediaUpload <= 5)
  ) {
    resultado.innerHTML += "Conexão: Regular";
  } else {
    resultado.innerHTML += "Conexão: Boa";
  }
}

function calcularMedia(arr) {
  var soma = arr.reduce(function (a, b) {
    return a + b;
  }, 0);

  return soma / arr.length;
}
