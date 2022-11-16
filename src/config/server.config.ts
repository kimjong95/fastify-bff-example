interface AppConfig {
  host: string;
  port: number;
  openApi?: {
    url: string;
    key: string;
  };
}

const appConfig: AppConfig = {
  host: "localhost",
  port: 8004,
};

export default function AppConfig() {
  return appConfig;
}
