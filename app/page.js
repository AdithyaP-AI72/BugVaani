"use client";
import { useEffect, useState } from "react";
import EmailSubscriptionForm from "./components/EmailSubscriptionForm";
import Link from "next/link";
import { ArrowDown, ChevronDown, Heart } from "lucide-react";

async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/issues`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
  return res.json();
}

export default function Home() {
  const [clientData, setClientData] = useState({
    name: "Loading...",
    author: "Loading...",
    labels: [],
    url: "#",
  });

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    function handleChange() {
      setReduceMotion(mediaQuery.matches);
    }
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setClientData(data);
      } catch (error) {
        console.error(error);
        setClientData({
          name: "Error",
          author: "Unknown",
          labels: [],
          url: "#",
        });
      }
    };
    fetchData();
  }, []);

  const animationClass = reduceMotion ? "" : "animate-fade-and-move";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#ffffff]">
      <div className="flex-1 w-full">
        <div
          className={`hero bg-[#ffffff] flex flex-col justify-center items-center text-center py-10 ${animationClass}`}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#1f2937] animate-pulse px-2">
            Github good-first-issues!
          </h1>
          <p className="text-base md:text-lg text-[#858b96] flex items-center gap-2">
            From Mainak{" "}
            {<Heart size={20} className="text-[#ff4a4a] animate-pulse" />}{" "}
          </p>
          <div className="flex flex-col items-center mt-5">
            <p className="text-base md:text-lg text-[#858b96] animate-bounce">
              SCROLL DOWN TO EXPLORE
            </p>
            <ChevronDown
              size={32}
              className="md:size-10 text-[#858b96] animate-bounce"
            />
          </div>
        </div>

        <EmailSubscriptionForm />

        <div className="w-[95%] md:w-4/5 lg:w-2/3 xl:w-1/2 flex flex-col justify-center rounded-2xl border-2 border-[#ff4a4a] mx-auto my-8 shadow-2xl transition hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] px-2 sm:px-8 ">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6 sm:mb-10">
            <ul
              className="flex flex-wrap -mb-px justify-center text-sm md:text-lg"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="mr-4 md:mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 border-transparent border-b-2
                rounded-t-lg py-2 md:py-4 px-3 md:px-4 font-medium text-center
                hover:text-[#FF4B4B] hover:border-[#FF4B4B] hover:scale-105 transition-all duration-200
                dark:text-gray-400 dark:hover:text-gray-300"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  TITLE
                </button>
              </li>
              <li className="mr-4 md:mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 hover:border-[#FF4B4B] rounded-t-lg py-2 md:py-4 px-3 md:px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active hover:scale-105 transition-all duration-200 hover:text-[#FF4B4B]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="true"
                >
                  AUTHOR
                </button>
              </li>
              <li className="mr-4 md:mr-8" role="presentation">
                <button
                  className="inline-block text-gray-500 hover:border-[#FF4B4B] rounded-t-lg py-2 md:py-4 px-3 md:px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 hover:scale-105 transition-all duration-200 hover:text-[#FF4B4B]"
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  LABELS
                </button>
              </li>
              <li role="presentation">
                <button
                  className="inline-block text-gray-500 hover:border-[#FF4B4B] rounded-t-lg py-2 md:py-4 px-3 md:px-4 font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 hover:scale-105 transition-all duration-200 hover:text-[#FF4B4B]"
                  id="contacts-tab"
                  data-tabs-target="#contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  LINK
                </button>
              </li>
            </ul>
          </div>
          <div
            id="myTabContent"
            className="flex flex-col justify-center mb-4 px-2 md:px-4"
          >
            <div
              className="bg-gray-50 p-2 md:p-4 rounded-lg dark:bg-gray-800 hidden"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-base md:text-lg break-all">
                {clientData.name}
              </p>
            </div>
            <div
              className="bg-[#fff0ed] p-2 md:p-4 rounded-lg dark:bg-gray-800 flex justify-center"
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <p className="text-[#ff4a4a] text-base md:text-lg break-all">
                {clientData.author}{" "}
              </p>
            </div>
            <div
              className="bg-gray-50 p-2 md:p-4 rounded-lg dark:bg-gray-800 hidden"
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-base md:text-lg break-all">
                {clientData.labels.join(", ")}
              </p>
            </div>
            <div
              className="bg-gray-50 p-2 md:p-4 rounded-lg dark:bg-gray-800 hidden"
              id="contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <p className="text-gray-700 dark:text-gray-400 text-base md:text-lg break-all">
                <Link
                  href={clientData.url}
                  className="hover:text-blue-700 break-words"
                >
                  {clientData.url}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t border-gray-200 dark:border-gray-700 text-center text-[#ff4a4a] dark:text-gray-400 mt-8 py-4 md:py-8 text-sm md:text-base">
        Powered by Open Source and Novu
      </footer>
    </div>
  );
}
