interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type { ILoginResponse, Nullable };
