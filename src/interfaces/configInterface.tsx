export interface Config {
    baseURL: string,
    frontBaseURL : string,
  }
 
export const config: {
  c: Config
} = {} as any
 
export const getConfig = () => config.c