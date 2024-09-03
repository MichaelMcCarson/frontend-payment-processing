import type { ResponseBody } from "@demo/protocol/app-api";
import { apiClient } from "./AuthClient";

export async function createPaymentAccountSession(
  signal?: AbortSignal
): Promise<ResponseBody["create-payment-account-session"]> {
  return apiClient.postAsync("/payment-account/connect", { signal });
}

export async function findPaymentAccount(
  signal?: AbortSignal
): Promise<ResponseBody["find-payment-account"]> {
  return apiClient.getAsync("/payment-account", { signal });
}

export async function createPaymentAccount(
  signal?: AbortSignal
): Promise<ResponseBody["create-payment-account"]> {
  return apiClient.postAsync("/payment-account", { signal });
}

export async function createPaymentAccountLoginLink(
  signal?: AbortSignal
): Promise<ResponseBody["create-payment-account-login-link"]> {
  return apiClient.postAsync("/payment-account/login", { signal });
}

export async function disconnectPaymentAccount(
  signal?: AbortSignal
): Promise<ResponseBody["disconnect-payment-account"]> {
  return apiClient.deleteAsync("/payment-account/connect", {
    signal,
  });
}

export async function deletePaymentAccount(
  signal?: AbortSignal
): Promise<ResponseBody["delete-payment-account"]> {
  return apiClient.deleteAsync("/payment-account", { signal });
}
