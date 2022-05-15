var uploadImage = '';
var imgsrc = ''
var ctx = '';
const image_Input = document.getElementById('imageInput');


function drawImageScaled(img, ctx) {
   var canvas = ctx.canvas;
   var hRatio = canvas.width / img.width;
   var vRatio = canvas.height / img.height;
   var ratio = Math.min(hRatio, vRatio);
   var centerShift_x = (canvas.width - img.width * ratio) / 2;
   var centerShift_y = (canvas.height - img.height * ratio) / 2;
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   ctx.imageSmoothingEnabled = false;
   ctx.webkitImageSmoothingEnabled = false;
   ctx.mozImageSmoothingEnabled = false;

   ctx.drawImage(img, 0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}
image_Input.addEventListener("change", (ev) => {

   var reader = new FileReader();

   if (ev.target.files) {
      file = ev.target.files[0];

      reader.readAsDataURL(file)
   }
   reader.onloadend = function (e) {
      var image = new Image();
      image.src = e.target.result;
      imgsrc = e.target.result;
      image.onload = function (ev) {

         uploadImage = image;
      }
   }
})



const form = document.getElementById('formData')
form.addEventListener('submit', (e) => {
   e.preventDefault();



   const table = document.getElementById('table')
   let new_row = document.createElement("tr")
   new_row.classList.add('dataHeadings');
   new_row = table.insertRow(table.rows.length - 3)
   var colnumber = table.rows.length - 7
   var col = document.createElement('td')
   col.append(colnumber.toString())

   var col1 = document.createElement('td')
   col1.setAttribute('colspan', '2')
   col1.setAttribute('class', 'detailsColumn')
   col1.append(e.target[0].value.toString())

   var col2 = document.createElement('td')
   col2.setAttribute('colspan', '3')
   col2.setAttribute('class', 'imageColumn')
   // canvas 

   var image = new Image();
   image.src = imgsrc;
   var canvas = document.createElement('canvas')
   canvas.setAttribute("id", "test")

   ctx = canvas.getContext('2d');
   drawImageScaled(uploadImage, ctx)
   col2.appendChild(image)

   new_row.appendChild(col)
   new_row.appendChild(col1)
   new_row.appendChild(col2)




   e.target[0].value = '';
   e.target[1].value = '';

   window.scrollBy(0, window.innerHeight);

})

form.addEventListener('reset', (e) => {
   e.preventDefault();
   e.target[0].value = '';
   e.target[1].value = '';
})

const downloadPDF = document.getElementById('downloadPDF')
downloadPDF.addEventListener('click', demoFromHTML)

function demoFromHTML() {
   var pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [4, 2]
   });

   const source = document.body;

   pdf.fromHTML(source)
   pdf.save();
}