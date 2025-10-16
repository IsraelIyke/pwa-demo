export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export interface PWAData {
  installPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
}

export interface StyleProps {
  [key: string]: React.CSSProperties;
}
