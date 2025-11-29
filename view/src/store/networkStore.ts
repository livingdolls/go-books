import { create } from "zustand";

type NetworkState = {
    isLoading: boolean;
    setLoading: (v: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
    isLoading: false,
    setLoading: (v: boolean) => set({ isLoading: v }),
}));