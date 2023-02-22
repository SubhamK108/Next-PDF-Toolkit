import { ReactElement } from "react";

export default function CircularSpinner(): ReactElement {
  return (
    <div className="m-4 flex flex-row space-x-4 justify-center items-center">
      <div className="w-16 h-16 max-sm:w-14 max-sm:h-14 rounded-full animate-spin border-[5.5px] max-sm:border-[4px] border-solid border-current border-t-transparent"></div>
    </div>
  );
}
