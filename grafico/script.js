// Criando uma função para poder receber os dados da URL
function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

// Criando uma função para colocar os dados que quero dentro de uma array para que os dados apareça no gráfico.
function temp(info) {
    // Pegando os dados da URL
    let data = fazGet("https://api.thingspeak.com/channels/1418948/fields/1.json?results=2");
    // Transformando os dados TXT em JSON
    let dados = JSON.parse(data);
    // Recebendo apenas o resultado do field3
    let result = dados.feeds[0].field1;
    // Lista vazia
    let lista = [];
    // Colocando o dado do field3 dentro da lista
    let resultado = lista.push(result)

    return lista
}

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
      label: 'My First dataset',
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