const express = require('express')
const app = express()
const port = 8080
const axios = require('axios')

app.use(express.json())
app.use(express.static('public'))

const apiKey = 'YOUR API KEY PLS VISIT https://pro.coinmarketcap.com'

const slugPromise = async(slug) => { 
    const ApiUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${apiKey}&slug=${slug.toLowerCase()}`
    return await axios.get(ApiUrl)
}
const symbolPromise = async(symbol) =>{
    const ApiUrl = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${apiKey}&symbol=${symbol}`
    return await axios.get(ApiUrl)
}

app.post('/get-data' , (req,res) => { 
    const searchData = req.body.searchData
    const checkData = async () => { 
        const symbol = symbolPromise(searchData)
        const result = await symbol;
        let keys = Object.keys(result.data.data);
        let errorCode ;
        try {
            const slug = slugPromise(searchData)
            const resultS = await slug
            let keysS = Object.keys(resultS.data.data);
            res.send({DataSlug : resultS.data.data[keysS[0]]})

        } catch (error) {
            errorCode = error.response.status
        }
        if( result.data.data[keys[0]].length === 0 && errorCode === 400){
            res.sendStatus(400)
        }
        else{
            if(result.data.data[keys[0]].length != 0 && errorCode != undefined){
                res.send({DataSymbol : result.data.data[keys[0]]})
            }
        }
    }
    checkData()
}) 

app.listen(port , () => { 
    console.log('Server working')
})