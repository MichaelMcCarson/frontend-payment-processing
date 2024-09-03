import React from "react";
import { CircularProgress, Panel, Paragraph } from "@demo/ui-design-system";
import { CircularProgressContainer } from "./PaymentAccountCreationPromptStyles";

export namespace PaymentAccountCreationPrompt {
  export interface Props {
    isAccountCreatePending: boolean;
    hasOnboardingExited: boolean;
    paymentAccountId: string | null;
  }
}

export function PaymentAccountCreationPrompt({
  isAccountCreatePending,
  hasOnboardingExited,
  paymentAccountId,
}: PaymentAccountCreationPrompt.Props): JSX.Element | null {
  return Boolean(paymentAccountId) ||
    isAccountCreatePending ||
    hasOnboardingExited ? (
    <Panel alignLeft title="Connect to Stripe">
      <Paragraph>
        To receive registration funds, you must connect to a stripe account.
      </Paragraph>
      <CircularProgressContainer>
        <CircularProgress />
      </CircularProgressContainer>
    </Panel>
  ) : null;
}
