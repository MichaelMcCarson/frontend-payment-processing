import {
  createPaymentAccount,
  createPaymentAccountLoginLink,
  createPaymentAccountSession,
  deletePaymentAccount,
  disconnectPaymentAccount,
  findPaymentAccount,
} from "@demo/billing-app-data-access";

import type {
  PaymentAccount,
  PaymentAccountLoginLink,
} from "@demo/billing-shared-domain";

export async function fetchClientSecret(): Promise<string> {
  const accountSession = await createPaymentAccountSession();
  return accountSession.clientSecret;
}

export async function findPaymentAccountId(): Promise<PaymentAccount | null> {
  return findPaymentAccount();
}

export async function createPaymentAccount(): Promise<PaymentAccount> {
  return createPaymentAccount();
}

export async function createPaymentAccountLoginLink(): Promise<PaymentAccountLoginLink> {
  return createPaymentAccountLoginLink();
}

export async function disconnectPaymentAccount(): Promise<void> {
  return disconnectPaymentAccount();
}

export async function deletePaymentAccount(): Promise<void> {
  return deletePaymentAccount();
}
