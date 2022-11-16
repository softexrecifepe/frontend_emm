async function fetchData(url) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
    });
    let data = await response.json();
    return data;
}
const X_AXIS = "Horário";
const CHART_LIST = [];
const All = [];
const BEGIN_AT_ZERO = false;
const SHOW_GRID = true;
const SHOW_LEGEND = true;

const ENUM_FIELDS = {
  1: "TEMPERATURA",
  2: "UMIDADE",
  3: "LUMINOSIDADE",
  4: "PRESSÃO",
  5: "ALTITUDE",
};

const FIELDS = {
  field1: "TEMPERATURA",
  field2: "UMIDADE",
  field3: "LUMINOSIDADE",
  field4: "PRESSÃO",
  field5: "ALTITUDE",
};

const Y_AXYS_LEGENDS = {
  TEMPERATURA: "Tempertura - Cº",
  UMIDADE: "Tempertura - Cº",
  LUMINOSIDADE: "Tempertura - Cº",
  PRESSÃO: "Tempertura - Cº",
  ALTITUDE: "Tempertura - Cº",
};

const createLabels = (objBase) => {
  let y_axis = "";
  let title = "";
  let field = "";

  Object.keys(FIELDS).forEach((fieldKey) => {
    if (objBase.hasOwnProperty(fieldKey)) {
      y_axis = Y_AXYS_LEGENDS[FIELDS[fieldKey]];
      title = FIELDS[fieldKey];
      field = fieldKey;
    }
  });

  return {
    y_axis,
    title,
    field,
  };
};

function setData(data, ctx) {
  const page_title = data.channel.name;

  const feeds = data.feeds;
  const labels = [];
  const datasets = [{ data: [] }];
  const dataToChart = { labels, datasets };

  const { y_axis, field, title } = createLabels(feeds[0]);

  feeds
    .filter((feedField) => feedField[field])
    .forEach((filteredFeed) => {
      datasets[0].data.push(Number(filteredFeed[field]));
      labels.push(new Date(filteredFeed["created_at"]));
    });

  initChart(ctx, title, y_axis, dataToChart);
}

function refreshData(data, index) {
  const feeds = data.feeds;
  const labels = [];
  const datasets = [{ data: [] }];
  const { field } = createLabels(feeds[0]);

  feeds
    .filter((feedField) => feedField[field])
    .forEach((filteredFeed) => {
      datasets[0].data.push(Number(filteredFeed[field]));
      labels.push(filteredFeed["created_at"]);
    });

  CHART_LIST[index].data.datasets = datasets;
  CHART_LIST[index].data.labels = labels;
  CHART_LIST[index].update();
}

function initChart(ctx, title, y_axis, data) {
  const chart = new Chart(ctx, {
    type: "line",
    data,
    options: {
      title: {
        display: true,
        text: title,
        fontSize: 14,
      },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: X_AXIS !== "",
              labelString: X_AXIS,
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              maxTicksLimit: 10,
              callback: function (value, index, values) {
                return value.toLocaleString();
              },
            },
          },
        ],
        yAxes: [
          {
            stacked: false, // `true` for stacked area chart, `false` otherwise
            beginAtZero: true,
            scaleLabel: {
              display: y_axis !== "",
              labelString: y_axis,
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              maxTicksLimit: 10,
              beginAtZero: BEGIN_AT_ZERO,
              callback: function (value, index, values) {
                return value.toLocaleString();
              },
            },
          },
        ],
      },
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, all) {
            return (
              all.datasets[tooltipItem.datasetIndex].label +
              ": " +
              tooltipItem.yLabel.toLocaleString()
            );
          },
        },
      },
      plugins: {
        colorschemes: {
          /*
              Replace below with any other scheme from
              https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
            */
          scheme: "brewer.DarkTwo5",
        },
      },
    },
  });

  CHART_LIST.push(chart);
}

const start = () => {
  for (let index = 1; index < 6; index++) {
    fetchData(
      `https://api.thingspeak.com/channels/1638970/field/${index}.json?&amp;offset=0&amp;results=60`
    )
      .then((dado) => {
        const ctx = document
          .getElementById(`chart-container-${index}`)
          .getContext("2d");

        setData(dado, ctx);
      })
      .catch((er) => {
        console.log(er);
      });
  }
};

const refresh = () => {
  for (let index = 1; index < 6; index++) {
    fetchData(
      `https://api.thingspeak.com/channels/1638970/field/${index}.json?&amp;offset=0&amp;results=60`
    )
      .then((e) => {
        refreshData(e, index - 1);
      })
      .catch((er) => {
        console.log(er);
      });
  }

  setTimeout(() => {
    refresh();
  }, 60000);
};

start();