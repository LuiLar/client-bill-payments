"use client";

import { createContext, useEffect, useState } from "react";

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

type Client = {
  id: number;
  name: string;
};

type PaidBill = {
  clientId: number;
  serviceType: string;
  billingPeriod: string;
  amount: number;
  status: string;
  updatedAt: Date;
};

type PendingBill = {
  clientId: number;
  serviceType: string;
  billingPeriod: string;
  amount: number;
  status: string;
};

interface BillApiContextType {
  clients: Client[];
  createBill: (data: CreateBillData) => Promise<{ error: string }>;
  payBill: (data: PayBillData) => Promise<{ error: string }>;
  getPendingBills: (clientId: string) => Promise<[] | { error: string }>;
  getPaymentHistory: (clientId: string) => Promise<[] | { error: string }>;
}

const BillApiContext = createContext<BillApiContextType>({
  clients: [],
  createBill: async () => Promise.resolve({ error: "" }),
  payBill: async () => Promise.resolve({ error: "" }),
  getPendingBills: async () =>
    Promise.resolve([]) || Promise.resolve({ error: "" }),
  getPaymentHistory: async () =>
    Promise.resolve([]) || Promise.resolve({ error: "" }),
});

const BillApiProvider = ({ children }: { children: React.ReactNode }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_URL}/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, [API_URL]);

  const createBill = async (
    data: CreateBillData
  ): Promise<{ error: string }> => {
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
      throw error;
    }
  };

  const payBill = async (data: PayBillData): Promise<{ error: string }> => {
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
      throw error;
    }
  };

  const getPendingBills = async (
    clientId: string
  ): Promise<[] | { error: string }> => {
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
      throw error;
    }
  };

  const getPaymentHistory = async (
    clientId: string
  ): Promise<[] | { error: string }> => {
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
      throw error;
    }
  };

  const value = {
    clients,
    createBill,
    payBill,
    getPendingBills,
    getPaymentHistory,
  };

  return (
    <BillApiContext.Provider value={value}>{children}</BillApiContext.Provider>
  );
};

export {
  BillApiProvider,
  BillApiContext,
  type Client,
  type PaidBill,
  type PendingBill,
};
