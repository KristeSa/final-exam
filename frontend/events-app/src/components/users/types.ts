export type TUser = {
    id: number;
    name: string;
    surname: string;
    birthdate: string;
    age: number;
    email: string,
    eventsName: string
}

export type TUserProps = {
    user: TUser;
}

export type TUserState = {
    fetchedProducts: Readonly<TUser[]>
  }