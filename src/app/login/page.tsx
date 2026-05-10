"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!validateEmail(email)) {
      next.email = "Enter a valid email address";
    }

    if (!password) {
      next.password = "Password is required";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setFormError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Login failed. Please check your credentials.");
      }

      const token = data.token || data.access_token || data?.data?.token || data?.data?.access_token;
      const userId = data.id || data.user?.id || data?.data?.id;
      const userEmail = data.email || data.user?.email || data?.data?.email;
      const userRole = data.role || data.user?.role || data?.data?.role;

      if (!token) {
        throw new Error("Authentication token was not returned by the login endpoint.");
      }

      localStorage.setItem("onboarding_jwt", token);
      sessionStorage.setItem("onboarding_jwt", token);
      localStorage.setItem(
        "onboarding_user",
        JSON.stringify({ id: userId ?? null, email: userEmail ?? null, role: userRole ?? null })
      );

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("An unexpected error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[460px] flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full rounded-[32px] border border-[#e6eaf2] bg-white/95 px-8 py-10 shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
        >
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8899aa]">Varnish Enterprise</p>
            <h1 className="text-[32px] font-semibold tracking-tight text-[#0f172a]">Welcome back</h1>
            <p className="max-w-[320px] mx-auto text-sm leading-6 text-[#475569]">
              Sign in to manage your domains, billing, hosting, and SSL from one dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-sm font-medium text-[#334155]">
                Email address
              </Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@example.com"
                className="h-12 rounded-xl border border-[#d8dee8] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus-visible:border-[#94a3b8] focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(56,189,248,0.15)]"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "login-email-error" : undefined}
              />
              {errors.email && (
                <p id="login-email-error" className="text-xs text-[#dc2626]" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="login-password" className="text-sm font-medium text-[#334155]">
                  Password
                </Label>
                <button type="button" className="text-sm font-medium text-[#1a2332] hover:text-[#243044]">
                  Forgot password?
                </button>
              </div>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                placeholder="Enter your password"
                className="h-12 rounded-xl border border-[#d8dee8] bg-white px-4 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus-visible:border-[#94a3b8] focus-visible:ring-0 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(56,189,248,0.15)]"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "login-password-error" : undefined}
              />
              {errors.password && (
                <p id="login-password-error" className="text-xs text-[#dc2626]" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {formError && (
              <p className="text-sm text-[#dc2626]" role="alert">
                {formError}
              </p>
            )}

            <div className="flex items-center justify-between gap-3 rounded-2xl border border-[#f1f5f9] bg-[#f8fafc] px-4 py-3 text-sm text-[#475569]">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#cbd5e1] bg-white text-[#1a2332] focus:ring-[#1a2332]"
                />
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="h-12 w-full rounded-xl bg-[#1a2332] text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#243044] hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </motion.div>

        <div className="text-center text-sm text-[#64748b]">
          Don&apos;t have an account yet?{" "}
          <Link href="/onboarding/account-details" className="font-semibold text-[#1a2332] hover:text-[#243044]">
            Create one to begin onboarding.
          </Link>
        </div>
      </div>
    </div>
  );
}
