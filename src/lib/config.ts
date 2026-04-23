export interface StandaloneConfig {
  deploymentUrl: string;
  assistantId: string;
  langsmithApiKey?: string;
}

const CONFIG_KEY = "deep-agent-config";
const DEFAULT_DEPLOYMENT_URL =
  process.env.NEXT_PUBLIC_DEPLOYMENT_URL || "http://127.0.0.1:2024";
const DEFAULT_ASSISTANT_ID = process.env.NEXT_PUBLIC_ASSISTANT_ID || "agent";

export function getDefaultConfig(): StandaloneConfig {
  const langsmithApiKey = process.env.NEXT_PUBLIC_LANGSMITH_API_KEY;

  return {
    deploymentUrl: DEFAULT_DEPLOYMENT_URL,
    assistantId: DEFAULT_ASSISTANT_ID,
    ...(langsmithApiKey ? { langsmithApiKey } : {}),
  };
}

export function getConfig(): StandaloneConfig | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(CONFIG_KEY);
  if (!stored) return getDefaultConfig();

  try {
    return {
      ...getDefaultConfig(),
      ...JSON.parse(stored),
    };
  } catch {
    return getDefaultConfig();
  }
}

export function saveConfig(config: StandaloneConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}
