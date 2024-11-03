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
    <div className="flex flex-col h-full rounded-lg bg-zinc-900 shadow-lg border border-gray-700 ">
      <div className="text-center text-white text-2xl font-semibold  pt-2 border-b border-gray-800 bg-zinc-800 rounded-t-lg">
        {url ? "PDF Preview" : "Guide"}
      </div>

      <div className="flex-1 bg-zinc-800 p-4 overflow-hidden rounded-b-lg">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {url ? (
            <div className="h-full overflow-y-auto custom-scrollbar bg-zinc-100 rounded-md shadow-inner p-2">
              <Viewer fileUrl={url} defaultScale={SpecialZoomLevel.PageWidth} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <h1>No PDF Loaded</h1>
            </div>
          )}
        </Worker>
      </div>
    </div>
  );
}
