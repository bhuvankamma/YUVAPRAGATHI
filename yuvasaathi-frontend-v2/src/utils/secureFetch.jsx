import { getRecaptchaToken } from "./recaptcha";

export async function secureFetch(url, options = {}, action = "submit") {
  const token = await getRecaptchaToken(action);

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const body = options.body ? JSON.parse(options.body) : {};
  const secureBody = JSON.stringify({ ...body, token });

  return fetch(url, { ...options, headers, body: secureBody });
}
