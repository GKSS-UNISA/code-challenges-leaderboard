"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth";
import FieldInfo from "@/components/ui/form-info";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  const router = useRouter();

  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        const resp = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.confirmPassword,
        });

        if (resp.error) {
          // send to exception tracking service
          console.error("Registration error:", resp.error);
        }

        form.reset();
        router.push("/login");
      } catch (error: any) {
        form.setErrorMap({
          onSubmit:
            error.message || "Something went wrong, please try again later.",
        });
      }
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit();
  }

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your name, email, passwords & conformation password.
          </CardDescription>
          {form.state.errors && (
            <div className="mt-4">
              {form.state.errors.map((error, i) => {
                return (
                  <p key={i} className="text-destructive text-xs mt-2">
                    {error}
                  </p>
                );
              })}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2 mt-4">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Full name is required"
                      : value.length < 3
                        ? "Full name must be at least 3 characters"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Full Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>

            <div className="grid gap-2">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Email is required" : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>

            <div className="grid gap-2">
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 6
                        ? "Password must be at least 6 characters"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>

            <div className="grid gap-2">
              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Confimation password is required"
                      : value !== form.getFieldValue("password")
                        ? "Passwords do not match"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Confirm password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="password"
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" className="w-full" disabled={!canSubmit}>
                  {isSubmitting ? "Signing up..." : "Sign up"}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-center text-xs text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link
                href="/register"
                className="hover:underline hover:text-foreground"
              >
                Sign in.
              </Link>
            </p>
          </CardFooter>
        </CardContent>
      </form>
    </Card>
  );
}
