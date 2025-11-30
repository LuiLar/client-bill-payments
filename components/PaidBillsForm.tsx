"use client";

import { useContext, useState } from "react";
import { useTheme } from "next-themes";
import {
  capitalizeFirstLetter,
  cn,
  formatBillingPeriod,
  formatCurrency,
} from "@/lib/utils";
import { BillApiContext } from "@/context/BillApiProvider";

type PaidBill = {
  clientId: number;
  serviceType: string;
  billingPeriod: string;
  amount: number;
  status: string;
};

const PaidBillsForm = () => {
  const [paidBills, setPaidBills] = useState<PaidBill[]>([]);
  const { theme } = useTheme();
  const { getPaymentHistory } = useContext(BillApiContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const bills = await getPaymentHistory(String(formData.get("clientId")));

      setPaidBills(bills as PaidBill[]);
    } catch (error) {
      console.error("Error fetching paid bills:", error);
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
          View Payment History
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 my-4 w-full rounded hover:bg-blue-600 transition-colors font-extrabold"
        >
          Fetch Paid Bills
        </button>
      </form>

      <div className="p-6 rounded-lg shadow-md w-full max-w-4xl">
        {paidBills.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Client ID</th>
                <th className="border border-gray-300 px-4 py-2">
                  Service Type
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Billing Period
                </th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {paidBills.map((bill, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {bill.clientId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {bill.serviceType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatBillingPeriod(bill.billingPeriod)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatCurrency(bill.amount)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">
                    {capitalizeFirstLetter(bill.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No paid bills found.</p>
        )}
      </div>
    </section>
  );
};

export default PaidBillsForm;
