import type { IUser } from "~/types/user";

interface ILoginResponse {
  accessToken: string;
}

interface IGetMeResponse extends IUser {}

export type { ILoginResponse, IGetMeResponse };
