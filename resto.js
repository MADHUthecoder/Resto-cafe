async function saveData(event){
    event.preventDefault()
    const dishes = document.getElementById('dish').value //event.target.dish.value
    const price = document.getElementById('price').value
    const table = document.getElementById('table').value
    
    if (dishes ==="" || price ==="" || table===""){
        alert("Fill all the fields below")
    }
    const billObj ={
        dishes,
        price,
        table
    }
    try {
        const res = await axios.post("https://crudcrud.com/api/afa3acb075544d93b44d2e5803da3e4c/maddie",billObj)
        display(billObj)
    } catch (error) {
        console.error(error)
    }
    
    document.getElementById('dish').value=""
    document.getElementById('price').value=""
    document.getElementById('table').value=""
    
}
async function display(billObj){
    const {dishes, price, table} = billObj
    const parent = document.querySelector(".bill-list")

    const h3 = document.createElement('h3')
    const li = document.createElement('li')
    const hr = document.createElement('hr')

    li.className ='style-li'

    li.textContent = 'Table '+table+' : '+ '$'+ price+ ' :- '+dishes
    h3.textContent= `Table ${table}`

    var deleteBtn = document.createElement('input')
    deleteBtn.type="button"
    deleteBtn.value= "Delete "
    deleteBtn.onclick=()=>{
        parent.removeChild(h3)
        parent.removeChild(li)
        parent.removeChild(hr)

    }
    li.appendChild(deleteBtn)
    parent.appendChild(h3)
    parent.appendChild(li)
    parent.appendChild(hr)
}

window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const res= await axios.get('https://crudcrud.com/api/afa3acb075544d93b44d2e5803da3e4c/maddie')
        for (let i=0; i<res.data.length;i++){
            display(res.data[i])
        }
    }catch(error){
        console.error(error)
    }
})