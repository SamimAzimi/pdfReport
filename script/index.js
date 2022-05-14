



const form = document.getElementById('formData')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const table = document.getElementById('table')
    let new_row = document.createElement("tr")
    new_row.classList.add('datacontainer');
    new_row = table.insertRow(table.rows.length-4)


    new_row.innerHTML = `
            <td>${(table.rows.length-7)-2}</td>
            <td colspan="2" class="detailsColumn">${e.target[1].value}</td>
            <td colspan="3" class="imageColumn">${e.target[2].value}</td>
    `;

   
    

    //  e.target[0].value='';
    // e.target[1].value='';
  window.scrollBy(0, window.innerHeight);


})
form.addEventListener('reset',(e)=>{
    e.preventDefault();
    e.target[0].value='';
    e.target[1].value='';
})



