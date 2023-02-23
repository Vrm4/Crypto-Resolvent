const content = document.querySelector('.contentWrapper')

document.addEventListener('submit' , ( e )  =>{
    e.preventDefault()
    axios.post('/get-data' , { searchData : e.target[0].value})
    .then((res) => { 
        content.style.display = 'block'
        console.log(res)

    })
    .catch(() => {alert('Invalid Coin , Please Check Your Information')})
}) 

