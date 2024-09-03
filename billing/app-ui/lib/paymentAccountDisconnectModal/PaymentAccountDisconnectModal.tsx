import React from "react";
import {
  CircularProgress,
  Modal,
  PrimaryButton,
  SecondaryButton,
} from "@demo/ui-design-system";
import { CircularProgressContainer } from "./PaymentAccountDisconnectModalStyles";

export namespace PaymentAccountDisconnectModal {
  export interface Props {
    isPaymentAccountDisconnectOpen: boolean;
    isPaymentAccountDisconnectPending: boolean;
    onDisconnectAccount: () => void;
    onPaymentAccountDisconnectOpen: () => void;
  }
}

export function PaymentAccountDisconnectModal({
  isPaymentAccountDisconnectOpen,
  isPaymentAccountDisconnectPending,
  onDisconnectAccount,
  onPaymentAccountDisconnectOpen,
}: PaymentAccountDisconnectModal.Props): JSX.Element | null {

  return isPaymentAccountDisconnectOpen ? (
    <Modal
      open={!!isPaymentAccountDisconnectOpen}
      title="Disconnect Stripe account?"
      primaryAction={
        !isPaymentAccountDisconnectPending ? (
          <PrimaryButton onClick={onDisconnectAccount}>
            Disconnect
          </PrimaryButton>
        ) : (
          <CircularProgressContainer>
            <CircularProgress />
          </CircularProgressContainer>
        )
      }
      secondaryAction={
        <SecondaryButton onClick={onPaymentAccountDisconnectOpen}>
          Do not disconnect
        </SecondaryButton>
      }
    />
  ) : null;
}
