import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 px-4">
      <button
        onClick={() => window.history.back()}
        className="my-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 self-start"
      >
        ← Volver
      </button>

      <div className="w-full max-w-[1024px] h-[85vh] border shadow-lg rounded overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
