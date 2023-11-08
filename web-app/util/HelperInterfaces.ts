export interface IThrowError {
    httpStatus: string
    message: string
}

export interface ILoginResponse {
    email: string
    token: string
}

export const initialLoginResponse: ILoginResponse = {
    email: "",
    token: "",
}