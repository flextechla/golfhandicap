"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import PasswordInput from "./PasswordInput";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { AuthMode } from "@/types";

export default function AuthForm() {
  const supabase = createClient();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "recovery") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?mode=reset`,
        });
        if (error) throw error;
        setMessage("Check your email for a reset link.");
        return;
      }

      if (mode === "signup") {
        if (password !== confirmPw) {
          setError("Passwords do not match.");
          return;
        }
        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            display_name: displayName || email.split("@")[0],
          });
        }
        setMessage("Check your email to confirm your account.");
        return;
      }

      // Sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<AuthMode, string> = {
    signin: "Welcome Back",
    signup: "Create Account",
    recovery: "Reset Password",
  };

  const buttonLabels: Record<AuthMode, string> = {
    signin: "Sign In",
    signup: "Create Account",
    recovery: "Send Reset Link",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-golf-800 via-golf-700 to-golf-900">
      <Card className="w-full max-w-md !bg-white dark:!bg-zinc-900">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-golf-700 text-white text-3xl mb-3">
            ⛳
          </div>
          <h1 className="font-display text-2xl text-zinc-900 dark:text-zinc-100">
            {titles[mode]}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Golf Tracker</p>
        </div>

        {/* Mode toggle */}
        <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 mb-5">
          {(["signin", "signup"] as AuthMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); setMessage(""); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                mode === m
                  ? "bg-white dark:bg-zinc-700 text-golf-700 shadow-sm"
                  : "text-zinc-500"
              }`}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-base outline-none focus:ring-2 focus:ring-golf-500"
          />

          {mode !== "recovery" && (
            <>
              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {mode === "signup" && (
                <PasswordInput
                  placeholder="Confirm Password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
              )}
            </>
          )}
        </div>

        {/* Error / Message */}
        {error && (
          <p className="text-danger text-sm mt-3 font-medium">{error}</p>
        )}
        {message && (
          <p className="text-golf-700 text-sm mt-3 font-medium">{message}</p>
        )}

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-5"
        >
          {loading ? "Loading..." : buttonLabels[mode]}
        </Button>

        {/* Forgot password link */}
        {mode === "signin" && (
          <button
            onClick={() => { setMode("recovery"); setError(""); setMessage(""); }}
            className="w-full text-center text-sm text-golf-700 mt-3 hover:underline"
          >
            Forgot password?
          </button>
        )}

        {mode === "recovery" && (
          <button
            onClick={() => setMode("signin")}
            className="w-full text-center text-sm text-zinc-500 mt-3 hover:underline"
          >
            ← Back to Sign In
          </button>
        )}
      </Card>
    </div>
  );
}
