import React from "react";
import { useConnectPaymentAccount } from "@demo/billing-app-application";
import {
  PaymentAccountConnectedPanel,
  PaymentAccountCreationPrompt,
  PaymentAccountDisconnectModal,
  PaymentAccountOnboardingModal,
  PaymentAccountUnlinkedPanel,
} from "@demo/billing-app-ui";
import {
  Header,
  MainContent,
  Paragraph,
  Skeleton,
} from "@demo/ui-design-system";

export function PaymentsAccount(): JSX.Element {
  const {
    connectedPaymentAccount,
    hasConnectionError,
    hasOnboardingExited,
    isAccountCreatePending,
    isPaymentAccountDisconnectPending,
    isPaymentAccountDisconnectOpen,
    stripeConnectInstance,
    onBack,
    onCreatePaymentAccount,
    onDisconnectAccount,
    onOpenPaymentAccountDashboard,
    onPaymentAccountDisconnectOpen,
    onPaymentAccountOnboardingAbandonment,
    onPaymentAccountOnboardingCompleted,
  } = useConnectPaymentAccount();

  return (
    <Skeleton>
      <Header title="User Payments" closeIcon="back" onClose={onBack} />
      <MainContent>
        <PaymentAccountUnlinkedPanel
          {...{
            isAccountCreatePending,
            paymentAccountId: connectedPaymentAccount?.accountId ?? null,
            onCreatePaymentAccount,
          }}
        />

        <PaymentAccountOnboardingModal
          isAccountCreatePending={isAccountCreatePending}
          stripeConnectInstance={stripeConnectInstance}
          hasOnboardingExited={hasOnboardingExited}
          onPaymentAccountOnboardingCompleted={
            onPaymentAccountOnboardingCompleted
          }
          onPaymentAccountOnboardingAbandonment={
            onPaymentAccountOnboardingAbandonment
          }
        />

        {hasConnectionError && (
          <Paragraph className="error">Something went wrong!</Paragraph>
        )}

        <PaymentAccountCreationPrompt
          isAccountCreatePending={isAccountCreatePending}
          hasOnboardingExited={hasOnboardingExited}
          paymentAccountId={connectedPaymentAccount?.accountId ?? null}
        />

        <PaymentAccountConnectedPanel
          isPaymentAccountConnected={!!connectedPaymentAccount}
          stripeConnectInstance={stripeConnectInstance}
          connectedPaymentAccount={connectedPaymentAccount}
          onOpenPaymentAccountDashboard={onOpenPaymentAccountDashboard}
          onPaymentAccountDisconnectOpen={onPaymentAccountDisconnectOpen}
        />

        <PaymentAccountDisconnectModal
          {...{
            isPaymentAccountDisconnectPending,
            isPaymentAccountDisconnectOpen,
            onDisconnectAccount,
            onPaymentAccountDisconnectOpen,
          }}
        />
      </MainContent>
    </Skeleton>
  );
}
