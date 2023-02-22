const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')

app.use(express.json())
app.use(express.static('public'))

app.post('/get-data' , (req,res) => { 
    console.log(req.body)
    const ApiUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=68fc8f78-8978-4067-8d00-026993ad8422&symbol=BTC'
    axios.get(ApiUrl) 
      .then(res => console.log(res.data.data.BTC[0].quote))
      .catch(err => console.log(err))
}) 

app.listen(port , () => { 
    console.log('Server working')
})