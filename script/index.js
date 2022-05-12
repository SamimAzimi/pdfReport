



const form = document.getElementById('formData')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target[1].value)



    const row = document.createElement("tr");
    const column = document.createElement("td")

    const node = document.createTextNode(e.target[0].value);
    column.appendChild(node);

const element = document.getElementById("insertData");
row.appendChild(column)
element.appendChild(row);

})
form.addEventListener('reset',(e)=>{
    e.preventDefault();
    e.target[0].value='';
    e.target[1].value='';
})