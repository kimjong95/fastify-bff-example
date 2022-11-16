interface AppConfig {
  host: string;
  port: number;
  openApi?: {
    url: string;
    key: string;
  };
}

const appConfig: AppConfig = {
  host: "0.0.0.0",
  port: 8080,
};

export default function AppConfig() {
  return appConfig;
}
