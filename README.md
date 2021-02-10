# PDF Invoice Template
PDF template created to generate invoices based on props object. Using `jsPDF` library. ( `jsPDF` is exported also, so it can be used without importing jsPDF separately. )

Creating PDF from scratch is a nightmare (at least for me). In some project we need to use js for generating varios PDF, and mostly they are invoices PDF files. This project I've created for personal use but being here why not to share with others? 

All this code works by using an object as parameter for the function. Here some properties are optional and you can add them as empty string if you want to display nothing. Also it can be used in different languages because all labels (and all text) can be set in the props object.

<h4><b><i>Feel free for any suggestion or improvements.</i></b></h4>
<br/>
This small "library" can be imported in any project via `npm` or in browser via CDN by using `jsPDFInvoiceTemplate` variable. 

Get it from NPM:

```sh
npm i jspdf-invoice-template
```

Alternatively, load latest version from a CDN:
```html
<script src="https://unpkg.com/jspdf-invoice-template@latest/dist/index.js"></script>
```
<hr/>

## Usage

You're ready to start creating your invoice PDF document: 

```javascript
//by importing 
import jsPDFInvoiceTemplate from "jspdf-invoice-template";

//or directly in browser
jsPDFInvoiceTemplate.default( propsObject );


//you can either import the `OutputType` const or `jsPDF` class if you want to create another PDF from scratch (without using the template) 
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

//or directly in browser
const outputTypes = jsPDFInvoiceTemplate.OutputType;
const jsPDF = jsPDFInvoiceTemplate.jsPDF();

jsPDFInvoiceTemplate.default( propsObject );
```

## Parameters object

Just edit the props object and call the function, nothing more... 😊

```javascript
const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created

//or in browser
var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created

var props = {
    outputType: OutputType.Save,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66
    },
    business: {
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Invoice #: ",
        invTotalLabel: "Total:",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        header: ["#", "Description", "Price", "Quantity", "Unit", "Total"],
        headerBorder: false,
        tableBodyBorder: false,
        table: Array.from(Array(10), (x,index)=>({
            num: index,
            desc: "There are many variations ",
            price: 200.5,
            quantity: 4.5,
            unit: "m2",
            total: 400.5
        })),
        invTotal: "145,250.50",
        invCurrency: "ALL",
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};
```

## Demo images
![portrait version](https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/portrait_mode.PNG)

Landscape:

![portrait version](https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/landscape_mode.PNG)


## 👋

Copyright
(c) 2021 Edison Neza, https://github.com/edisonneza/jspdf-invoice-template

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.