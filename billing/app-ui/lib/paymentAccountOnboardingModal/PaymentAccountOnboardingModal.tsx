import type { StripeConnectInstance } from "@stripe/connect-js";
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import React from "react";
import { HeightModal } from "@demo/ui-design-system";
import { PaymentAccountOnboardingContent } from "./PaymentAccountOnboardingModalStyles";

export namespace PaymentAccountOnboardingModal {
  export interface Props {
    hasOnboardingExited: boolean;
    isAccountCreatePending: boolean;
    stripeConnectInstance: StripeConnectInstance | null;
    onPaymentAccountOnboardingAbandonment: () => void;
    onPaymentAccountOnboardingCompleted: (value: boolean) => void;
  }
}

export function PaymentAccountOnboardingModal({
  hasOnboardingExited,
  isAccountCreatePending,
  stripeConnectInstance,
  onPaymentAccountOnboardingAbandonment,
  onPaymentAccountOnboardingCompleted,
}: PaymentAccountOnboardingModal.Props): JSX.Element | null {
  const isOnboardingInProgress =
    stripeConnectInstance && isAccountCreatePending && !hasOnboardingExited;
  return isOnboardingInProgress ? (
    <HeightModal
      open={isOnboardingInProgress}
      title="Connect to Stripe"
      onDiscard={onPaymentAccountOnboardingAbandonment}
    >
      <PaymentAccountOnboardingContent>
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding
            onExit={() => onPaymentAccountOnboardingCompleted(true)}
          />
        </ConnectComponentsProvider>
      </PaymentAccountOnboardingContent>
    </HeightModal>
  ) : null;
}
