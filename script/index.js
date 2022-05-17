

var uploadImage = '';
var imgsrc = ''
var ctx = '';
const bodyData = []
var imageBase=[]

const image_Input = document.getElementById('imageInput');
const downloadPDF = document.getElementById('downloadPDF');
const client = document.getElementById('clientInput').value;
const clientcol = document.getElementById('clientColumn')
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
image_Input.addEventListener("change", (ev,) => {

   var reader = new FileReader();

   if (ev.target.files) {
      const file = ev.target.files[0];
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
   col1.innerHTML = e.target[0].value.replace(/\n\r?/g, '<br />')

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

   bodyData.push( { id: colnumber , desc:  e.target[0].value.replace(/\n\r?/g, '<br />'), img: colnumber },)
   imageBase.push({id:colnumber,img: imgsrc})
  
   e.target[0].value = '';
   e.target[1].value = '';

   window.scrollBy(0, window.innerHeight);

})

form.addEventListener('reset', (e) => {
   e.preventDefault();
   e.target[0].value = '';
   e.target[1].value = '';
})


downloadPDF.addEventListener("click", pdfGen)

function pdfGen() {
   var doc = new jsPDF({
      orientation: 'p',
      unit: 'cm',
      format: 'a4',

   });

   const logo1 = PageMetaData[0].logo1
   const logo2 = PageMetaData[0].logo2
   const name = PageMetaData[0].name
   const iso = PageMetaData[0].iso
   const address = PageMetaData[0].address
   const phone = PageMetaData[0].phone
   const title = PageMetaData[0].title
   doc.autoTable({
       
      didDrawPage: function (data) {
       
         doc.addImage(logo1, 'JPEG', 1.5, 1, 2, 2)
         doc.addImage(logo2, 'JPEG', 17.5, 1, 2, 2)
         doc.setFontSize(15)
         doc.text(6, 1.5, name)
         doc.setFontSize(12)
         doc.text(6.5, 2.5, iso)
         doc.setFontSize(9)
         doc.text(3, 3.3, address)
         doc.setFontSize(9)
         doc.text(4.5, 4.3, phone)
         doc.setFontSize(12)
         doc.text(8.5, 5.3, title)

         doc.autoTable({
         margin: { top: 5.7 },
         
         columns: [
         { header: 'Client'},
         { header: document.getElementById('clientInput').value },
         { header: 'Purpose'},
         { header: document.getElementById('purposeInput').value },
         { header: 'Date' },
         { header: document.getElementById('dateInput').value },              
      ],
      didDrawPage: function (data) {
          doc.autoTable({
              margin: { top: 6.5 },
                
         columns: [
         { header: 'Line'},
         { header: document.getElementById('LineInput').value },
         { header: 'Inspected By'},
         { header: document.getElementById('inspectBy').value },
         { header: 'Time' },
         { header: document.getElementById('TimeBy').value },              
      ],
      didDrawPage: function (data) {
          doc.autoTable({    margin: { top: 7.2 },
         columns: [
         { header: 'Area'},
         { header: document.getElementById('area').value },
         { header: 'Owner'},
         { header: document.getElementById('owner').value },
         { header: 'Workspace' },
         { header: document.getElementById('workspace').value },              
      ],
   
        
      })
      }
          })
      }
         })


      },
      columnStyles: {
         0: { cellWidth: 1, minCellHeight:5 },
         1: { cellWidth: 8.01 },
         2: { cellWidth: 9.2 },

      },
      didDrawCell: (data) => {
      
         if (data.section === "body" && data.column.index === 2 && bodyData.length>0) {
            var result = imageBase.filter(im => im.id == data.cell.text );
         
            if(result){
             
               doc.addImage(result[0].img, 'JPEG', data.cell.x + 0.1, data.cell.y + 0.1, data.cell.width, data.cell.height)
            }
         }
      },
      rowPageBreak: 'avoid', // avoid breaking rows into multiple sections
      margin: { top: 8 },
      body: bodyData,
      bodyStyles: {minCellHeight:5 },
      columns: [
         { header: 'No', dataKey: 'id' },
         { header: 'Details', dataKey: 'desc' },
         { header: 'Picture/Drawing/Observation', dataKey: 'img' },
      ],

   })


   
   doc.save();
}




