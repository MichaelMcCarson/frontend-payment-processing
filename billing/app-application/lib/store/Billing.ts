import type { Billing } from "@demo/billing-app-domain";
import { createStore } from "@demo/shared-app-util-state-management";

interface InitialState {
  billing: Billing | undefined;
}

const initialState: InitialState = {
  billing: undefined,
};

interface StateHandler {
  setBilling: (billing: Billing) => void;
}

type BillingState = InitialState & StateHandler;

export const useBillingStore =
  createStore<BillingState>((set) => {
    return {
      ...initialState,
      setBilling: (billing) => set({ billing }),
    };
  });
