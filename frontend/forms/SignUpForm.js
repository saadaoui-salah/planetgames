import { Title } from "@/components/shared/Title";
import Link from "next/link";
import { Input } from "@/forms/Input";
import { Button } from "@/components/shared/Buttons";
import { useSignup } from "@/roupi/auth";

export const SignUpForm = () => {
  const { form, setForm, handleSubmit } = useSignup();
  return (
    <div className="flex p-4 flex-col justify-center items-center h-[40rem] my-16">
      <Title text="Sign Up" />
      <form className=" mt-4 py-8 px-16  border rounded-lg border-gray-200 w-[30rem]">
        <div className="mb-4 block md:flex justify-between">
          <Input
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            label="Full Name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <Input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            label="Email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <Input
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            label="Phone Number"
            type="email"
          />
        </div>
        <div className="mb-4">
          <Input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            label="Password"
          />
        </div>
        <div className="mb-6">
          <Input
            value={form.passwordConfermation}
            onChange={(e) =>
              setForm({ ...form, passwordConfermation: e.target.value })
            }
            type="password"
            label="Confirm Password"
          />
        </div>
        <div className="flex w-full justify-center">
          <Button px="20" onClick={(e) => handleSubmit(e)}>
            Sign Up
          </Button>
        </div>
      </form>
      <Link
        className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="/login"
      >
        Already have an account?
      </Link>
    </div>
  );
};
