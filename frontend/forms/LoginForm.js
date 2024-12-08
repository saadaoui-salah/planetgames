import Link from "next/link";
import { Input } from "@/forms/Input";
import { Title } from "@/components/shared/Title";
import { Button } from "@/components/shared/Buttons";
import { useLogin } from "@/roupi/auth";

export const LoginForm = () => {
  const { auth, handleSubmit, setAuth } = useLogin();

  return (
    <div className="flex flex-col justify-center items-center h-[40rem]">
      <Title text="Login" emoji="&#x1F512;" />
      <form className="w-full mt-4 p-8 max-w-sm border rounded-lg border-gray-200">
        <div className="mb-4">
          <Input
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
            label="Username"
            type="text"
            value={auth.username}
            placeholder="username"
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            value={auth.password}
            label="Password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={(e) => handleSubmit(e)} px="8">
            Sign In
          </Button>
        </div>
      </form>
      <p className="text-gray-900 mt-4">
        You don't have an account
        <Link
          className="px-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/signup"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
