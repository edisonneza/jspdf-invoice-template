export default jsPDFInvoiceTemplate;
export namespace OutputType {
    const Save: string;
    const DataUriString: string;
    const DataUri: string;
    const DataUrlNewWindow: string;
}
import { jsPDF } from "jspdf";
/**
 *
 * @param { {
 *  outputType: OutputType | string
 *  fileName: string,
 *  orientationLandscape: boolean,
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
 *       header: string[],
 *       table: any,
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
declare function jsPDFInvoiceTemplate(props: {
    outputType: {
        Save: string;
        DataUriString: string;
        DataUri: string;
        DataUrlNewWindow: string;
    } | string;
    fileName: string;
    orientationLandscape: boolean;
    logo: {
        src: string;
        width: number;
        height: number;
    };
    business: {
        name: string;
        address: string;
        phone: string;
        email: string;
        email_1: string;
        website: string;
    };
    contact: {
        label: string;
        name: string;
        address: string;
        phone: string;
        email: string;
        otherInfo: string;
    };
    invoice: {
        label: string;
        invTotalLabel: string;
        num: number;
        invDate: string;
        invGenDate: string;
        headerBorder: boolean;
        tableBodyBorder: boolean;
        header: string[];
        table: any;
        invTotal: string;
        invCurrency: string;
        invDescLabel: string;
        invDesc: string;
    };
    footer?: {
        text: string;
    };
    pageEnable: boolean;
    pageLabel?: string;
}): {
    pageNumber: number;
};
export { jsPDF };
