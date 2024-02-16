


    let myCharts = {};




var symbolData;

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

//symbol fetching and option making
fetchSymbol();
async function fetchSymbol(){
    let symbolAPI = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=clp2lu9r01qn0q5te36gclp2lu9r01qn0q5te370`);
    symbolData = await symbolAPI.json();
    console.log(symbolData);
    dataList();
}

function dataList() {
    let dataList = document.getElementById('symbols');
for (let i = 0; i < symbolData.length; i++) {
    let option = document.createElement('option');
    option.value = symbolData[i].description;
    dataList.appendChild(option);
}
}
//over


//search bar
let inputText;
document.querySelector('.input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && event.target.value != '') {
        inputText = event.target.value;
        event.target.value = '';
        console.log(inputText);
        searchStock(inputText);
        
        }

    }
);


//symbol conversion
function searchStock(inputText){

        let i = 0;
        while(true)
        {
            if(symbolData[i].description == inputText)
            {
                ratingFetch(symbolData[i].symbol);
                return;
            }
            i++;
            
        }

    }
        //rating
        async function ratingFetch(symbol){
        try{
            let ratingAPI = await fetch(`https://financialmodelingprep.com/api/v3/rating/${symbol}?apikey=2llk2v4os9MiJfQ7noHqnTfEr4TDU8co`);
            let ratingData = await ratingAPI.json();
            let ratingMonthWise = await fetch(`https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=clp2lu9r01qn0q5te36gclp2lu9r01qn0q5te370`);
            let ratingMonthWiseData = await ratingMonthWise.json();
            console.log(ratingData);
            printRating(ratingData, ratingMonthWiseData);
        } 

        catch(error){
            console.log(error)
            let errorHappened = document.querySelector(".rating");
            errorHappened.classList.add("error");
            errorHappened.innerHTML = "SORRY! We could not find the stock you are looking for";

            // Destroy all existing charts
            for (let key in myCharts) {
                myCharts[key].destroy();
            }
        
            // Clear the myCharts object
            myCharts = {};
        
            // Remove all canvases
            let canvases = document.querySelectorAll(".canvas");
            canvases.forEach(canvas => canvas.remove());

            let oldP = document.querySelectorAll('.tableRatings p');
            oldP.forEach(p => {
                if(p){
                    p.remove();
                }
            }); 
            
        
            
        }
}

//stock advice
function printRating(ratingData, ratingMonthWiseData){
    console.log(ratingData)

    //main rating
    let rating = document.querySelector(".rating");
    rating.innerHTML = "";
    rating.classList.remove("error");
    let tr1 = document.createElement("tr");

        // Select all td elements inside the trackRating div
        let tds = document.querySelectorAll('.trackRating td');
        //emptying td
        tds.forEach(td => { 
            td.innerHTML = ""
        });


    //main rating
    //tr1
    let tr1td1 = document.createElement("td");
    tr1td1.innerHTML = `RATING: ${ratingData[0].ratingRecommendation}`;

    tr1.appendChild(tr1td1);
    rating.appendChild(tr1);
    if(ratingData[0].ratingRecommendation == "Strong Buy"){
        tr1td1.style.color = "rgb(61, 252, 3)";
    }
    else if(ratingData[0].ratingRecommendation == "Buy"){
        tr1td1.style.color = "rgb(173, 252, 3)";
    }
    else if(ratingData[0].ratingRecommendation == "Neutral"){
        tr1td1.style.color = "yellow";
    }
    else if(ratingData[0].ratingRecommendation == "Sell"){
        tr1td1.style.color = "orange";
    }
    else{
        tr1td1.style.color = "red";
    }
    

    ratingMonthWiseData.forEach((item, index) => {
        chart(item, index);
    });



    //writing on the rating on individual topics

    // Write the rating data to the td elements
    tds[0].innerHTML = `Discounted Cash Flow Score : ${ratingData[0].ratingDetailsDCFScore}`;

    tds[1].innerHTML = `Return of Equity Score : ${ratingData[0].ratingDetailsROEScore}`;

    tds[2].innerHTML = `Return of Assets Score : ${ratingData[0].ratingDetailsROAScore}`;

    tds[3].innerHTML = `DE Score : ${ratingData[0].ratingDetailsDEScore}`;

    tds[4].innerHTML = `Price to Earning Score : ${ratingData[0].ratingDetailsPEScore}`;

    tds[5].innerHTML = `Price to Book value Score : ${ratingData[0].ratingDetailsPBScore}`;



}

//chart
function chart(data, index) {
    // Get the td element where the canvas will be appended
    let td = document.querySelectorAll('table td')[index];

    // If a chart already exists, destroy it
    if (myCharts[`myChart${index}`]) {
        myCharts[`myChart${index}`].destroy();
    }

    // Remove the old canvas if it exists
    let oldCanvas = document.getElementById(`myChart${index}`);
    if (oldCanvas) {
        oldCanvas.remove();
    }

    // Create a new canvas and set its id and class
    let canvas = document.createElement('canvas');
    canvas.id = `myChart${index}`;
    canvas.className = 'canvas';


    // Append the new canvas to the td element
    td.appendChild(canvas);

    // Remove the old p tag if it exists
    let oldP = td.querySelector('p');
    
    if (oldP) {
        oldP.remove();
    }

    // Create a new p tag and set its innerHTML to the period property of the data object
    let p = document.createElement('p');
    p.innerHTML = data.period;

    // Append the new p tag to the td element
    td.appendChild(p);


    // Get the context of the new canvas
    let ctx = canvas.getContext('2d');

    // Create a new chart
    myCharts[`myChart${index}`] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data).filter(key => typeof data[key] === 'number'),
            datasets: [{
                data: Object.values(data).filter(value => typeof value === 'number'),
                backgroundColor: ["rgba(47, 193, 55, 0.43)", 'rgba(250, 242, 0, 0.43)', 'rgba(250, 96, 0, 0.43)', "rgba(0, 249, 11, 0.43)", ' rgba(235, 11, 11, 0.43)'],
                borderColor: ["rgba(47, 193, 55, 0.43)", 'rgba(250, 242, 0, 0.43)', 'rgba(250, 96, 0, 0.43)', "rgba(0, 249, 11, 0.43)", ' rgba(235, 11, 11, 0.43)'],
                borderWidth: 1
            }]
        }
    });
}



