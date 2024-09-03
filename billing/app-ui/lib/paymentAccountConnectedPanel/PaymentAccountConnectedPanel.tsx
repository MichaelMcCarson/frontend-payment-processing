import type { StripeConnectInstance } from "@stripe/connect-js";
import React from "react";
import type { PaymentAccount } from "@demo/billing-shared-domain";
import { Panel, Paragraph } from "@demo/ui-design-system";
import {
  ActionsContainer,
  DisconnectButton,
  EmailChip,
  ViewAccountButton,
} from "./PaymentAccountConnectedPanelStyles";

export namespace PaymentAccountConnectedPanel {
  export interface Props {
    connectedPaymentAccount: PaymentAccount | null;
    isPaymentAccountConnected: boolean;
    stripeConnectInstance: StripeConnectInstance | null;
    onOpenPaymentAccountDashboard: () => void;
    onPaymentAccountDisconnectOpen: () => void;
  }
}

export function PaymentAccountConnectedPanel({
  connectedPaymentAccount,
  isPaymentAccountConnected,
  stripeConnectInstance,
  onOpenPaymentAccountDashboard,
  onPaymentAccountDisconnectOpen,
}: PaymentAccountConnectedPanel.Props): JSX.Element | null {
  return stripeConnectInstance &&
    connectedPaymentAccount &&
    isPaymentAccountConnected ? (
    <Panel alignLeft title="Connect to Stripe">
      <Paragraph>
        To receive registration funds, you must connect to a stripe account.
      </Paragraph>
      <ActionsContainer>
        <ViewAccountButton onClick={onOpenPaymentAccountDashboard}>
          View Stripe account
        </ViewAccountButton>
        <DisconnectButton onClick={onPaymentAccountDisconnectOpen}>
          Disconnect Stripe account
        </DisconnectButton>
      </ActionsContainer>
      <EmailChip
        value="account-holder-email"
        className="account-holder-email"
        palette="info"
        selectValues={{
          id: "email",
          isSelected: false,
        }}
      >
        {connectedPaymentAccount.accountHolderEmail}
      </EmailChip>
    </Panel>
  ) : null;
}
