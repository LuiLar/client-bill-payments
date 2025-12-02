"use client";

import { useContext } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  BillApiContext,
  ServiceTypeEnum,
  Client,
} from "@/context/BillApiProvider";

const NewBillForm = () => {
  const { theme } = useTheme();
  const { clients, createBill } = useContext(BillApiContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await createBill({
        clientId: Number(formData.get("clientId")),
        serviceType: formData.get("serviceType") as ServiceTypeEnum,
        billingPeriod: formData.get("billingPeriod") as string,
        amount: Number(formData.get("amount")),
      });

      if (response.hasOwnProperty("error")) {
        throw new Error(response.error as string);
      }

      (event.target as HTMLFormElement).reset();
      alert("Bill created successfully!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error creating bill. Please try again."
      );
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
        <select
          id="clientId"
          name="clientId"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={""}
          required
        >
          <option value="" disabled>
            Select a client
          </option>
          {clients.map((client: Client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="serviceType">
          Service Type
        </label>
        <select
          id="serviceType"
          name="serviceType"
          className="w-full p-2 border border-gray-300 rounded"
          defaultValue={""}
          required
        >
          <option value="" disabled>
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
          pattern="2025(0[1-9]|1[0-2])"
          placeholder="2025MM"
          id="billingPeriod"
          name="billingPeriod"
          className="w-full p-2 border border-gray-300 rounded"
          required
          onInvalid={() =>
            alert("Please select a month of year 2025 using YYYYMM format.")
          }
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          id="amount"
          name="amount"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 my-4 w-full rounded hover:bg-blue-600 transition-colors font-extrabold"
      >
        Create Bill
      </button>
    </form>
  );
};

export default NewBillForm;
