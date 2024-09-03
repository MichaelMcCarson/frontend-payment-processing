import type { StripeConnectInstance } from "@stripe/connect-js";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import { useCallback, useEffect, useState } from "react";
import { toPaymentSettings } from "@demo/admin-shared-domain";
import { getPublicKey } from "@demo/billing-app-data-access";
import type { PaymentAccount } from "@demo/billing-shared-domain";
import { logger } from "@demo/logger";
import { useNavigate } from "@demo/shared-app-util-routing";
import { useInAppBrowser } from "@demo/util-cross-platform-kernel";
import {
  createPaymentAccount,
  createPaymentAccountLoginLink,
  deletePaymentAccount,
  disconnectPaymentAccount,
  fetchClientSecret,
  findPaymentAccountId,
} from "../services/PaymentAccountService";

interface UseConnectPaymentAccount {
  connectedPaymentAccount: PaymentAccount | null;
  hasConnectionError: boolean;
  hasOnboardingExited: boolean;
  isAccountCreatePending: boolean;
  isPaymentAccountDisconnectPending: boolean;
  isPaymentAccountDisconnectOpen: boolean;
  stripeConnectInstance: StripeConnectInstance | null;
  onBack: () => void;
  onCreatePaymentAccount: () => void;
  onDisconnectAccount: () => void;
  onOpenPaymentAccountDashboard: () => void;
  onPaymentAccountDisconnectOpen: () => void;
  onPaymentAccountOnboardingAbandonment: () => void;
  onPaymentAccountOnboardingCompleted: () => void;
}

export function useConnectPaymentAccount(): UseConnectPaymentAccount {
  const [stripeConnectInstance, setStripeConnectInstance] =
    useState<StripeConnectInstance | null>(null);
  const [connectedPaymentAccount, setConnectedPaymentAccount] =
    useState<PaymentAccount | null>(null);
  const [isAccountCreatePending, setIsAccountCreatePending] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [isPaymentAccountDisconnectOpen, setIsPaymentAccountDisconnectOpen] =
    useState(false);
  const [
    isPaymentAccountDisconnectPending,
    setIsPaymentAccountDisconnectPending,
  ] = useState(false);
  const [hasOnboardingExited, setHasOnboardingExited] = useState(false);

  const openLink = useInAppBrowser();
  const navigate = useNavigate();

  const configureConnectedPaymentAccount = useCallback(
    (paymentAccount: PaymentAccount | null): void => {
      if (!paymentAccount?.accountId) {
        return;
      }
      setConnectedPaymentAccount(paymentAccount);
    },
    []
  );

  const connectAccount = useCallback(() => {
    getPublicKey()
      .then((key) => {
        const connectInstance = loadConnectAndInitialize({
          publishableKey: key,
          fetchClientSecret,
        });

        setStripeConnectInstance(connectInstance);
      })
      .catch((error) => {
        setHasConnectionError(true);
        logger.catch(`Failed to fetch public key. ${error.message}`);
      });
  }, []);

  const onCreatePaymentAccount = useCallback(() => {
    if (stripeConnectInstance) {
      return;
    }

    setIsAccountCreatePending(true);

    createPaymentAccount()
      .then(configureConnectedPaymentAccount)
      .catch(logger.catch("Failed to create payment account"));
  }, [configureConnectedPaymentAccount, stripeConnectInstance]);

  useEffect(() => {
    if (!connectedPaymentAccount?.accountId) {
      findPaymentAccountId()
        .then(configureConnectedPaymentAccount)
        .catch(logger.catch("Failed to fetch payment account id"));
    }

    const isAccountConnectedOrNoAccountCreated =
      !connectedPaymentAccount?.accountId || Boolean(stripeConnectInstance);

    if (isAccountConnectedOrNoAccountCreated) {
      return;
    }

    connectAccount();
  }, [
    configureConnectedPaymentAccount,
    connectAccount,
    connectedPaymentAccount?.accountId,
    stripeConnectInstance,
  ]);

  const onBack = (): void => {
    navigate(toPaymentSettings);
  };

  const onPaymentAccountDisconnectOpen = (): void => {
    setIsPaymentAccountDisconnectOpen((open) => !open);
  };

  const onPaymentAccountOnboardingAbandonment = (): void => {
    setIsPaymentAccountDisconnectOpen(false);
    deletePaymentAccount()
      .then(resetPaymentAccount)
      .catch(logger.catch("Failed to delete payment account"));
  };

  const resetPaymentAccount = (): void => {
    setConnectedPaymentAccount(null);
    setStripeConnectInstance(null);
    setHasOnboardingExited(false);
    setIsAccountCreatePending(false);
    setIsPaymentAccountDisconnectPending(false);
    setIsPaymentAccountDisconnectOpen(false);
  };

  const onDisconnectAccount = (): void => {
    setIsPaymentAccountDisconnectPending(true);
    disconnectPaymentAccount()
      .then(resetPaymentAccount)
      .catch(logger.catch("Failed to disconnect payment account"));
  };

  const onOpenPaymentAccountDashboard = (): void => {
    createPaymentAccountLoginLink()
      .then((PaymentAccountLoginLink) => {
        openLink(PaymentAccountLoginLink.url).catch(
          logger.catch("Failed to open Payment Account Dashboard")
        );
      })
      .catch(logger.catch("Failed to create payment account link"));
  };

  const onPaymentAccountOnboardingCompleted = (): void => {
    setHasOnboardingExited(true);
    setIsAccountCreatePending(false);
  };

  return {
    connectedPaymentAccount,
    hasConnectionError,
    hasOnboardingExited,
    isAccountCreatePending,
    isPaymentAccountDisconnectOpen,
    isPaymentAccountDisconnectPending,
    stripeConnectInstance,
    onBack,
    onCreatePaymentAccount,
    onDisconnectAccount,
    onOpenPaymentAccountDashboard,
    onPaymentAccountDisconnectOpen,
    onPaymentAccountOnboardingAbandonment,
    onPaymentAccountOnboardingCompleted,
  };
}
