"use client";

import { useEffect, useState } from "react";
import { useGET, usePOST } from "./utils";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/contextProvider";

interface Profile {
    fullName?: string,
    email: string,
    id: string,
    phoneNumber?: string,
    image?: string,
    oldPassword?: string,
    password?: string,
    passwordConfermation?: string,
}


export const useSettings = () => {
  const {setProfile} = useStateContext()
  const [settings, setSettings] = useState<Profile>({});
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    usePOST("user/update/", {
      data: settings,
    }).then((res) => {
      if (res?.type == "success") {
        setRefresh(!refresh);
      }
    });
  };
  useEffect(() => {
    useGET("user/settings/", {}).then((res) => {
      if (res?.type == "success") {
        setSettings({
          ...settings,
          fullName: res.data.first_name,
          id: res.data.id,
          email: res.data.email,
          phoneNumber: res.data.phone_number,
          image: res.data.image,
        });
        
        setProfile({
          id: res.data.id,
          fullName: res.data.full_name,
          email: res.data.email,
          phoneNumber: res.data.phone_number,
          image: res.data.image,
        })
      }
    });
    return;
  }, [refresh]);
  return { settings, handleSubmit, setSettings };
};

export const useLogin = () => {
  const {setProfile} = useStateContext()
  const [auth, setAuth] = useState<object>({ username: "", password: "" });
  const router = useRouter();
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const res = usePOST("user/login/", {
      data: auth,
    }).then((res) => {
      if (res?.type == "success") {
        setProfile({
          fullName: res.data.full_name,
          email: res.data.email,
          image: res.data.image,
          phoneNumber: res.data.phone_number,
        })
        router.replace("/products");
      }
    });
  };
  return { handleSubmit, setAuth, auth };
};

export const useSignup = () => {
  const router = useRouter();
  const [form, setForm] = useState<Profile>({});
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const res = usePOST("user/signup/", {
      data: form,
    }).then((res) => {
      
      if (res.type == "success") {
        router.replace("/login");
      }
    });
  };
  return { handleSubmit, form, setForm };
};
