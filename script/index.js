

var uploadImage = '';
var imgsrc = ''
var ctx = '';
const bodyData = []
var imageBase=[]
toastr.options = {
  "closeButton": true,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}


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
   // drawImageScaled(uploadImage, ctx)
   col2.appendChild(image)

   new_row.appendChild(col)
   new_row.appendChild(col1)
   new_row.appendChild(col2)

   bodyData.push( { id: colnumber , desc:  e.target[0].value.replace(/\n\r?/g, '\n'), img: colnumber },)
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
          // Footer
          doc.setFontSize(10)
          
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
      
      
      //prepared By
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left, pageHeight - 4, 2.4, 3,'FD')
      doc.text('Prepared By:', data.settings.margin.left+0.1, pageHeight - 3.5)
      doc.text('Name', data.settings.margin.left+0.1, pageHeight - 2.3)
      doc.text('Date', data.settings.margin.left+0.1, pageHeight - 1.2)
      doc.text(document.getElementById('preparedBy').value, data.settings.margin.left+3, pageHeight - 2.3)
      doc.text(document.getElementById('preparedDate').value, data.settings.margin.left+3, pageHeight - 1.2)

      //verified by 
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left+6.5, pageHeight - 4, 2.4, 3,'FD')
      doc.text('Verified By:', data.settings.margin.left+6.7, pageHeight - 3.5)
      doc.text('Name',data.settings.margin.left+6.7, pageHeight - 2.3)
      doc.text('Date',data.settings.margin.left+6.7, pageHeight -1.2)
      doc.text(document.getElementById('verifiedBy').value, data.settings.margin.left+9,  pageHeight - 2.3)
      doc.text(document.getElementById('verifiedDate').value, data.settings.margin.left+9, pageHeight -1.2)

      // approved by 
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left+13, pageHeight - 4, 2.4, 3,'FD')
      doc.text('Approved By:', data.settings.margin.left+13.1, pageHeight - 3.5)
      doc.text('Name',data.settings.margin.left+13.1, pageHeight - 2.3)
      doc.text('Date',data.settings.margin.left+13.1, pageHeight -1.2)
      doc.text(document.getElementById('ApprovedBy').value,data.settings.margin.left+15.7,  pageHeight - 2.3)
      doc.text(document.getElementById('approvedDate').value,  data.settings.margin.left+15.7, pageHeight -1.2)

      //footer border
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left, pageHeight - 4, 18, 3)
doc.line(data.settings.margin.left, pageHeight-3, 19.5,  pageHeight-3)
doc.line(data.settings.margin.left, pageHeight-2, 19.5,  pageHeight-2)
      //header border 
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left,5.5, 18.2, 2.5)

      // first column 
       doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left,5.5, 3, 2.5,"FD")
      doc.text('Client', data.settings.margin.left+0.3, 6)
      doc.text(document.getElementById('clientInput').value, data.settings.margin.left+3.1, 6)


      doc.text('Line', data.settings.margin.left+0.3, 6.8)
      doc.text(document.getElementById('LineInput').value, data.settings.margin.left+3.1, 6.8)
      doc.text('Area', data.settings.margin.left+0.3, 7.7)
      doc.text(document.getElementById('area').value, data.settings.margin.left+3.1,  7.7)
      
        
      //second column
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left+6,5.5, 3, 2.5,"FD")
      doc.text('Inspected By', data.settings.margin.left+6.1, 6.8)
      doc.text('Owner', data.settings.margin.left+6.1, 7.7)
      doc.text('Purpose', data.settings.margin.left+6.1, 6)
      doc.text(document.getElementById('inspectBy').value, data.settings.margin.left+9.1, 6.8)
      doc.text(document.getElementById('owner').value, data.settings.margin.left+9.1, 7.7)
      doc.text(document.getElementById('purposeInput').value, data.settings.margin.left+9.1, 6)
      
      // third column 
      doc.setDrawColor(169,169,169)
      doc.setFillColor(128,128,128)
      doc.rect(data.settings.margin.left+12,5.5, 3, 2.5,"FD")
      doc.text('Work Force', data.settings.margin.left+12.1, 6.8)
      doc.text('Time', data.settings.margin.left+12.1, 7.7)
      doc.text('Date', data.settings.margin.left+12.1, 6)
      doc.text(document.getElementById('workspace').value, data.settings.margin.left+15.1, 6.8)
      doc.text(document.getElementById('TimeBy').value, data.settings.margin.left+15.1, 7.7)
      doc.text(document.getElementById('dateInput').value, data.settings.margin.left+15.1, 6)
      
      doc.text('Area', data.settings.margin.left+0.3, 7.7)
      doc.text('Inspected By', data.settings.margin.left+6.1, 6.8)
      doc.text('Owner', data.settings.margin.left+6.1, 7.7)
      doc.text('Purpose', data.settings.margin.left+6.1, 6)
      doc.line(data.settings.margin.left, 6.3, 19.5, 6.3)
      doc.line(data.settings.margin.left, 7.3, 19.5,  7.3)
     

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
   toastr.info("Your PDF Downloaded Successfully")
}




