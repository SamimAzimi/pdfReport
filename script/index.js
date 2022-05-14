



const form = document.getElementById('formData')
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let colnumber = 1; 
    const table = document.getElementById('table')
    var new_row = document.createElement("tr")
    new_row.setAttribute('class','datacontainer');
    new_row.setAttribute('id','dataHeadings');
    new_row = table.insertRow(table.rows.length-4)
  

    var cell0 = document.createElement("td")
    cell0 = new_row.insertCell(0)

    var cell1 = document.createElement("td")
    cell1.setAttribute('colspan','2');
    cell1.setAttribute('class','detailsColumn');
    cell1 = new_row.insertCell(1)
    

    var cell2 = document.createElement("td")
    cell2.setAttribute('colspan','3');
    cell2.setAttribute('class','imageColumn');
    cell2 = new_row.insertCell(2)
   
    
    cell0.innerText =  (table.rows.length-7)-2;
    cell1.innerText = e.target[0].value; 
    cell2.innerText = e.target[1].value; 

    //  e.target[0].value='';
    // e.target[1].value='';

})
form.addEventListener('reset',(e)=>{
    e.preventDefault();
    e.target[0].value='';
    e.target[1].value='';
})



