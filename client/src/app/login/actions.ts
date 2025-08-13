"use server";
import * as z from "zod";

const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier is required"),
  password: z.string().min(8, "Password should be at least 8 characters long")
});

export async function loginAction(_currentState: unknown, formData: FormData) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  const validation = loginSchema.safeParse({
    identifier,
    password
  });

  if (!validation.success) {
    return {
      success: false,
      //not sending this message because it is not safe to expose validation errors to the client
      //message: validation.error.issues[0].message,
      message: "Invalid identifier or password",
      formData: { identifier, password }
    };
  }

  const loginResponse = await fetch(`${process.env.STRAPI_CMS_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      identifier,
      password
    })
  });

  if (!loginResponse.ok) {
    const errorData = await loginResponse.json();
    return {
      success: false,
      message: errorData.error.message,
      formData: { identifier, password }
    }
  }
  const data = await loginResponse.json();
  //console.log("Login successful:", data);
  return {
    success: true,
    authentication_token: data.jwt
  };
}
