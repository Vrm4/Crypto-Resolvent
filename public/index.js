const content = document.querySelector('.contentWrapper')

document.addEventListener('submit' , ( e )  =>{
    e.preventDefault()
    axios.post('/get-data' , { searchData : e.target[0].value})
    .then((res) => { console.log(res)})
}) 