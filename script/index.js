var uploadImage = ''
const image_Input = document.getElementById('imageInput');


image_Input.addEventListener("change",(ev)=>{

    var reader = new FileReader();
     if(ev.target.files) {
      file = ev.target.files[0]; //get first file
      reader.readAsDataURL(file)
    }
    reader.onloadend = function (e) {
     var image = new Image();
image.src = e.target.result;
image.onload = function(ev) {
      var canvas = document.getElementById('test');
     
      var ctx = canvas.getContext('2d');
     
      ctx.drawImage(image,5,5)
   }
}
})



// const form = document.getElementById('formData')
// form.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const table = document.getElementById('table')
//     let new_row = document.createElement("tr")
//     new_row.classList.add('dataHeadings');
//     new_row = table.insertRow(table.rows.length-4)


//     new_row.innerHTML = `
//             <td>${(table.rows.length-7)-2}</td>
//             <td colspan="2" class="detailsColumn">${e.target[1].value}</td>
//             <td colspan="3" class="imageColumn">}</td>
//     `;
//     console.log('test')




//     e.target[0].value='';
//     e.target[1].value='';

//     window.scrollBy(0, window.innerHeight);


// })
// form.addEventListener('reset',(e)=>{
//     e.preventDefault();
//     e.target[0].value='';
//     e.target[1].value='';
// })


