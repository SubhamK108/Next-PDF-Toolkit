import { ReactElement } from "react";

type PDF_FILE_TYPE = "application/pdf";
type IMAGE_FILE_TYPE = "image/png,image/jpg,image/jpeg,image/svg+xml";

interface FilePickerProps {
  IsMultiple: boolean;
  FileType: PDF_FILE_TYPE | IMAGE_FILE_TYPE;
  UploadFiles: (e: FileList | null) => void;
}

export default function FilePicker(props: FilePickerProps): ReactElement {
  return (
    <>
      <div className="mt-8 p-12 h-[12rem] w-[55%] max-sm:w-[85%] border-4 border-dashed border-[#074DA6] flex items-center justify-center text-center bg-transparent text-[1.4rem] relative shadow-inner">
        <input
          className="absolute w-full h-full opacity-0 cursor-pointer"
          type="file"
          title=""
          multiple={props.IsMultiple}
          accept={props.FileType}
          onChange={(e) => props.UploadFiles(e.target.files)}
        />
        Drag & Drop Files OR Click To Upload
      </div>
    </>
  );
}
