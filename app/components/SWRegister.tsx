"use client";

import { useEffect } from "react";

export default function SWRegister(): null {
  useEffect(() => {
    const registerServiceWorker = async (): Promise<void> => {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("SW registered: ", registration);
        } catch (registrationError) {
          console.log("SW registration failed: ", registrationError);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return null;
}
