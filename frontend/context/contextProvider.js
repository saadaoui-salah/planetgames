"use client";

import { createContext, useContext, useState } from "react";
import { PushNotification } from "../components/PushNotification";
export const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({})
  const [notification, setNotifiction] = useState({
    type: null,
    message: null,
  });

  const [cron, setCron] = useState(false);
  const handleNotification = ({ type, message }) => {
    setNotifiction({ type: type, message: message });
    if (cron) clearTimeout(cron);
    const tim = setTimeout(() => {
      setNotifiction({ type: null, message: null });
    }, 4000);
    setCron(tim);
  };

  return (
    <StateContext.Provider
      value={{
        handleNotification,
        profile,
        setProfile
      }}
    >
      {children}
      {notification.type && (
        <PushNotification
          type={notification.type}
          message={notification.message}
          onClick={() => setNotifiction({ type: "", message: "" })}
        />
      )}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
