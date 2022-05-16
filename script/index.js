

var uploadImage = '';
var imgsrc = ''
var ctx = '';
const image_Input = document.getElementById('imageInput');
const downloadPDF = document.getElementById('downloadPDF');

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
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
function pdfGen() {
   var doc = new jsPDF({
      orientation: 'p',
      unit: 'cm',
      format: 'a4',

   });
   var arraylen = array.length
   const logo1 = PageMetaData[0].logo1
   const logo2 = PageMetaData[0].logo2
   const name = PageMetaData[0].name
   const iso = PageMetaData[0].iso
   const address = PageMetaData[0].address
   const phone = PageMetaData[0].phone
   const title = PageMetaData[0].title
   function pagination() {
      if (arraylen <= 0) {

      }
      else {
         doc.addImage(logo1, 'JPEG', 1.5, 3.5, 1.2, 1)
         // addimge(x,y,width , height)
         // font size 
         // 25.5
         // 15.75pt
         // 12pt
         // 9.75pt
         // 9pt
         // 8pt
         // 7.5pt
         // 6.75pt
         // 6.75pt
         // 6pt
         doc.addImage(logo2, 'JPEG', 17.5, 3.5, 1.2, 1)
         doc.setFontSize(15)
         doc.text(6, 4, name)
         doc.setFontSize(12)
         doc.text(6.5, 4.5, iso)
         doc.setFontSize(9)
         doc.text(3, 5.3, address)
         doc.setFontSize(9)
         doc.text(4.5, 5.9, phone)
         doc.setFontSize(12)
         doc.text(8.5, 6.5, title)

         if (arraylen > 3) {

            // doc.addPage();
         }

         arraylen = arraylen - 3;
         // pagination();
      }

   }

   const data = [
      {
         id: '5', desc: 'Soil type: clay soil, excavation depth: 20mm', img: "",
      },
      { id: '19', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '19', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
      { id: '99', desc: 'Canada', img: "" },
   ]
   // pagination();
   doc.autoTable({
      didDrawPage: function (data) {
         console.log(data.table.columns.index)
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
            html: "#tableHead"
         })

         var str = 'Page ' + doc.internal.getNumberOfPages()
         // Total page number plugin only available in jspdf v1.0+
         if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp
         }
         doc.setFontSize(10)

         // jsPDF 1.4+ uses getWidth, <1.4 uses .width
         var pageSize = doc.internal.pageSize
         var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
         doc.text(str, data.settings.margin.left, pageHeight - 10)

      },
      didDrawCell: (data) => {
         console.log(data.cell)
         if (data.section === "body" && data.column.index === 2) {
            var base64Img = logo1
            doc.addImage(base64Img, 'JPEG', data.cell.x + 0.1, data.cell.y + 0.1, data.cell.width, data.cell.height)
         }
      },
      rowPageBreak: 'avoid', // avoid breaking rows into multiple sections
      margin: { top: 8 },
      body: data,
      bodyStyles: { minCellHeight: 5 },
      columnStyles: {
         0: { cellWidth: 1 },
         1: { cellWidth: 8.01 },
         2: { cellWidth: 9.2 },

      },
      columns: [
         { header: 'No', dataKey: 'id' },
         { header: 'Details', dataKey: 'desc' },
         { header: 'Picture/Drawing/Observation', dataKey: 'img' },
      ],

   })
   doc.save();
}