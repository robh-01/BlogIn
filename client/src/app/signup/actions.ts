"use server";
import * as z from "zod";

const signupSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password should be at least 8 characters long")
});

export async function signupAction(_currentState: unknown, formData: FormData) {
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const validation = signupSchema.safeParse({
    firstname,
    lastname,
    username,
    email,
    password
  });

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
      formData: { firstname, lastname, username, email, password }
    };
  }

  const signupResponse = await fetch(`${process.env.STRAPI_CMS_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // not sending firstname and lastname to the server
    // as strapi does not support it
    // it only supports username, email and Password
    // i think i should use custor authentication
    // but for now, i will just send username, email and password
    body: JSON.stringify({
      username,
      email,
      password,
    })
  });

  if (!signupResponse.ok) {
    const errorData = await signupResponse.json();
    return {
      success: false,
      message: errorData.error.message,
      formData: { firstname, lastname, username, email }
    };
  }

  const data = await signupResponse.json();
  return {
    success: true,
    authentication_token: data.jwt
  };
}



