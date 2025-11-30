"use client";

import { useContext } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { BillApiContext, ServiceTypeEnum } from "@/context/BillApiProvider";

const PayBillForm = () => {
  const { theme } = useTheme();
  const { payBill } = useContext(BillApiContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await payBill({
        clientId: Number(formData.get("clientId")),
        serviceType: formData.get("serviceType") as ServiceTypeEnum,
        billingPeriod: formData.get("billingPeriod") as string,
      });

      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error paying bill:", error);
    }
  };

  return (
    <form
      className={cn(
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black",
        "p-6 rounded-lg shadow-md w-full max-w-md"
      )}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold my-4 w-full text-center">
        Create New Bill
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="clientId">
          Client ID
        </label>
        <input
          type="number"
          min="100"
          max="500"
          step="100"
          defaultValue={100}
          id="clientId"
          name="clientId"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="serviceType">
          Service Type
        </label>
        <select
          id="serviceType"
          name="serviceType"
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled selected>
            Select a service type
          </option>
          <option value={ServiceTypeEnum.Water}>Water</option>
          <option value={ServiceTypeEnum.NaturalGas}>Natural Gas</option>
          <option value={ServiceTypeEnum.Sewer}>Sewer</option>
          <option value={ServiceTypeEnum.Electricity}>Electricity</option>
          <option value={ServiceTypeEnum.Internet}>Internet</option>
          <option value={ServiceTypeEnum.Rent}>Rent</option>
          <option value={ServiceTypeEnum.Phone}>Phone</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="billingPeriod">
          Billing Period
        </label>
        <input
          type="text"
          id="billingPeriod"
          name="billingPeriod"
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="YYYYMM"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 my-4 w-full rounded hover:bg-blue-600 transition-colors font-extrabold"
      >
        Pay Bill
      </button>
    </form>
  );
};

export default PayBillForm;
