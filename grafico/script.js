// Criando uma função para poder receber os dados da URL
function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

// Pegando os dados da URL
let dataL = fazGet("https://api.thingspeak.com/channels/1418948/fields/1.json?results=2");
// Transformando os dados TXT em JSON
let dados = JSON.parse(dataL);

// Criando uma função para colocar os dados que quero dentro de uma array para que os dados apareça no gráfico.
function temp() {
    // Recebendo apenas o resultado do field3
    let result = dados.feeds[0].field1;
    // Lista vazia
    let lista = [];
    // Colocando o dado do field3 dentro da lista
    lista.push(result);
    // Retornando o valor dentro da lista
    return lista
}

function name() {
    // Recebendo apenas o resultado do name dentro do channel
    let resultName = dados.channel.name;
    // Lista vazia
    let lista = [];
    // Colocando o dado do name dentro da lista
    lista.push(resultName);
    return lista
}

//function autoRefresh() {
//    window.location = window.location.href;
//}
//setInterval('autoRefresh()', 5000);

function hora(){
    const date = new Date().toLocaleTimeString();
    
    return date
}

const ctx = document.getElementById('myChart')

const labels = [
    hora(),
    hora(),
    hora(),
    hora(),
    hora(),
    hora(),
];

const data = {
    labels: labels,
    datasets: [{
      label: name(),
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: temp(),
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true
    }
};

const myChart = new Chart(ctx, config)