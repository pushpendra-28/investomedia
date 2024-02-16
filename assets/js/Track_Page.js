
const API_KEY_VANTAGE = "2llk2v4os9MiJfQ7noHqnTfEr4TDU8co"



//search symbol
var symbolData;

fetchSymbol();
async function fetchSymbol(){
    let symbolAPI = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=clp2lu9r01qn0q5te36gclp2lu9r01qn0q5te370`);
    symbolData = await symbolAPI.json();
    dataList();
}

//direct symbol
var symbolDataDirect;
fetchSymbolDirect();

async function fetchSymbolDirect(){
    let symbolAPI = await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${API_KEY_VANTAGE}`);
    symbolDataDirect = await symbolAPI.json();
    
}


//datalist for search box
function dataList() {
    let dataList = document.getElementById('symbols');
for (let i = 0; i < symbolData.length; i++) {
    let option = document.createElement('option');
    option.value = symbolData[i].description;
    dataList.appendChild(option);
}
}

//nav events
function Home(){
    window.location.href = "../../index.html";
}

function Learn(){
    window.location.href = "Learn_Page.html";
}

function Track(){
    window.location.href = "Track_Page.html";
}

function Advice(){
    window.location.href = "Advice_Page.html";
}
 function Search(){
    let searchBox = document.querySelector(".input");
    searchBox.classList.add("inputNew");
    searchBox.removeAttribute("disabled");
    searchBox.focus();
}

//nav events over

//search hit enter
var inputText;
 document.querySelector('.input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && event.target.value != '') {
        inputText = event.target.value;
        event.target.value = '';
        console.log(inputText);
        searchStock(inputText);

        
        }
    
    }
);


//printing trending
performance();
async function performance(){
   
   let alpha = await fetch(`https://financialmodelingprep.com/api/v3/stock/actives?apikey=${API_KEY_VANTAGE}`);
   let data = await alpha.json();
   printPerformance(data);
}


function printPerformance(data){
    let trend = document.querySelector(".trend");
    let table = document.createElement("table");
    let searchBox = document.querySelector(".input"); // assuming your search box has the class "input"

    for( let i = 0; i<50; i+=3)
{
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    if(data.mostActiveStock[i])
    if (data.mostActiveStock[i]) {
        td1.innerHTML = data.mostActiveStock[i].companyName;
    }
    if (data.mostActiveStock[i+1]) {
        td2.innerHTML = data.mostActiveStock[i+1].companyName;
    }
    if (data.mostActiveStock[i+2]) {
        td3.innerHTML = data.mostActiveStock[i+2].companyName;
    }
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    // Add event listener to each table cell
    [td1, td2, td3].forEach(td => {
        td.addEventListener('click', function() {
            searchBox.value = this.innerHTML;

            Search();
        });
    });

    table.appendChild(tr);
    trend.appendChild(table);
}
}
 


//get symbol of searched
 function searchStock(inputText){
    try{
        let i = 0;
        while(true)
        {
            if(symbolData[i].description == inputText)
            {
                searchStockData(symbolData[i].symbol);
                getGraphData(symbolData[i].symbol);
                return;
            }
            i++;
            
        }

        throw new Error('Error: Description does not match input text');

    } 
    catch(error){
        console.log(error);
        let i = 0;
        while(symbolDataDirect[i].symbol)
        {
            console.log(i);
            if(symbolDataDirect[i].name == inputText)
            {
                searchStockData(symbolDataDirect[i].symbol);
                getGraphData(symbolDataDirect[i].symbol);
                console.log("done");
                return;
            }
            i++;
        }

 
    }
}

//graph Data
async function getGraphData(symbol){
    try
    {
        let graphData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=YB6LUWSACTWP6RQD`);
        let graphDataJSON = await graphData.json();
        makeGraph(graphDataJSON);
}
catch(err)
{
    let graphData = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=JYAWQKGQWWG86P84`);
    let graphDataJSON = await graphData.json();
    makeGraph(graphDataJSON);
}
}

