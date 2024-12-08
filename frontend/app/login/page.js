"use client";
import { useStateContext } from "@/context/contextProvider";
import { LoginForm } from "@/forms/LoginForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const {profile} = useStateContext()
  if (profile.email) router.push('/')
  return <LoginForm />;
}
