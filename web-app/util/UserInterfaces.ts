export interface IUser {
    userId: string
    username: string
    userRoles: IRole[]
    firstname: string
    lastname: string
    createDate: string
    token?: string // force in object to make it simpler
}

export interface IRole {
    userRolesLookUpId?: string
    roleName: string
    description: string
}

export interface ILoginResponse {
    username: string
    token: string
    userData: IUser
    userRoles: IRole[]
}

