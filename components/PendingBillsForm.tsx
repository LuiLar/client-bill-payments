"use client";

import { useContext, useState } from "react";
import { useTheme } from "next-themes";
import { cn, formatBillingPeriod, formatCurrency } from "@/lib/utils";
import {
  BillApiContext,
  ServiceTypeEnum,
  Client,
  PendingBill,
} from "@/context/BillApiProvider";

const PendingBillsForm = () => {
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
  const { theme } = useTheme();
  const { clients, getPendingBills, payBill } = useContext(BillApiContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const bills = await getPendingBills(String(formData.get("clientId")));

      if (bills.hasOwnProperty("error")) {
        throw new Error((bills as { error: string }).error as string);
      }

      if ((bills as []).length === 0) {
        throw new Error("No pending bills found for this client.");
      }

      setPendingBills(bills as PendingBill[]);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error fetching pending bills. Please try again."
      );
    }
  };

  const handlePayBill = async (bill: PendingBill) => {
    try {
      const response = await payBill({
        clientId: bill.clientId as number,
        serviceType: bill.serviceType as ServiceTypeEnum,
        billingPeriod: bill.billingPeriod as string,
      });

      if (response.hasOwnProperty("error")) {
        throw new Error(response.error as string);
      }

      setPendingBills([]);
      alert("Bill paid successfully!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Error paying bill. Please try again."
      );
    }
  };

  return (
    <section className="w-full flex flex-col content-center items-center gap-6">
      <form
        className={cn(
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black",
          "p-6 rounded-lg shadow-md w-full max-w-md"
        )}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold my-4 w-full text-center">
          View Pending Bills
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 my-4 w-full rounded hover:bg-blue-600 transition-colors font-extrabold"
        >
          Search Pending Bills
        </button>
      </form>

      <div className="md:p-6 rounded-lg shadow-md w-full max-w-4xl">
        {pendingBills.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 md:px-4 py-2">
                  Service Type
                </th>
                <th className="border border-gray-300 md:px-4 py-2">
                  Billing Period
                </th>
                <th className="border border-gray-300 md:px-4 py-2">Amount</th>
                <th className="border border-gray-300 md:px-4 py-2">
                  Current Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingBills.map((bill, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 md:px-4 py-2 text-center">
                    {bill.serviceType}
                  </td>
                  <td className="border border-gray-300 md:px-4 py-2 text-center">
                    {formatBillingPeriod(bill.billingPeriod)}
                  </td>
                  <td className="border border-gray-300 md:px-4 py-2 text-center">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="border border-gray-300 md:px-4 py-2 text-center">
                    {bill.status}
                  </td>
                  <td className="border border-gray-300 md:px-4 py-2 text-center">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors duration-300"
                      onClick={() => handlePayBill(bill)}
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No pending bills found.</p>
        )}
      </div>
    </section>
  );
};

export default PendingBillsForm;
