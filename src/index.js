import { jsPDF } from "jspdf";

function jsPDFTemplate(param) {
  if (!props.business || !props.contact || !props.invoice)
    throw Error(
      "Props object must contain 'business', 'contact' and 'invoice' properties."
    );

  const param = {
    fileName: props.fileName || "",
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
      throw Error("Length of header and table column must be equal");
  }

  var doc = new jsPDF();

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

  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  currentHeight += pdfConfig.lineHeight;
  doc.text(10, currentHeight, param.contact.label);

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  currentHeight += pdfConfig.lineHeight;
  doc.text(10, currentHeight, param.contact.name);
  doc.text(
    docWidth - 10,
    currentHeight,
    param.invoice.label + param.invoice.num,
    "right"
  );

  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize - 2);
  currentHeight += pdfConfig.subLineHeight;
  doc.text(10, currentHeight, param.contact.address);
  doc.text(docWidth - 10, currentHeight, param.invoice.invDate, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(10, currentHeight, param.contact.phone);
  doc.text(docWidth - 10, currentHeight, param.invoice.invGenDate, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.text(10, currentHeight, param.contact.email);
  currentHeight += pdfConfig.subLineHeight;
  doc.text(10, currentHeight, param.contact.otherInfo);

  //TABLE PART

  //   currentHeight += 2;
  //docwidth 190 (/ 5 columns = 38) (/ 6 = 31.66)
  var tdWidth = 31.66;

  //     doc.line(10, currentHeight, docWidth - 10, currentHeight); //komento nese te shfaqen qelizat me border

  //uncomment nese te shfaqen me border

  var addTableHeaderBoarder = () => {
    doc.rect(10, currentHeight, tdWidth - 20, 7);
    doc.rect(tdWidth - 20 + 10, currentHeight, tdWidth + 20, 7);
    doc.rect(tdWidth * 2 + 10, currentHeight, tdWidth, 7);
    doc.rect(tdWidth * 3 + 10, currentHeight, tdWidth, 7);
    doc.rect(tdWidth * 4 + 10, currentHeight, tdWidth, 7);
    doc.rect(tdWidth * 5 + 10, currentHeight, tdWidth, 7);
  };
  var addTableHeader = () => {
    //     addTableHeaderBoarder();

    currentHeight += pdfConfig.subLineHeight;
    doc.setTextColor(colorBlack);
    doc.setFontSize(pdfConfig.fieldTextSize);
    doc.setDrawColor(colorGray);
    //border color
    currentHeight += 2;

    param.invoice.header.forEach(function (row, index) {
      if (index == 0) doc.text(row, 12, currentHeight);
      else if (index == 1) doc.text(row, tdWidth - 20 + 12, currentHeight);
      else doc.text(row, index * tdWidth + 12, currentHeight);

      //     doc.text("#", 12, currentHeight);
      //     doc.text("Pershkrimi", tdWidth - 20 + 12, currentHeight);
      //     doc.text("Cmimi", tdWidth * 2 + 12, currentHeight);
      //     doc.text("Sasia", tdWidth * 3 + 12, currentHeight);
      //     doc.text("Njesia", tdWidth * 4 + 12, currentHeight);
      //     doc.text("Totali", tdWidth * 5 + 12, currentHeight);
    });

    currentHeight += pdfConfig.subLineHeight - 1;
    doc.setTextColor(colorGray);
  };
  addTableHeader();

  var tableBodyLength = param.invoice.table.length;
  param.invoice.table.forEach(function (row, index) {
    //docwidth 190 (/ 5 colona = 38) (/ 6 = 31.66)
    var marginLeft = 31.66;
    //     var index = 0;
    //         currentHeight += 7; //td border height

    doc.line(10, currentHeight, docWidth - 10, currentHeight);
    //nese duam te bejm me border 4 anet e qelizes
    //         doc.rect(10, currentHeight, marginLeft - 20, 5);
    //         doc.rect(tdWidth - 20 + 10, currentHeight, tdWidth + 20, 5);
    //         doc.rect(tdWidth * 2 + 10, currentHeight, tdWidth, 5);
    //         doc.rect(tdWidth * 3 + 10, currentHeight, tdWidth, 5);
    //         doc.rect(tdWidth * 4 + 10, currentHeight, tdWidth, 5);
    //         doc.rect(tdWidth * 5 + 10, currentHeight, tdWidth, 5);

    doc.text(row.num.toString(), 12, currentHeight + 4);
    //size should be the save used in other td
    //     let itemDesc = splitTextAndGetHeight(row.desc, tdWidth - 20 + 12);
    let itemDesc = splitTextAndGetHeight(row.desc, tdWidth);
    doc.text(itemDesc.text, tdWidth - 20 + 12, currentHeight + 4);
    currentHeight += itemDesc.height - 4;

    doc.text(row.price.toString(), tdWidth * 2 + 12, currentHeight + 4);
    doc.text(row.quantity.toString(), tdWidth * 3 + 12, currentHeight + 4);
    doc.text(row.unit, tdWidth * 4 + 12, currentHeight + 4);
    doc.text(row.total.toString(), tdWidth * 5 + 12, currentHeight + 4);

    currentHeight += 5;
    //td border height

    if (currentHeight > 270) {
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
  if (currentHeight + invDescSize > 260) {
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
      //       doc.text("Faqja 1", docWidth - 20, doc.internal.pageSize.height - 6);
      //       doc.addPage();
      doc.setPage(i);
      doc.text(
        param.pageLabel + " " + i + " / " + doc.getNumberOfPages(),
        docWidth - 20,
        doc.internal.pageSize.height - 6
      );

      if (currentHeight + invDescSize > 270) {
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
    //shenimet jo deri ne cep te faqes
    doc.text(lines, 10, currentHeight);

    currentHeight +=
      doc.getTextDimensions(lines).h > 5
        ? doc.getTextDimensions(lines).h + 6
        : pdfConfig.lineHeight;

    return currentHeight;
  };
  addInvoiceDesc();

  //   doc.setFontSize(pdfConfig.fieldTextSize);
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

  doc.save(param.fileName);

  return {
    pageNumber: doc.getNumberOfPages(),
    docObject: doc,
  };
  // doc.output('datauri');
}

export default jsPDFTemplate;
