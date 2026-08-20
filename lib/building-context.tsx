"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

const STORAGE_KEY = "baechuri-building";

interface BuildingContextValue {
  buildingId: string | null;
  setBuildingId: (id: string) => void;
  ready: boolean;
}

const BuildingContext = createContext<BuildingContextValue | null>(null);

export function BuildingProvider({ children }: { children: ReactNode }) {
  const [buildingId, setBuildingIdState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBuildingIdState(stored);
    }
    setReady(true);
  }, []);

  const setBuildingId = (id: string) => {
    setBuildingIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <BuildingContext.Provider value={{ buildingId, setBuildingId, ready }}>
      {children}
    </BuildingContext.Provider>
  );
}

export function useBuilding() {
  const ctx = useContext(BuildingContext);
  if (!ctx) {
    throw new Error("useBuilding must be used within a BuildingProvider");
  }
  return ctx;
}