///printing stock data
async function searchStockData(symbol){
    try{
    console.log("here")
    let viewArea = document.querySelector(".viewArea");
    viewArea.innerHTML = '';
    let apiStockData = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY_VANTAGE}`);
    let stockData = await apiStockData.json();
    let contentDiv1 = document.createElement('div');

    contentDiv1.classList.add('contentDiv1');

    let contentTable = document.createElement('table');
    let tr1 = document.createElement('tr');
    let tr2 = document.createElement('tr');
    let tr3 = document.createElement('tr');
    let tr4 = document.createElement('tr');
    let tr5 = document.createElement('tr');

    let tr1td1 = document.createElement('td');
    let tr1td2 = document.createElement('td');
    let tr1td3 = document.createElement('td');
    let tr2td1 = document.createElement('td');
    let tr2td2 = document.createElement("td");
    let tr2td3 = document.createElement("td");
    let tr3td1 = document.createElement("td");
    let tr3td2 = document.createElement('td');
    let tr3td3 = document.createElement("td");
    let tr4td1 = document.createElement("td");
    let tr4td2 = document.createElement("td");
    let tr4td3 = document.createElement('td');
    let tr5td1 = document.createElement('td');
    let tr5td2 = document.createElement('td');
    let tr5td3 = document.createElement('td');


    function createTableWithTwoCells(text, value) {
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
    
        td1.innerHTML = text;
        td1.classList.add("td1");

        td2.innerHTML = value;
        td2.classList.add("td2");

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    
        return table;
    }
    
    tr1td1.appendChild(createTableWithTwoCells('Price:', stockData[0].price));
    tr1td2.appendChild(createTableWithTwoCells('Percentage Change:', stockData[0].changesPercentage));
    tr1td3.appendChild(createTableWithTwoCells('Change value:', stockData[0].change));
    tr2td1.appendChild(createTableWithTwoCells('Low:', stockData[0].dayLow));
    tr2td2.appendChild(createTableWithTwoCells('High:', stockData[0].dayHigh));
    tr2td3.appendChild(createTableWithTwoCells('52W High:', stockData[0].yearHigh));
    tr3td1.appendChild(createTableWithTwoCells('52W Low:', stockData[0].yearLow));
    tr3td2.appendChild(createTableWithTwoCells('Market Cap:', `${(stockData[0].marketCap/1000000).toFixed(2)}M`));
    tr3td3.appendChild(createTableWithTwoCells('Moving Avg 200:', stockData[0].priceAvg200));
    tr4td1.appendChild(createTableWithTwoCells('Volume:', stockData[0].volume));
    tr4td2.appendChild(createTableWithTwoCells('Volume Avg:', stockData[0].avgVolume));
    tr4td3.appendChild(createTableWithTwoCells('Open:', stockData[0].open));
    tr5td1.appendChild(createTableWithTwoCells('Prev Close:', stockData[0].previousClose));
    tr5td2.appendChild(createTableWithTwoCells('EPS:', stockData[0].eps));
    tr5td3.appendChild(createTableWithTwoCells('PE:', stockData[0].pe));


    tr1.appendChild(tr1td1);
    tr1.appendChild(tr1td2);
    tr1.appendChild(tr1td3);
    tr2.appendChild(tr2td1);
    tr2.appendChild(tr2td2);
    tr2.appendChild(tr2td3);
    tr3.appendChild(tr3td1);
    tr3.appendChild(tr3td2);
    tr3.appendChild(tr3td3);
    tr4.appendChild(tr4td1);
    tr4.appendChild(tr4td2);
    tr4.appendChild(tr4td3);
    tr5.appendChild(tr5td1);
    tr5.appendChild(tr5td2);
    tr5.appendChild(tr5td3);

    contentTable.appendChild(tr1);
    contentTable.appendChild(tr2);
    contentTable.appendChild(tr3);
    contentTable.appendChild(tr4);
    contentTable.appendChild(tr5);

    contentDiv1.appendChild(contentTable);
    viewArea.appendChild(contentDiv1);

    
}
catch(err)
{
    console.log(err);
}}


//printing graph
function makeGraph(data) {
    try {
        let viewArea = document.querySelector('.viewArea');
        let canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'graph');
        viewArea.appendChild(canvas);

        let timeSeriesData = data['Time Series (Daily)'];
        let xData = Object.keys(timeSeriesData).reverse(); // array of dates for the last month
        let yData = Object.values(timeSeriesData).map(dayData => dayData['4. close']); // array of closing prices for the last month

        let chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: xData,
                datasets: [{
                    data: yData,
                    borderColor: "red",
                    backgroundColor: 'blue',
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'xy',
                            speed: 20, 
                            threshold: 1 
                        },
                        zoom: {
                            wheel: {
                                enabled: true, 
                                speed: 0.1 

                            },
                            pinch: {
                                enabled: true, 
                                speed: 0.1
                            },
                            mode: 'xy'
                        }
                    }
                }
            }
        });
    } catch(err) {
        console.log(err);
    }
}

