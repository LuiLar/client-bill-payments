"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import NewBillForm from "./NewBillForm";
import PayBillForm from "./PayBillForm";
import PendingBillsForm from "./PendingBillsForm";
import PaidBillsForm from "./PaidBillsForm";

interface TabProps {
  title: string;
  isActive: boolean;
  onClickHandler: () => void;
}

type Tab = {
  name: string;
  element: React.ReactNode;
};

const tabs: Tab[] = [
  { name: "Create New Bill", element: <NewBillForm /> },
  { name: "Pay Existing Bill", element: <PayBillForm /> },
  { name: "View Pending Bills", element: <PendingBillsForm /> },
  { name: "View Payment History", element: <PaidBillsForm /> },
];

const Tab = ({ title, isActive, onClickHandler }: TabProps) => (
  <button
    className={cn(
      "cursor-pointer py-5 px-4 transition-colors duration-300 text-black hover:bg-gray-400",
      isActive ? "font-bold bg-gray-400" : "font-normal bg-gray-300"
    )}
    onClick={onClickHandler}
  >
    {title}
  </button>
);

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <>
      <div className="grid grid-cols-4 w-full">
        {tabs.map((tab) => {
          const { name: tabName } = tab;

          return (
            <Tab
              key={tabName}
              title={tabName}
              isActive={activeTab.name === tabName}
              onClickHandler={() => setActiveTab(tab)}
            />
          );
        })}
      </div>

      <section className="w-full flex content-center justify-center mt-5 sm:mt-20 lg:mt-50">
        {activeTab.element}
      </section>
    </>
  );
};

export default TabsContainer;
