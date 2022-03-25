export interface IEnv {
  production: boolean,
  externalDebug: boolean,
  FILE_SERVER: string|null,
  FILE_SERVER_PURCHASED: string|null,
  SOCKET_SERVER: string|null,
  REST_API: string|null
}
