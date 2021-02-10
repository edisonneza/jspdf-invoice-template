import { jsPDF } from "jspdf";

export const OutputType = {
  Save: "save", //save pdf as a file
  DataUriString: "datauristring", //returns the data uri string
  DataUri: "datauri", //opens the data uri in current window
  DataUrlNewWindow: "dataurlnewwindow", //opens the data uri in new window
};

/**
 *
 * @param { {
 *  outputType: OutputType | string
 *  fileName: string,
 *  logo: {
 *      src: string,
 *      width: number,
 *       height: number
 *   },
 *   business: {
 *       name: string,
 *       address: string,
 *       phone: string,
 *       email: string,
 *       email_1: string,
 *       website: string,
 *   },
 *   contact: {
 *       label: string,
 *       name: string,
 *       address: string,
 *       phone: string,
 *       email: string,
 *       otherInfo: string,
 *   },
 *   invoice: {
 *       label: string,
 *       invTotalLabel: string,
 *       num: number,
 *      invDate: string,
 *       invGenDate: string,
 *       headerBorder: boolean,
 *       tableBodyBorder: boolean,
 *       header: [],
 *       table: [],
 *       invTotal: string,
 *       invCurrency: string,
 *       invDescLabel: string,
 *       invDesc: string,
 *   },
 *   footer?: {
 *       text: string,
 *   },
 *   pageEnable: boolean,
 *   pageLabel?: string, } } props
 */
