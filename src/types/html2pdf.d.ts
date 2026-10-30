declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: 'jpeg' | 'png' | 'webp' | string; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean; letterRendering?: boolean };
    jsPDF?: { unit?: string; format?: string; orientation?: 'portrait' | 'landscape' };
    pagebreak?: { mode?: string[]; before?: string; after?: string; avoid?: string };
  }

  interface Html2PdfWorker {
    from(element: HTMLElement | string): Html2PdfWorker;
    set(options: Html2PdfOptions): Html2PdfWorker;
    save(): Promise<void>;
    outputPdf(type?: string): Promise<any>;
  }

  function html2pdf(): Html2PdfWorker;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2PdfWorker;

  export default html2pdf;
}
