"use client";

import { useState, useEffect, JSX } from "react";
import { BeforeInstallPromptEvent, PWAData, StyleProps } from "@/types/pwa";
import SWRegister from "./components/SWRegister";
import InstallPrompt from "./components/InstallPrompt";
import Counter from "./components/Counter";

export default function Home(): JSX.Element {
  const [pwaData, setPwaData] = useState<PWAData>({
    installPrompt: null,
    isInstallable: false,
  });
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    // Handle before install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent): void => {
      e.preventDefault();
      setPwaData({
        installPrompt: e,
        isInstallable: true,
      });
    };

    // Handle app installed event
    const handleAppInstalled = (): void => {
      setPwaData((prev) => ({
        ...prev,
        isInstallable: false,
      }));
    };

    // Handle online/offline status
    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    // Add event listeners
    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Set initial online status
    setIsOnline(navigator.onLine);

    return (): void => {
      // Cleanup event listeners
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstallClick = async (): Promise<void> => {
    if (!pwaData.installPrompt) return;

    try {
      await pwaData.installPrompt.prompt();
      const { outcome } = await pwaData.installPrompt.userChoice;

      if (outcome === "accepted") {
        setPwaData((prev) => ({
          ...prev,
          isInstallable: false,
        }));
      }
    } catch (error) {
      console.error("Error during installation:", error);
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <h1 style={styles.title}>Simple PWA</h1>
          <p style={styles.subtitle}>Progressive Web App with TypeScript</p>

          {/* Online Status Indicator */}
          <div
            style={{
              ...styles.statusIndicator,
              backgroundColor: isOnline ? "#4CAF50" : "#ff4444",
            }}
          >
            {isOnline ? "Online" : "Offline"}
          </div>
        </header>

        {/* Counter Component */}
        <Counter initialCount={0} />

        {/* Features List */}
        <div style={styles.features}>
          <h2 style={styles.featuresTitle}>PWA Features:</h2>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>✓ Installable on devices</li>
            <li style={styles.featureItem}>✓ Works offline</li>
            <li style={styles.featureItem}>✓ Responsive design</li>
            <li style={styles.featureItem}>✓ Fast loading</li>
            <li style={styles.featureItem}>✓ TypeScript powered</li>
          </ul>
        </div>

        {/* Install Prompt */}
        {pwaData.isInstallable && (
          <div style={styles.installSection}>
            <button
              style={styles.installButton}
              onClick={handleInstallClick}
              aria-label="Install application"
            >
              Install App
            </button>
            <p style={styles.installText}>
              Install this app on your device for better experience
            </p>
          </div>
        )}

        {/* App Info */}
        <div style={styles.info}>
          <h3>App Information</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <strong>Version:</strong> 1.0.0
            </div>
            <div style={styles.infoItem}>
              <strong>Built with:</strong> Next.js + TypeScript
            </div>
            <div style={styles.infoItem}>
              <strong>Storage:</strong>{" "}
              {typeof navigator.storage !== "undefined"
                ? "Available"
                : "Not Available"}
            </div>
          </div>
        </div>
      </div>

      {/* Install Prompt Banner */}
      <InstallPrompt
        installPrompt={pwaData.installPrompt}
        onInstall={handleInstallClick}
      />

      {/* Service Worker Registration */}
      <SWRegister />
    </main>
  );
}

const styles: StyleProps = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "15px",
  },
  statusIndicator: {
    display: "inline-block",
    padding: "5px 15px",
    borderRadius: "20px",
    color: "white",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  features: {
    margin: "30px 0",
    textAlign: "left" as const,
  },
  featuresTitle: {
    color: "#333",
    marginBottom: "15px",
    textAlign: "center" as const,
  },
  featureList: {
    listStyle: "none",
    padding: 0,
  },
  featureItem: {
    padding: "8px 0",
    color: "#555",
    fontSize: "1rem",
  },
  installSection: {
    margin: "30px 0",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "10px",
  },
  installButton: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginBottom: "10px",
  },
  installText: {
    fontSize: "0.9rem",
    color: "#666",
    margin: 0,
  },
  info: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
  },
  infoGrid: {
    display: "grid",
    gap: "10px",
    marginTop: "15px",
  },
  infoItem: {
    padding: "8px",
    background: "#f8f9fa",
    borderRadius: "6px",
    fontSize: "0.9rem",
  },
};
