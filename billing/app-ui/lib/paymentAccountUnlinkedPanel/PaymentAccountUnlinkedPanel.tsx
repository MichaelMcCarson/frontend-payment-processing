import React from "react";
import { Panel, Paragraph, PrimaryButton } from "@demo/ui-design-system";

export namespace PaymentAccountUnlinkedPanel {
  export interface Props {
    isAccountCreatePending: boolean;
    paymentAccountId: string | null;
    onCreatePaymentAccount: () => void;
  }
}

export function PaymentAccountUnlinkedPanel({
  isAccountCreatePending,
  paymentAccountId,
  onCreatePaymentAccount,
}: PaymentAccountUnlinkedPanel.Props): JSX.Element | null {
  return !isAccountCreatePending && !paymentAccountId ? (
    <Panel alignLeft title="Connect to Stripe">
      <Paragraph>
        To receive registration funds, you must connect to a stripe account.
      </Paragraph>
      <PrimaryButton
        className="stripe-connect"
        onClick={onCreatePaymentAccount}
      >
        Connect to Stripe
      </PrimaryButton>
    </Panel>
  ) : null;
}
