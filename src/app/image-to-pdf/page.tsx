"use client";

import { delay } from "@/components/utils/utils";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { ProcessedFile } from "@/components/models/processed-file";
import { useAppDispatch, useAppSelector } from "@/lib/redux-hooks";
import {
  refreshCoreState,
  setIsUploadComplete,
  setIsUploadFailed,
  setIsUploadInitiated,
  setSubmitMessage,
  setUploadErrorMessage,
  setUploadMessage
} from "@/lib/redux-features/pdf-core/pdf-core-slice";
import UploadContainer from "@/components/shared/upload-container";
import UploadFailedContainer from "@/components/shared/upload-failed-container";
import UploadStateContainer from "@/components/shared/upload-state-container";
import ActionStateContainer from "@/components/shared/action-state-container";
import DownloadContainer from "@/components/shared/download-container";
import { ImageToPdfState, initialImageToPdfState } from "@/components/image-to-pdf/image-to-pdf";

export default function ImageToPdf(): ReactElement {
  const dispatch = useAppDispatch();
  const pdfCoreState = useAppSelector((state) => state.pdfCore);

  const [imageToPdfState, setImageToPdfState] = useState<ImageToPdfState>(initialImageToPdfState);
  const [loading, setLoading] = useState<boolean>(true);

  function refreshApp(): void {
    dispatch(refreshCoreState());
    setImageToPdfState(initialImageToPdfState);
  }
  /* 
    refreshAppCached() is a useCallback() or Cached version of refreshApp() 
    specifically made to be used within the useEffect() hook.
   */
  const refreshAppCached = useCallback(refreshApp, [dispatch]);

  useEffect(() => {
    refreshAppCached();
    setLoading(false);
  }, [refreshAppCached]);

  async function uploadFilesInitializer(files: FileList | null): Promise<void> {
    if (files !== null) {
      if (files.length === 0) {
        return;
      }

      refreshApp();
      dispatch(setUploadMessage("Uploading your Image... ⏳"));
      dispatch(setIsUploadInitiated(true));

      await delay(1000);

      if (files.item(0) !== null) {
        let processedFile: ProcessedFile = { Id: 1, Content: files.item(0)! };

        if (processedFile.Content.size > imageToPdfState.MaxSizeAllowed) {
          handleFailedUpload("Max 20 MB size allowed for the Image!");
          return;
        }
        if (!imageToPdfState.FileTypesAllowed.includes(processedFile.Content.type)) {
          handleFailedUpload("You can only upload an Image!");
          return;
        }

        setImageToPdfState((prev) => ({ ...prev, UploadedFile: processedFile }));
        dispatch(setUploadMessage("Image uploaded. ✅"));
        dispatch(setIsUploadInitiated(false));
        dispatch(setIsUploadComplete(true));
      }
    }
  }

  function handleFailedUpload(uploadErrorMessage: string): void {
    dispatch(setUploadMessage("Upload failed! ❌"));
    dispatch(setUploadErrorMessage(uploadErrorMessage));
    dispatch(setIsUploadInitiated(false));
    dispatch(setIsUploadFailed(true));
  }

  function removeImage(): void {
    dispatch(setIsUploadComplete(false));
    dispatch(setIsUploadInitiated(false));
    dispatch(setIsUploadFailed(true));
    dispatch(setUploadMessage("Image deleted."));
    dispatch(setUploadErrorMessage("You have to upload again."));
    setImageToPdfState((prev) => ({ ...prev, UploadedFile: null }));
  }

  async function submitImage(): Promise<void> {
    let submitMessage: string = "Converting the Image to a PDF file... ⏳";
    dispatch(setSubmitMessage(submitMessage));
    setImageToPdfState((prev) => ({ ...prev, IsConversionInitiated: true }));
    await delay(1500);
    setImageToPdfState((prev) => ({ ...prev, IsConversionComplete: true }));
  }

  async function downloadFile(): Promise<void> {}

  if (
    !loading &&
    !pdfCoreState.IsUploadInitiated &&
    !imageToPdfState.IsConversionInitiated &&
    !imageToPdfState.IsConversionComplete
  ) {
    return (
      <>
        <main className="h-full flex flex-col justify-center items-center">
          <div className="h-[8rem] flex flex-col justify-center items-center text-center max-sm:mb-5 mt-14 max-sm:mt-5 px-8 text-6xl max-sm:text-[2.5rem] font-sans">
            Image To PDF Converter
          </div>
          {!pdfCoreState.IsUploadInitiated && !pdfCoreState.IsUploadComplete && !pdfCoreState.IsUploadFailed && (
            <UploadContainer UploadType="Image" IsMultipleUpload={false} UploadFiles={uploadFilesInitializer} />
          )}
          {pdfCoreState.IsUploadFailed && (
            <UploadFailedContainer
              UploadMessage={pdfCoreState.UploadMessage}
              UploadErrorMessage={pdfCoreState.UploadErrorMessage}
              RefreshApp={refreshApp}
            />
          )}
          {pdfCoreState.IsUploadComplete && (
            <div className="flex flex-col justify-center items-center text-center mt-16 mb-8 max-sm:-mt-4 max-sm:mb-7 text-[1.7rem] max-sm:text-[1.55rem] font-sans">
              <div>
                <div className="mb-8 max-sm:mb-7">
                  <p className="px-6">{pdfCoreState.UploadMessage}</p>
                </div>
                <table className="table-fixed border-collapse mx-auto mb-8 max-sm:mb-7 text-[1.2rem] max-sm:text-[1.1rem]">
                  <tbody>
                    <tr key={imageToPdfState.UploadedFile!.Id}>
                      <td className="px-4 text-center">
                        <i className="text-4xl max-sm:text-3xl mb-1 fa-solid fa-file-image"></i>
                        <p>{imageToPdfState.UploadedFile!.Content.name}</p>
                        <span
                          className="hover:text-white cursor-pointer fa-solid fa-xmark pt-3"
                          title="Remove Image"
                          onClick={removeImage}
                        ></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="h-[6rem] max-sm:h-[5rem]">
                  <button
                    className="text-3xl max-sm:text-2xl rounded-xl bg-green-900 hover:bg-green-950 disabled:bg-zinc-800 hover:ring hover:ring-green-700 disabled:ring-transparent text-gray-200 disabled:text-zinc-600 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                    onClick={submitImage}
                  >
                    <i className="fa-solid fa-circle-check mr-3"></i>Convert
                  </button>
                </div>
              </div>
              <div className="h-[6rem]">
                <button
                  className="text-3xl max-sm:text-2xl rounded-xl bg-[#05336E] hover:bg-[#04234D] hover:ring hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-52 max-sm:h-16 max-sm:w-40"
                  onClick={refreshApp}
                >
                  <i className="fa-solid fa-arrow-rotate-right mr-3"></i>Re-Do
                </button>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }

  if (!loading && pdfCoreState.IsUploadInitiated && !pdfCoreState.IsUploadComplete) {
    return (
      <>
        <UploadStateContainer UploadMessage={pdfCoreState.UploadMessage} />
      </>
    );
  }

  if (!loading && imageToPdfState.IsConversionInitiated && !imageToPdfState.IsConversionComplete) {
    return (
      <>
        <ActionStateContainer SubmitMessage={pdfCoreState.SubmitMessage} />
      </>
    );
  }

  if (!loading && imageToPdfState.IsConversionComplete) {
    return (
      <>
        <DownloadContainer
          ToolName="Image To PDF Converter"
          DownloadMessage="Successfully Converted the Image to a PDF File. ✅"
          DownloadFile={downloadFile}
          RefreshApp={refreshApp}
        />
      </>
    );
  }

  return <></>;
}