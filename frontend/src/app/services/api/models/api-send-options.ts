export interface ApiSendOptions {
  skipErrorHandling: boolean;
}

export type ApiSendOptionsParams = Partial<ApiSendOptions>;

export const DEFAULT_API_SEND_OPTIONS: ApiSendOptions = {
  skipErrorHandling: false,
};
