export interface IUser {
    username: string
    password: string
    email?: string
}

export interface IChangePassword {
    new_password: string,
    re_new_password: string,
    current_password: string
}

export interface IChangeUsername extends Pick<IChangePassword, 'current_password'> {
    new_username: string
}