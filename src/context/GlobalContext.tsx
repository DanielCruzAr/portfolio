"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type GlobalContextType = {
    siteVisits: number;
    cvCounter: number;
    dateFilter: number;
    setSiteVisits: React.Dispatch<React.SetStateAction<number>>;
    setCvCounter: React.Dispatch<React.SetStateAction<number>>;
    setDateFilter: React.Dispatch<React.SetStateAction<number>>;
};

// Create context with default undefined (so we can enforce provider usage)
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [siteVisits, setSiteVisits] = useState(0);
    const [cvCounter, setCvCounter] = useState(0);
    const [dateFilter, setDateFilter] = useState(2);

    return (
        <GlobalContext.Provider
            value={{
                siteVisits,
                cvCounter,
                dateFilter,
                setSiteVisits,
                setCvCounter,
                setDateFilter,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook for easy usage
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );
    }
    return context;
};
