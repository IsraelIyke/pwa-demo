"use client";

import { BeforeInstallPromptEvent } from "@/types/pwa";

interface InstallPromptProps {
  installPrompt: BeforeInstallPromptEvent | null;
  onInstall: () => void;
}

export default function InstallPrompt({
  installPrompt,
  onInstall,
}: InstallPromptProps) {
  if (!installPrompt) return null;

  return (
    <div style={styles.installBanner}>
      <p>Install our app for a better experience!</p>
      <button onClick={onInstall} style={styles.installButton}>
        Install App
      </button>
    </div>
  );
}

const styles = {
  installBanner: {
    position: "fixed" as const,
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    zIndex: 1000,
    maxWidth: "90%",
  },
  installButton: {
    padding: "8px 16px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
