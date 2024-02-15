const API_KEY_NEWS = "0add5f50ddec43f9ae6719037db43f0a";
const API_KEY_VANTAGE = "JYAWQKGQWWG86P84"


//linking pages together in navigation (click krenge to page change hoga)
function Home(){
    window.location.href = "index.html";
}

function Learn(){
    window.location.href = "assets/html/Learn_Page.html";
}

function Track(){
    window.location.href = "assets/html/Track_Page.html";
}

function Advice(){
    window.location.href = "assets/html/Advice_Page.html";
}



news();  //yaha news fuction call ho ra

//news function-- yaha ko fetch kr re api ke help se
//fetch api method ka use kr ke

async function news(){
    try{
    const url = `https://finnhub.io/api/v1/news?category=general&token=clp2lu9r01qn0q5te36gclp2lu9r01qn0q5te370`
    let alpha = await fetch(url);
    let data = await alpha.json()
    console.log(data);
    printNews(data);
    setTimeout(()=>{
        news()
    },120000);
    }
    catch(err)
    {
        
    }
}

//jo news mila hai usko window pe print krwa re DOM ke help se
async function printNews(data){

    try{
    let divNews = document.querySelector(".news");
    divNews.innerHTML = "";
    console.log(divNews)

    
    for (let i=0;i<20;i++){
        // let para = document.createElement("p");
        if(data[i].category == "top news"){
        let anchor = document.createElement("a")
        
        //para.innerText = data.articles[i].title;
        anchor.href= data[i].url;
        anchor.target='_blank';
        anchor.innerHTML = data[i].headline;
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.src = data[i].image;
        image.onerror = function() {
            image.src = 'assets/images/imageNotFound.png';
        }
       
        figure.appendChild(image);
        let figcaption = document.createElement("figcaption");
        figure.appendChild(figcaption.appendChild(anchor));

        divNews.appendChild(figure);
        }
}console.log(divNews)
    }
    catch(err){
        console.log(err)
    }
}


//yaha se top gainer/ top loser wala list print krwane ka kam kr re
//function call
printPerformance();

//function jo top gainer, top loser and trending ka list APi se nikal ra aur usko window pe DOM ke help se dal ra
async function printPerformance(){
    try{
        console.log('hi')
        let divPerformance = document.querySelector(".performance");
        divPerformance.innerHTML = "";
        console.log(divPerformance);
    
        //top gainers
        let Tgainer = await fetch('https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=4c16064b55ee6bfa45c683388b741fa2')
        let gainer = await Tgainer.json();
        console.log(gainer)
        let gain = document.createElement("div");
        let topGainer = document.createElement("h2");
        topGainer.innerHTML = "TOP GAINERS";
        gain.appendChild(topGainer);


        let gainers = document.createElement("table");
        gainers.className = "gainers";
        let gainTable = document.createElement("tr");
        let gainTable1 = document.createElement("td");
        let gainTable2 = document.createElement("td");
        gainTable1.innerHTML = "EQUITY";
        gainTable2.innerHTML = "% change";
        gainTable.appendChild(gainTable1);
        gainTable.appendChild(gainTable2);
        gainers.appendChild(gainTable);
        gain.appendChild(gainers);

        for (let i=0;i<50;i++){
            if(gainer[i].changesPercentage != 0){
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let changeCell = document.createElement("td");
        nameCell.innerHTML = gainer[i].name;
        changeCell.innerHTML = gainer[i].changesPercentage.toFixed(2);
        row.appendChild(nameCell);
        row.appendChild(changeCell);
        gainers.appendChild(row);
            }

    }
    

        gain.appendChild(gainers);
        

        //top losers
        let Tloser = await fetch('https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=4c16064b55ee6bfa45c683388b741fa2')
        let loser = await Tloser.json();
        console.log(loser);
        let lose = document.createElement("div");
        let topLoser = document.createElement("h2")
        topLoser.innerHTML = "TOP LOSERS"
        lose.appendChild(topLoser);

        let losers = document.createElement("table");
        losers.className = "losers";
        let loseTable = document.createElement("tr");
        let loseTable1 = document.createElement("td");
        let loseTable2 = document.createElement("td");
        loseTable1.innerHTML = "EQUITY";
        loseTable2.innerHTML = "% change";
        loseTable.appendChild(loseTable1);
        loseTable.appendChild(loseTable2);
        losers.appendChild(loseTable);
        for (let i=0;i<50;i++){
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let changeCell = document.createElement("td");
        nameCell.innerHTML = loser[i].name;
        changeCell.innerHTML = loser[i].changesPercentage.toFixed(2);
        row.appendChild(nameCell);
        row.appendChild(changeCell);
        losers.appendChild(row);
        }
        lose.appendChild(losers);


        //most active
        let Mactives = await fetch(`https://financialmodelingprep.com/api/v3/stock/actives?apikey=4c16064b55ee6bfa45c683388b741fa2`)
        let Mactive = await Mactives.json();
        console.log(Mactive)
        let active = document.createElement("div");
        let topActive = document.createElement("h2");
        topActive.innerHTML = "MOST ACTIVE";
        active.appendChild(topActive);
        let activeMost = document.createElement("table");
        activeMost.className = "active";
        let activeTable = document.createElement("tr");
        let activeTable1 = document.createElement("td");
        let activeTable2 = document.createElement("td");
        loseTable1.innerHTML = "EQUITY";
        loseTable2.innerHTML = "% change";
        activeTable.appendChild(activeTable1);
        activeTable.appendChild(activeTable2);
        activeMost.appendChild(activeTable);
        for (let i=0;i<50;i++){
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let changeCell = document.createElement("td");
        nameCell.innerHTML = Mactive.mostActiveStock[i].companyName;
        changeCell.innerHTML = Mactive.mostActiveStock[i].changesPercentage;
        row.appendChild(nameCell);
        row.appendChild(changeCell);
        activeMost.appendChild(row);
        }
        active.appendChild(activeMost);

        //append in document
        
        divPerformance.appendChild(gain);

        
        divPerformance.appendChild(lose);

        
        divPerformance.appendChild(active);
    }

    catch(err){
        console.log('haha')
        console.log(err)
     }
}


