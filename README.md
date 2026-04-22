# PDF Invoice Template
PDF template created to generate invoices based on props object. Using `jsPDF` library. ( `jsPDF` is exported also, so it can be used without importing jsPDF separately. )

Creating PDF from scratch is a nightmare (at least for me). In some project we need to use js for generating various PDF, and mostly they are invoices PDF files. This project I've created for personal use but being here why not to share with others? 

All this code works by using an object as parameter for the function. <br/>
From <i><b>v1.3.1</b></i> all properties are optional and you can add them as empty string or just remove them from the prop object, if you want to display nothing. Also it can be used in different languages because all labels (and all text) can be set in the props object.

<h4><b><i>Feel free for any suggestion or improvements.</i></b></h4>

## [Demo site](https://edisonneza.github.io/jspdf-invoice-template) | [Demo images](#demo-images) | [jsPDF Documentation](http://raw.githack.com/MrRio/jsPDF/master/docs/) | [Npm](https://www.npmjs.com/package/jspdf-invoice-template) 
<br/>

# Install and usage
<details open>
<summary>How to install or load in my project?</summary>
This small "library" can be imported in any project via `npm` or in browser via CDN by using `jsPDFInvoiceTemplate` variable. 

Get it from NPM:

```sh
npm i jspdf-invoice-template
```

Alternatively, load latest version from a CDN:<br/>
<i>(Recommended to use a static version (not @latest) to prevent failure when updates are made)</i>
```html
<script src="https://unpkg.com/jspdf-invoice-template@1.5.0/dist/index.js"></script>
```
</details>
<hr/>

<details>
<summary>How to use it?</summary>

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
</details>
<hr/>

<details>
<summary>What about Parameters Object?</summary>

## Parameters object

Just edit the props object and call the function, nothing more... 😊

```javascript
const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created

//or in browser
var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created

var props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
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
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#", 
            style: { 
              width: 10 
            } 
          }, 
          { 
            title: "Title",
            style: {
              width: 30
            } 
          }, 
          { 
            title: "Description",
            style: {
              width: 80
            } 
          }, 
          { title: "Price"},
          { title: "Quantity"},
          { title: "Unit"},
          { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            "m2",
            400.5
        ])),
        additionalRows: [
            {
                col1: 'Total:',
                col2: '145,250.50',
                col3: 'ALL',
                style: { fontSize: 14 }
            },
            {
                col1: 'VAT:',
                col2: '20',
                col3: '%',
                style: { fontSize: 10 }
            },
            {
                col1: 'SubTotal:',
                col2: '116,199.90',
                col3: 'ALL',
                style: { fontSize: 10 }
            },
        ],
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    watermark: {
        text: "PRIVATE",    // text to stamp on the page
        color: "#b0b0b0",   // optional, default: #b0b0b0
        rotate: 45,         // optional, degrees — 45 diagonal, 0 horizontal; default: 45
        opacity: 0.5,       // optional, 0–1, default: 0.5
        bold: false,        // optional, default: false
        italic: false,      // optional, default: false
        fontSize: 60,       // optional, default: 60
        x: null,            // optional, mm from left — default: page center
        y: null,            // optional, mm from top  — default: page center
        inAllPages: true,   // optional, default: false (first page only)
    },
    pageEnable: true,
    pageLabel: "Page ",
};
```
</details>
<hr/>

<details>
<summary>What will be returned?</summary>
The return object depends on parameters object. See the code below:

```typescript
{
    pagesNumber: number, // (always) - number of pages
    jsPDFDocObject: jsPDF, // if (returnJsPDFDocObject: true) - the doc already created. You can use it to add new content, new  pages.
    blob: Blob, // if (outputType: 'blob') - returns the created pdf file as a Blob object. So you can upload and save it to your server. (Idea from a comment on Twitter)
    dataUriString: string, // if (outputType: 'datauristring')
    arrayBuffer: ArrayBuffer // if (outputType: 'arraybuffer')
}

//store it to a variable and use it wherever you want
var pdfCreated = jsPDFInvoiceTemplate.default({ ...parameters });
var blob = pdfCreated.blob;
//...
var pagesNum = pdfCreated.pagesNumber;
var pdfObject = pdfCreated.jsPDFDocObject;
```
</details>
<hr/>

<details>
<summary>How to use the returned jsPDFDocObject?</summary>

```typescript
//example: create a PDF using the template
var pdfCreated = jsPDFInvoiceTemplate.default({ ...parameters });

//add new page or new content -> see jsPDF documentation
pdfCreated.jsPDFDocObject.addPage();
pdfCreated.jsPDFDocObject.text("Test text", 10, 50);
//...

pdfCreated.jsPDFDocObject.save(); //or .output('<outputTypeHere>');
```
</details>

<hr/>

<details>
<summary>--- Changelog ---</summary>

<details open>
<summary>v.1.5.0</summary>

  * Added `watermark` parameter — stamp text on any/all pages with configurable rotation, position (x/y), color, opacity, font size, and bold/italic
</details>

<details>
<summary>v.1.4.4</summary>

  * Added support for modifying fonts via direct access to the jsPDF Document Object, enabling additional fonts and language support
</details>

<details>
<summary>v.1.4.3</summary>

  * Dynamic rows at the end of the table (total, vat, subtotal etc) via `additionalRows`
  * Added stamp image at the left bottom of the page (image as a qr code)
</details>

<details>
<summary>v.1.4.2</summary>

  * Separated Node.js and web-based builds into two packages
  * Fixed Image and Blob type (for Node.js)
</details>

<details>
<summary>v.1.4.0</summary>

  * Added `compress` option
  * Added custom column style (width) — portrait: 210mm total; landscape: 297mm total
</details>

<details>
<summary>v.1.3.2</summary>

  * Fixed package entry point
</details>

<details>
<summary>v.1.3.1</summary>

  * Added feature to add or remove columns
  * Dynamic height in all columns
</details>

<details>
<summary>v.1.2.0</summary>

  * Added `returnJsPDFDocObject` prop
  * Added support for returning different outputs based on `outputType` prop
  * All parameter object properties are now optional
  * Return jsPDF doc object, so it can be extended with new content and output in any type jsPDF supports
</details>

</details>
<hr/>

# Demo images
![portrait version](https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/portrait_mode.PNG)

Landscape:

![portrait version](https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/landscape_mode.PNG)

<hr/>

# Running the demo locally

<details>
<summary>How to run the demo on your machine?</summary>

**1. Clone the repository**
```sh
git clone https://github.com/edisonneza/jspdf-invoice-template.git
cd jspdf-invoice-template
```

**2. Install dependencies**
```sh
npm install
```

**3. Build the dist bundle**
```sh
npm run build
```

**4. Point the demo pages to the local build**

Both `index.html` and `json.html` load the library from a CDN by default. To use your local build, replace the CDN script tag in either file:

```html
<!-- change this -->
<script src="https://unpkg.com/jspdf-invoice-template@latest/dist/index.js"></script>

<!-- to this -->
<script src="./dist/index.js"></script>
```

**5. Serve the files through a local web server**

The demo requires a server (not `file://`) because jsPDF loads images via `fetch`. Any static server works:

```sh
# using Node.js
npx serve .

# using Python
python -m http.server 8080
```

Then open `http://localhost:3000` (or whichever port the server reports).

**6. Open a demo page**

| Page | Description |
|---|---|
| `index.html` | Visual invoice editor — click any field to edit, use **Advanced Settings** to configure the watermark, then click **Refresh** to preview or **Download PDF** to save |
| `json.html` | JSON editor — paste or edit the raw props object and click **Generate PDF Invoice** |

</details>

<hr/>

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