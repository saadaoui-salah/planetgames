"use client";
import Head from "next/head";
import { SignUpForm } from "@/forms/SignUpForm";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/contextProvider";

export default function SignUp() {
  const router = useRouter()
  const {profile} = useStateContext()
  if (profile.email) router.push('/')
  return (
    <>
      <Head>
        <meta
          name="google-signin-client_id"
          content="626908472574-pkrn39o1ded5r8gi2guckphcnpimn4f1.apps.googleusercontent.com"
        ></meta>
      </Head>
      <SignUpForm />
    </>
  );
}
