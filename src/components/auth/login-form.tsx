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
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/ui/form-info";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      error: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          form.setErrorMap({
            // @ts-expect-error: allow force setting of error message
            onSubmit: error.message || "Login failed",
          });

          // reset email & password fields
          form.resetField("email");
          form.resetField("password");
          return;
        }

        form.reset();
        router.push("/dashboard");
      } catch (error) {
        console.error("Error during login:", error);
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {form.state.errors && (
            <div className="mt-4">
              {form.state.errors.map((error, i) => {
                return (
                  <p
                    key={`error_${i}`}
                    className="text-destructive text-xs mt-2"
                  >
                    {error}
                  </p>
                );
              })}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid gap-2">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : !value.includes("@")
                        ? "Invalid email"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="your@example.com"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
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
                    !value ? "Password is required" : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      type="password"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      required
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" className="w-full" disabled={!canSubmit}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            )}
          </form.Subscribe>

          <p className="text-center text-xs text-muted-foreground mt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="hover:underline hover:text-foreground"
            >
              Sign up.
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
