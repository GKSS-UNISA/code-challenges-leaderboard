"use server";

import { auth } from "@/lib/auth";

interface RegisterUserParams {
  name: string;
  email: string;
  password: string;
}

async function registerUserAction({
  name,
  email,
  password,
}: RegisterUserParams) {
  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      // change this to use environment variable
      callbackURL: "/login",
    },
  });
}

export { registerUserAction };
