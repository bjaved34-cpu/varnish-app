import { create } from "zustand";

interface AccountDetails {
    name: string;
    email: string;
    password: string;
}

interface OnboardingState {
    accountDetails: AccountDetails;
    domain: string;
    selectedServices: string[];
    setAccountDetails: (details: AccountDetails) => void;
    setDomain: (domain: string) => void;
    toggleService: (serviceId: string) => void;
    reset: () => void;
}

const initialState = {
    accountDetails: {
        name: "",
        email: "",
        password: "",
    },
    domain: "",
    selectedServices: [],
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
    ...initialState,
    setAccountDetails: (details) => set({ accountDetails: details }),
    setDomain: (domain) => set({ domain }),
    toggleService: (serviceId) =>
        set((state) => ({
            selectedServices: state.selectedServices.includes(serviceId)
                ? state.selectedServices.filter((id) => id !== serviceId)
                : [...state.selectedServices, serviceId],
        })),
    reset: () => set(initialState),
}));
