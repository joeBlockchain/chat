"use client";

import Link from "next/link";
import { signInWithEmail } from "@/utils/auth-helpers/server";
import { handleRequest } from "@/utils/auth-helpers/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";

// Define prop type with allowPassword boolean
interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton,
}: EmailSignInProps) {
  const router = redirectMethod === "client" ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <form noValidate={true} className="" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              // className="w-full p-3 rounded-md bg-zinc-800"
            />
          </div>
          <Button
            // variant="slim"
            type="submit"
            // className="mt-1"
            // loading={isSubmitting}
            disabled={disableButton}
          >
            Sign in
          </Button>
        </div>
      </form>
      <div className="mt-4 space-y-4">
        {allowPassword && (
          <p>
            <Link href="/signin/password_signin" className="font-light text-sm">
              Sign in with <span className="underline">email and password</span>
            </Link>
          </p>
        )}
        <p>
          <div className=" text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signin/signup" className="underline">
              Sign up
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
}