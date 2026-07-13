"use client";

import { useEffect, useState } from "react";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);
  if (!mounted) return null;
  return <SignUpForm />;
}
