"use client";
import { useSettings } from "@/roupi/auth";
import { Button } from "@/components/shared/Buttons";
import { Title } from "@/components/shared/Title";
import { Input } from "@/forms/Input";
import useWithAuth from "@/app/_authRouter";
import { MEDIA_URL } from "@/roupi/utils";
import Head from "next/head";
import { useEffect } from "react";

export const DragAndDrop = ({ className, label, url, setSettings }) => {
  function handleDragOver(event) {
    event.preventDefault();
  }
  useEffect(() => {
    const dropzone = document.getElementById("dropzone");
    dropzone.style.backgroundImage = `url(${
      url ? MEDIA_URL + url.replace("/media/", "") : ''
    })`;
    dropzone.style.backgroundSize = "100%";
  }, [url]);
  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImage(file);
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    handleImage(file);
  }

  function handleImage(file) {
    if (file && file.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dropzone = document.getElementById("dropzone");
        dropzone.style.backgroundImage = `url(${e.target.result})`;
        dropzone.style.backgroundSize = "100%";
      };
      reader.readAsDataURL(file);
      setSettings((settings) => ({ ...settings, image: file }));
    }
  }
  const onClick = () => {
    const inpt = document.getElementById("file-upload");
    inpt.click();
  };
  return (
    <div
      className={`border-2 w-28 h-28 mb-2 cursor-pointer border-dashed ${className} border-gray-400 dark:border-gray-300 rounded-full flex items-center justify-center cursor-pointer`}
      id="dropzone"
      onClick={() => onClick()}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <label htmlFor="file-upload" className="flex items-center justify-center">
        <span className="text-gray-800 dark:text-gray-200">{label}</span>
      </label>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileInputChange(e)}
      />
    </div>
  );
};

function Settings() {
  const { handleSubmit, settings, setSettings } = useSettings();
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <main className="min-h-[70vh] flex flex-col items-center justify-center py-14">
        <Title text={"Account Settings"} />
        <div className="flex flex-col items-center justify-center mt-4 py-8 px-16  border rounded-lg border-gray-200 w-[30rem]">
          <DragAndDrop url={settings.image} setSettings={setSettings} />
          <div>
              <Input
                onChange={(e) =>
                  setSettings({ ...settings, fullName: e.target.value })
                }
                value={settings.fullName}
                label="Full Name"
                type="text"
              />
            <div className="mb-4">
              <Input
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                value={settings.email}
                label="Email"
                type="email"
              />
            </div>
            <div className="mb-4">
              <Input
                onChange={(e) =>
                  setSettings({ ...settings, phoneNumber: e.target.value })
                }
                value={settings.phoneNumber}
                label="Phone Number"
                type="email"
              />
            </div>
            <div className="mb-4">
              <Input
                onChange={(e) =>
                  setSettings({ ...settings, oldPassword: e.target.value })
                }
                value={settings.oldPassword}
                type="password"
                label="Old Password"
              />
            </div>
            <div className="mb-4">
              <Input
                onChange={(e) =>
                  setSettings({ ...settings, password: e.target.value })
                }
                value={settings.password}
                type="password"
                label="New Password"
              />
            </div>
            <div className="mb-6">
              <Input
                value={settings.passwordConfermation}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    passwordConfermation: e.target.value,
                  })
                }
                type="password"
                label="Confirm Password"
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <Button onClick={(e) => handleSubmit(e)} px="8">
              Update
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default useWithAuth(Settings);
