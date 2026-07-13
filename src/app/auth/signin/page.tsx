"use client";

import { useEffect, useState } from "react";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);
  if (!mounted) return null;
  return <SignInForm />;
}
