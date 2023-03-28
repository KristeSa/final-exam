export type LoginFormState = {
    email: string;
    password: string;
  }

  export type RegisterFormState = {
    email: string;
    password: string;
  }

  export interface IAuthContext {
    token: string | undefined;
  }

