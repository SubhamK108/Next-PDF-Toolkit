import FilePicker from "@/components/shared/file-picker";
import CircularSpinner from "@/components/shared/spinners";
import { sleep } from "@/components/utils/utils";
import { ReactElement, useState } from "react";

interface ProcessedFile {
  Position: number;
  ProcessedFile: File | null;
}

export default function PDFMerger(): ReactElement {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFile[]>([]);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  const [isUploadInitiated, setIsUploadInitiated] = useState<boolean>(false);
  async function UploadFiles(files: FileList | null): Promise<void> {
    setIsUploadInitiated(true);
    setUploadedFiles([]);
    setIsUploadComplete(false);
    if (files === null) {
      return;
    }
    for (let i: number = 0; i < files.length; i++) {
      setUploadedFiles((prevState) => prevState.concat({ Position: i + 1, ProcessedFile: files.item(i) }));
    }
    await sleep(1500);
    setIsUploadComplete(true);
  }

  return (
    <>
      <main className="h-full flex flex-col justify-center items-center">
        <div className="h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-5 mx-12 text-6xl max-sm:text-[2.5rem] font-sans">
          PDF Merger
        </div>
        <div className="h-[6rem] flex flex-col justify-center items-center mt-14 max-sm:-mt-6 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
          <div>Upload your PDF files</div>
          <div className="mt-4 max-sm:mt-3 text-xl max-sm:text-[1.2rem]">Limit - 20 Files / 20 MB Each</div>
        </div>
        <FilePicker IsMultiple={true} FileType="application/pdf" UploadFiles={UploadFiles} />
        {isUploadInitiated && !isUploadComplete && (
          <div>
            <div className="flex justify-center items-center mt-11 mb-8 max-sm:mt-9 max-sm:mb-6 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
              Uploading your file(s) ... ⏳
            </div>
            <CircularSpinner />
          </div>
        )}
        {isUploadComplete && (
          <div>
            <div className="flex justify-center items-center mt-11 mb-8 max-sm:mt-9 max-sm:mb-7 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
              {uploadedFiles.length > 1 ? `${uploadedFiles.length} PDF files uploaded ✅` : "1 PDF file uploaded ✅"}
            </div>
            <table className="flex justify-center items-center table-fixed border-collapse mx-14 text-[1.05rem]">
              <tbody>
                {uploadedFiles.map((file: ProcessedFile) => (
                  <tr key={file.Position}>
                    <td className="border border-transparent pb-[0.8rem] max-sm:pb-[0.65rem] text-center pr-1">{`${file.Position}.`}</td>
                    <td className="border border-transparent pb-[0.8rem] max-sm:pb-[0.65rem] pr-3 max-sm:pr-2">
                      {file.ProcessedFile!.name}
                    </td>
                    {uploadedFiles.length > 1 && (
                      <td className="max-sm:w-1/4 border border-transparent pb-[0.8rem] max-sm:pb-[0.65rem] text-center">
                        {uploadedFiles.indexOf(file) > 0 && (
                          <span
                            className="px-2 hover:text-white cursor-pointer fa-solid fa-arrow-up"
                            title="Move File Up"
                          ></span>
                        )}
                        {uploadedFiles.indexOf(file) < uploadedFiles.length - 1 && (
                          <span
                            className="px-2 hover:text-white cursor-pointer fa-solid fa-arrow-down"
                            title="Move File Down"
                          ></span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
