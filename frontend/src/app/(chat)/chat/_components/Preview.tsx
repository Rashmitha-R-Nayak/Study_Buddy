"use client";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

type PDFViewerProps = {
  id: string;
};

export default function Preview({ id }: PDFViewerProps) {
  const url = "http://127.0.0.1:8000/media/pdfs/sample.pdf";

  return (
    <div className="flex flex-col h-full rounded-lg bg-zinc-800">
      <div className="text-center text-white text-2xl font-bold py-4">
        {url ? "PDF Preview" : "Guide"}
      </div>

      <div className="flex-1 bg-zinc-300 pl-8 pr-4 shadow-lg overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {url ? (
            <div className="h-full overflow-y-auto">
              <Viewer fileUrl={url} defaultScale={SpecialZoomLevel.PageWidth} />
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <h1>Guide</h1>
            </div>
          )}
        </Worker>
      </div>
    </div>
  );
}
