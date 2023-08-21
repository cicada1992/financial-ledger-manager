export interface ISignUpResponse extends IUserInfo {
  accessToken: string;
}

export interface ILoginResponse extends IUserInfo {
  accessToken: string;
}

export interface IUserInfo {
  email: string;
  username: string;
  /** 기준일 */
  referenceDate: number;
}

export interface IUserPayload {
  email: string;
  username: string;
  password: string;
  referenceDate: number;
}
