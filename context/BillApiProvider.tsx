"use client";

import { createContext } from "react";

export enum ServiceTypeEnum {
  Water = "Water",
  NaturalGas = "Natural Gas",
  Sewer = "Sewer",
  Electricity = "Electricity",
  Internet = "Internet",
  Rent = "Rent",
  Phone = "Phone",
}

type CreateBillData = {
  clientId: number;
  serviceType: ServiceTypeEnum;
  billingPeriod: string;
  amount: number;
};

type PayBillData = {
  clientId: number;
  serviceType: ServiceTypeEnum;
  billingPeriod: string;
};

interface BillApiContextType {
  createBill: (data: CreateBillData) => Promise<unknown>;
  payBill: (data: PayBillData) => Promise<unknown>;
  getPendingBills: (clientId: string) => Promise<unknown>;
  getPaymentHistory: (clientId: string) => Promise<unknown>;
}

const BillApiContext = createContext<BillApiContextType>({
  createBill: async () => {},
  payBill: async () => {},
  getPendingBills: async () => {},
  getPaymentHistory: async () => {},
});

const BillApiProvider = ({ children }: { children: React.ReactNode }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const createBill = async (data: CreateBillData) => {
    try {
      const response = await fetch(`${API_URL}/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error) {
      console.error("Error creating bill:", error);
      throw error;
    }
  };

  const payBill = async (data: PayBillData) => {
    try {
      const response = await fetch(`${API_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error) {
      console.error("Error paying bill:", error);
      throw error;
    }
  };

  const getPendingBills = async (clientId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/clients/${clientId}/pending-bills`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.error("Error fetching pending bills:", error);
      throw error;
    }
  };

  const getPaymentHistory = async (clientId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/clients/${clientId}/payment-history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.error("Error fetching payment history:", error);
      throw error;
    }
  };

  const value = {
    createBill,
    payBill,
    getPendingBills,
    getPaymentHistory,
  };

  return (
    <BillApiContext.Provider value={value}>{children}</BillApiContext.Provider>
  );
};

export { BillApiProvider, BillApiContext };
