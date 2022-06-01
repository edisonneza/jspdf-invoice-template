export default jsPDFInvoiceTemplate;
export namespace OutputType {
    const Save: string;
    const DataUriString: string;
    const DataUri: string;
    const DataUrlNewWindow: string;
    const Blob: string;
    const ArrayBuffer: string;
}
import { jsPDF } from "jspdf";
/**
 *
 * @param { {
 *  outputType: OutputType | string,
 *  returnJsPDFDocObject?: boolean,
 *  fileName: string,
 *  orientationLandscape?: boolean,
 *  compress?: boolean,
 *  logo?: {
 *      src?: string,
 *      type?: string,
 *      width?: number,
 *      height?: number,
 *      margin?: {
 *        top?: number,
 *        left?: number
 *      }
 *   },
 *  stamp?: {
 *      inAllPages?: boolean,
 *      src?: string,
 *      type?: string,
 *      width?: number,
 *      height?: number,
 *      margin?: {
 *        top?: number,
 *        left?: number
 *      }
 *   },
 *   business?: {
 *       name?: string,
 *       address?: string,
 *       phone?: string,
 *       email?: string,
 *       email_1?: string,
 *       website?: string,
 *   },
 *   contact?: {
 *       label?: string,
 *       name?: string,
 *       address?: string,
 *       phone?: string,
 *       email?: string,
 *       otherInfo?: string,
 *   },
 *   invoice?: {
 *       label?: string,
 *       num?: number,
 *       invDate?: string,
 *       invGenDate?: string,
 *       headerBorder?: boolean,
 *       tableBodyBorder?: boolean,
 *       header?:
 *        {
 *          title: string,
 *          style?: { width?: number }
 *        }[],
 *       table?: any,
 *       invDescLabel?: string,
 *       invDesc?: string,
 *       additionalRows?: [{
 *           col1?: string,
 *           col2?: string,
 *           col3?: string,
 *           style?: {
 *               fontSize?: number
 *           }
 *       }],
 *   },
 *   footer?: {
 *       text?: string,
 *   },
 *   pageEnable?: boolean,
 *   pageLabel?: string, } } props
 */
declare function jsPDFInvoiceTemplate(props: {
    outputType: {
        Save: string;
        DataUriString: string;
        DataUri: string;
        DataUrlNewWindow: string;
        Blob: string;
        ArrayBuffer: string;
    } | string;
    returnJsPDFDocObject?: boolean;
    fileName: string;
    orientationLandscape?: boolean;
    compress?: boolean;
    logo?: {
        src?: string;
        type?: string;
        width?: number;
        height?: number;
        margin?: {
            top?: number;
            left?: number;
        };
    };
    stamp?: {
        inAllPages?: boolean;
        src?: string;
        type?: string;
        width?: number;
        height?: number;
        margin?: {
            top?: number;
            left?: number;
        };
    };
    business?: {
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
        email_1?: string;
        website?: string;
    };
    contact?: {
        label?: string;
        name?: string;
        address?: string;
        phone?: string;
        email?: string;
        otherInfo?: string;
    };
    invoice?: {
        label?: string;
        num?: number;
        invDate?: string;
        invGenDate?: string;
        headerBorder?: boolean;
        tableBodyBorder?: boolean;
        header?: {
            title: string;
            style?: {
                width?: number;
            };
        }[];
        table?: any;
        invDescLabel?: string;
        invDesc?: string;
        additionalRows?: [
            {
                col1?: string;
                col2?: string;
                col3?: string;
                style?: {
                    fontSize?: number;
                };
            }
        ];
    };
    footer?: {
        text?: string;
    };
    pageEnable?: boolean;
    pageLabel?: string;
}): {
    pagesNumber: number;
    jsPDFDocObject?: jsPDF;
    blob?: Blob;
    dataUriString?: string;
    arrayBuffer?: ArrayBuffer;
};
export { jsPDF };
