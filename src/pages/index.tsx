import Link from "next/link";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  return (
    <>
      <main className="h-full flex flex-col justify-center items-center">
        <div className="h-[8rem] flex flex-col justify-center items-center text-center mt-14 max-sm:mt-10 mx-12 text-6xl max-sm:text-5xl font-sans">
          Welcome to the PDF Toolkit
        </div>
        <div className="h-[6rem] flex flex-col justify-center items-center mt-9 text-5xl max-sm:text-4xl font-sans">
          Available Tools
        </div>
        <div className="h-[20rem] w-[26rem] max-sm:w-[23rem] flex flex-wrap flex-row justify-evenly items-center mt-6 text-3xl max-sm:text-2xl font-sans">
          <Link href="/pdf-merger">
            <button className="rounded-lg bg-[#05336E] hover:bg-[#04234D] hover:ring hover:ring-[#074DA6] text-gray-200 p-4 h-32 w-40 max-sm:h-32 max-sm:w-36">
              PDF Merger
            </button>
          </Link>
          <Link href="/pdf-extractor">
            <button className="rounded-lg bg-[#05336E] hover:bg-[#04234D] hover:ring hover:ring-[#074DA6] text-gray-200 p-4 h-32 w-40 max-sm:h-32 max-sm:w-36">
              PDF Page Extractor
            </button>
          </Link>
          <Link href="/pdf-page-deleter">
            <button className="rounded-lg bg-[#05336E] hover:bg-[#04234D] hover:ring hover:ring-[#074DA6] text-gray-200 p-4 h-32 w-40 max-sm:h-32 max-sm:w-36">
              PDF Page Deleter
            </button>
          </Link>
          <Link href="/image-to-pdf">
            <button className="rounded-lg bg-[#05336E] hover:bg-[#04234D] hover:ring hover:ring-[#074DA6] text-gray-200 p-4 h-32 w-40 max-sm:h-32 max-sm:w-36">
              Image To PDF
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
