export interface IAppConfig {
  port: number;
  environment: 'development' | 'production' | 'staging';
  exposeAll: boolean;
}
