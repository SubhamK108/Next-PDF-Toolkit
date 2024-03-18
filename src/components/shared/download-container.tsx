import { ReactElement } from "react";
import { useAppSelector } from "@/lib/redux-hooks";

interface DownloadContainerProps {
  ToolName: string;
  DownloadMessage: string;
  RefreshApp: () => void;
}

export default function DownloadContainer(props: DownloadContainerProps): ReactElement {
  const pdfCoreState = useAppSelector((state) => state.pdfCore);

  function downloadPdfFile(): void {
    let link = document.createElement("a");
    link.download = pdfCoreState.FinalPdfFilename;
    link.href = pdfCoreState.FinalPdfUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <main className="h-full flex flex-col justify-center items-center">
        {props.ToolName.length >= 15 ? (
          <div className="font-bold tracking-wide h-[8rem] flex flex-col justify-center items-center text-center max-sm:mb-6 mt-14 max-sm:mt-5 px-8 text-6xl max-sm:text-[2.5rem] font-sans">
            {props.ToolName}
          </div>
        ) : (
          <div className="font-bold tracking-wide h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-5 px-8 text-6xl max-sm:text-[2.5rem] font-sans">
            {props.ToolName}
          </div>
        )}
        <div className="font-semibold h-[12rem] px-6 flex flex-col justify-center items-center text-center mb-8 mt-5 max-sm:-mt-11 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
          <div className="mb-5 max-sm:mb-4">{props.DownloadMessage}</div>
          <div className="text-5xl max-sm:text-[2.2rem]">🎉 🎊</div>
        </div>
        <div className="h-[6rem] max-sm:h-[5rem]">
          <button
            className="text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-700 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent text-gray-200 disabled:text-zinc-500 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
            onClick={downloadPdfFile}
          >
            <i className="fa-solid fa-download mr-3"></i>Download
          </button>
        </div>
        <div className="h-[6rem]">
          <button
            className="text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
            onClick={props.RefreshApp}
          >
            <i className="fa-solid fa-arrow-rotate-right mr-3"></i>Re-Do
          </button>
        </div>
      </main>
    </>
  );
}
