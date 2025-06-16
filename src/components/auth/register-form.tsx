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
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { authClient } from "@/lib/auth";
import Link from "next/link";

export default function RegisterForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      const { value: val } = values;
      try {
        const resp = await authClient.signUp.email({
          name: val.name,
          email: val.email,
          password: val.confirmPassword,
        });

        if (resp.error) {
          console.error("Sign up error:", resp.error);
          return;
        }

        console.log("Sign up successful:", resp.data);
        form.reset();

        // redirect to home page
      } catch (error) {
        console.error("Error during sign up:", error);
      }
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your name, email, passwords & conformation password.
          </CardDescription>
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

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-destructive text-xs">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
