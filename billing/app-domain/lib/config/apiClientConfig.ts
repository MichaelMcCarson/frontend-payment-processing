import getenv from "getenv";

export const REACT_APP_WEB_SCHEMA = getenv.string(
  "REACT_APP_WEB_SCHEMA",
  "https://demo-local.app:3002/"
);

export const API_HOST = getenv.string(
  "REACT_APP_API_HOST",
  "https://demo-local-api.app:3443"
);
