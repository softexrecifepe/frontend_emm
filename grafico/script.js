const url = "https://api.thingspeak.com/channels/1638970/status.json";

async function getAllData() {
    const response = await fetch(url);

    console.log(response);

    const data = await response.json();

    console.log(data);
    
    const name = data.channel.field1
    let hora = data.feeds[0].created_at
    let valor = data.feeds[0].field1
    
    console.log(valor)
    const ctx = document.getElementById('myChart');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: [hora, 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: name,
            data: [valor, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

getAllData();