function jsPDFTemplate(props) {
  if (!props.business || !props.contact || !props.invoice)
    throw Error(
      "Props must contain 'business', 'contact' and 'invoice' objects."
    );

  const param = {
    outputType: props.outputType || "save",
    fileName: props.fileName || "",
    orientationLandscape: props.orientationLandscape || false,
    logo: {
      src: (props.logo && props.logo.src) || "",
      width: (props.logo && props.logo.width) || "",
      height: (props.logo && props.logo.height) || "",
    },
    business: {
      name: props.business.name || "",
      address: props.business.address || "",
      phone: props.business.phone || "",
      email: props.business.email || "",
      email_1: props.business.email_1 || "",
      website: props.business.website || "",
    },
    contact: {
      label: props.contact.label || "",
      name: props.contact.name || "",
      address: props.contact.address || "",
      phone: props.contact.phone || "",
      email: props.contact.email || "",
      otherInfo: props.contact.otherInfo || "",
    },
    invoice: {
      label: props.invoice.label || "",
      invTotalLabel: props.invoice.invTotalLabel || "",
      num: props.invoice.num || "",
      invDate: props.invoice.invDate || "",
      invGenDate: props.invoice.invGenDate || "",
      headerBorder: props.invoice.headerBorder || false,
      tableBodyBorder: props.invoice.tableBodyBorder || false,
      header: props.invoice.header || [],
      table: props.invoice.table || [],
      invTotal: props.invoice.invTotal || "",
      invCurrency: props.invoice.invCurrency || "",
      invDescLabel: props.invoice.invDescLabel || "",
      invDesc: props.invoice.invDesc || "",
    },
    footer: {
      text: (props.footer && props.footer.text) || "",
    },
    pageEnable: props.pageEnable || false,
    pageLabel: props.pageLabel || "Page",
  };

  const splitTextAndGetHeight = (text, size) => {
    var lines = doc.splitTextToSize(text, size);
    return {
      text: lines,
      height: doc.getTextDimensions(lines).h,
    };
  };
  if (param.invoice.table && param.invoice.table.length) {
    if (
      Object.keys(param.invoice.table[0]).length != param.invoice.header.length
    )
      throw Error("Length of header and table column must be equal.");
  }

  const options = {
    orientation: param.orientationLandscape ? "landscape" : "",
  };

  var doc = new jsPDF(options);

  var docWidth = doc.internal.pageSize.width;
  var docHeight = doc.internal.pageSize.height;

  var colorBlack = "#000000";
  var colorGray = "#4d4e53";
  //starting at 15mm
  var currentHeight = 15;
  //var startPointRectPanel1 = currentHeight + 6;

  var pdfConfig = {
    headerTextSize: 20,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4,
  };

  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text(docWidth - 10, currentHeight, param.business.name, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);

  if (param.logo.src) {
    var imageHeader = new Image();
    imageHeader.src = param.logo.src;
    //doc.text(htmlDoc.sessionDateText, docWidth - (doc.getTextWidth(htmlDoc.sessionDateText) + 10), currentHeight);
    doc.addImage(
      imageHeader,
      10,
      currentHeight - 5,
      param.logo.width,
      param.logo.height
    );
  }

  doc.setTextColor(colorGray);

  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.business.address, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.business.phone, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  // doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.business.email, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.business.email_1, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.business.website, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  //Contact part
  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  currentHeight += pdfConfig.lineHeight;
  if (param.contact.label) {
    doc.text(10, currentHeight, param.contact.label);
    currentHeight += pdfConfig.lineHeight;
  }

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.contact.name) doc.text(10, currentHeight, param.contact.name);

  if (param.invoice.label && param.invoice.num) {
    doc.text(
      docWidth - 10,
      currentHeight,
      param.invoice.label + param.invoice.num,
      "right"
    );
    currentHeight += pdfConfig.subLineHeight;
  }

  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize - 2);

  if (param.contact.address || param.invoice.invDate) {
    doc.text(10, currentHeight, param.contact.address);
    doc.text(docWidth - 10, currentHeight, param.invoice.invDate, "right");
    currentHeight += pdfConfig.subLineHeight;
  }

  if (param.contact.phone || param.invoice.invGenDate) {
    doc.text(10, currentHeight, param.contact.phone);
    doc.text(docWidth - 10, currentHeight, param.invoice.invGenDate, "right");
    currentHeight += pdfConfig.subLineHeight;
  }

  if (param.contact.email) {
    doc.text(10, currentHeight, param.contact.email);
    currentHeight += pdfConfig.subLineHeight;
  }

  if (param.contact.otherInfo)
    doc.text(10, currentHeight, param.contact.otherInfo);
  else currentHeight -= pdfConfig.subLineHeight;
  //end contact part

  //TABLE PART
  //var tdWidth = 31.66;
  //10 margin left - 10 margin right
  var tdWidth = (doc.getPageWidth() - 20) / param.invoice.header.length;

  var addTableHeaderBoarder = () => {
    currentHeight += 2;
    for (let i = 0; i < param.invoice.header.length; i++) {
      if (i === 0) doc.rect(10, currentHeight, tdWidth, 7);
      else doc.rect(tdWidth * i + 10, currentHeight, tdWidth, 7);
    }
    currentHeight -= 2;
  };

  var addTableBodyBoarder = (lineHeight) => {
    for (let i = 0; i < param.invoice.header.length; i++) {
      if (i === 0) doc.rect(10, currentHeight, tdWidth, lineHeight);
      else doc.rect(tdWidth * i + 10, currentHeight, tdWidth, lineHeight);
    }
  };

  var addTableHeader = () => {
    if (param.invoice.headerBorder) addTableHeaderBoarder();

    currentHeight += pdfConfig.subLineHeight;
    doc.setTextColor(colorBlack);
    doc.setFontSize(pdfConfig.fieldTextSize);
    //border color
    doc.setDrawColor(colorGray);
    currentHeight += 2;

    param.invoice.header.forEach(function (row, index) {
      if (index == 0) doc.text(row, 12, currentHeight);
      else doc.text(row, index * tdWidth + 12, currentHeight);
    });

    currentHeight += pdfConfig.subLineHeight - 1;
    doc.setTextColor(colorGray);
  };
  addTableHeader();

  var tableBodyLength = param.invoice.table.length;
  param.invoice.table.forEach(function (row, index) {
    doc.line(10, currentHeight, docWidth - 10, currentHeight);
    //size should be the same used in other td
    let itemDesc = splitTextAndGetHeight(row.desc, tdWidth);
    doc.text(itemDesc.text, tdWidth + 12, currentHeight + 4);
    if (param.invoice.tableBodyBorder) addTableBodyBoarder(itemDesc.height + 1);

    currentHeight += itemDesc.height - 4;

    doc.text(row.num.toString(), 12, currentHeight + 4);
    doc.text(row.price.toString(), tdWidth * 2 + 12, currentHeight + 4);
    doc.text(row.quantity.toString(), tdWidth * 3 + 12, currentHeight + 4);
    doc.text(row.unit, tdWidth * 4 + 12, currentHeight + 4);
    doc.text(row.total.toString(), tdWidth * 5 + 12, currentHeight + 4);

    //td border height
    currentHeight += 5;

    if (
      (param.orientationLandscape && currentHeight > 178) ||
      (currentHeight > 168 && doc.getNumberOfPages() > 1)
    ) {
      console.log(currentHeight);
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
    }

    if (
      (!param.orientationLandscape && currentHeight > 265) ||
      (currentHeight > 255 && doc.getNumberOfPages() > 1)
    ) {
      doc.addPage();
      currentHeight = 10;
      if (index + 1 < tableBodyLength) addTableHeader();
      //       else
      //         currentHeight += pdfConfig.subLineHeight + 2 + pdfConfig.subLineHeight - 1; //same as in addtableHeader
    }
  });
  //     doc.line(10, currentHeight, docWidth - 10, currentHeight); //nese duam te shfaqim line ne fund te tabeles

  var invDescSize = splitTextAndGetHeight(param.invoice.invDesc, docWidth / 2)
    .height;
  //END TABLE PART

  if (param.orientationLandscape && currentHeight + invDescSize > 173) {
    doc.addPage();
    currentHeight = 10;
  }

  if (!param.orientationLandscape && currentHeight + invDescSize > 260) {
    doc.addPage();
    currentHeight = 10;
  }

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.labelTextSize);
  currentHeight += pdfConfig.lineHeight;

  doc.line(docWidth / 2, currentHeight, docWidth - 10, currentHeight);

  currentHeight += pdfConfig.lineHeight;
  //     doc.text("Faleminderit!", 10, currentHeight);
  doc.text(docWidth / 1.5, currentHeight, param.invoice.invTotalLabel, "right");
  doc.text(docWidth - 25, currentHeight, param.invoice.invTotal, "right");
  doc.text(docWidth - 10, currentHeight, param.invoice.invCurrency, "right");

  doc.setTextColor(colorBlack);
  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  //   currentHeight += pdfConfig.subLineHeight;
  doc.setFontSize(pdfConfig.labelTextSize);

  //   if (currentHeight > 250 && doc.getNumberOfPages() > 1) {
  if (doc.getNumberOfPages() > 1) {
    for (i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setFontSize(pdfConfig.fieldTextSize - 2);
      doc.setTextColor(colorGray);

      doc.text(docWidth / 2, docHeight - 10, param.footer.text, "center");
      doc.setPage(i);
      doc.text(
        param.pageLabel + " " + i + " / " + doc.getNumberOfPages(),
        docWidth - 20,
        doc.internal.pageSize.height - 6
      );

      if (param.orientationLandscape && currentHeight + invDescSize > 183) {
        doc.addPage();
        currentHeight = 10;
      }

      if (!param.orientationLandscape && currentHeight + invDescSize > 270) {
        doc.addPage();
        currentHeight = 10;
      }
    }
  }

  var addInvoiceDesc = () => {
    doc.setFontSize(pdfConfig.labelTextSize);
    doc.setTextColor(colorBlack);

    doc.text(param.invoice.invDescLabel, 10, currentHeight);
    currentHeight += pdfConfig.subLineHeight;
    doc.setTextColor(colorGray);
    doc.setFontSize(pdfConfig.fieldTextSize - 1);

    var lines = doc.splitTextToSize(param.invoice.invDesc, docWidth / 2);
    //text in left half
    doc.text(lines, 10, currentHeight);
    currentHeight +=
      doc.getTextDimensions(lines).h > 5
        ? doc.getTextDimensions(lines).h + 6
        : pdfConfig.lineHeight;

    return currentHeight;
  };
  addInvoiceDesc();

  if (doc.getNumberOfPages() === 1 && param.pageEnable) {
    doc.setFontSize(pdfConfig.fieldTextSize - 2);
    doc.setTextColor(colorGray);
    doc.text(docWidth / 2, docHeight - 10, param.footer.text, "center");
    doc.text(
      param.pageLabel + "1 / 1",
      docWidth - 20,
      doc.internal.pageSize.height - 6
    );
  }

  if (param.outputType === "save") doc.save(param.fileName);
  else doc.output(param.outputType);

  return {
    pageNumber: doc.getNumberOfPages(),
    //docObject: doc,
  };
}

export default jsPDFTemplate;
