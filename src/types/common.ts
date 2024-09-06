import type { IUser } from "~/types/user";

interface ILoginResponse {
  token: string;
  refreshToken: string;
}

interface IGetMeResponse extends IUser {}

export type { ILoginResponse, IGetMeResponse };
