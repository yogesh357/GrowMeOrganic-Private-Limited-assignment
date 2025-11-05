
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ArtworksApiResponse, Artwork } from "../types/api";

interface AppContextType {
  apiData: Artwork[];
  pagination?: ArtworksApiResponse["pagination"];
  loading: boolean;
  error?: string;
  fetchApiData: (page: number) => Promise<void>;
  currentPage: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [apiData, setApiData] = useState<Artwork[]>([]);
  const [pagination, setPagination] = useState<AppContextType["pagination"]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchApiData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await axios.get<ArtworksApiResponse>(
        `https://api.artic.edu/api/v1/artworks?page=${page}`
      );
      console.log(`Fetched page ${page}:`, response.data.data);
      setApiData(response.data.data);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch artwork data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData(1); 
  }, []);

  const value: AppContextType = {
    apiData,
    pagination,
    loading,
    error,
    fetchApiData,
    currentPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};  
