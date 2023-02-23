const content = document.querySelector('.contentWrapper')

function Commas(x) {
    var splitV = x.toFixed(2).toString().split(".");
    splitV[0]=splitV[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return splitV.join(",");
}
document.addEventListener('submit' , ( e )  =>{
    e.preventDefault()
    content.style.display = 'block'
    content.innerHTML = `
    <div class="loader-wrapper">
        <div class="loading">
            <div class="loading-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M15.566 11.021A7.016 7.016 0 0 0 19 5V4h1V2H4v2h1v1a7.016 7.016 0 0 0 3.434 6.021c.354.208.566.545.566.9v.158c0 .354-.212.69-.566.9A7.016 7.016 0 0 0 5 19v1H4v2h16v-2h-1v-1a7.014 7.014 0 0 0-3.433-6.02c-.355-.21-.567-.547-.567-.901v-.158c0-.355.212-.692.566-.9zM17 19v1H7v-1a5.01 5.01 0 0 1 2.45-4.299A3.111 3.111 0 0 0 10.834 13h2.332c.23.691.704 1.3 1.385 1.702A5.008 5.008 0 0 1 17 19z"></path></svg>
            </div>
        </div>
    </div>
    `
    axios.post('/get-data' , { searchData : e.target[0].value})
    .then((res) => { 
        let keyValue = Object.keys(res.data)
        let coinDatas;
        if(keyValue[0] === 'DataSymbol' ){
            coinDatas = res.data[keyValue[0]][0]  
        }else{
            coinDatas = res.data[keyValue[0]]
        }
        const coinId = coinDatas.id
        const coinName = coinDatas.name
        const coinSymbol = coinDatas.symbol 
        const coinCreatedYear = new Date(coinDatas.date_added).getFullYear()
        const volume24h = Commas(coinDatas.quote.USD.volume_24h)
        const marketCap = Commas(coinDatas.quote.USD.market_cap)
        const price = Commas(coinDatas.quote.USD.price)
        const change24h = coinDatas.quote.USD.percent_change_24h.toFixed(1)
        const change7d = coinDatas.quote.USD.percent_change_7d.toFixed(1)
        const change30d = coinDatas.quote.USD.percent_change_30d.toFixed(1)
        const numMarketPair = coinDatas.num_market_pairs
        content.style.animation = 'opening2 0.6s ease'
        setTimeout(() => {
            content.style.height = '260px'
        }, 600);
        content.innerHTML= `
                    <div class="contentHeader">
                        <img src="https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png" alt="">
                        <div class="contentHeaderText">
                            <h2>${coinName} <span>${coinSymbol}</span></h2>
                            <p>
                                Creation Date : ${coinCreatedYear} <br>
                                Volume 24h : $${volume24h}<br>
                                Market Cap : ${marketCap} <br>
                            </p>
                        </div>
                    </div>
                    <div class="contentBody">
                        <h2>Price: <span>$${price}</span> <span id="inc-dec">${change24h}%</span></h2>
                        <div>
                            <p>
                                Percent Change 7d : &nbsp; ${change7d} <br>
                                Percent Change 30d : &nbsp; ${change30d}<br>
                                Num_Market Pairs : &nbsp; ${numMarketPair}
                            </p>
                        </div>
                    </div> 
            `
        
    })
    .catch(() => {
        content.style.animation = 'loaderClose 0.6s linear'
        setTimeout(() => {
            content.style.display = 'none'    
        }, 600);
        alert('Invalid Coin , Please Check Your Information')
    })
}) 

