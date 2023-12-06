export interface IUser {
    userId: number
    username: string
    roles: IRole[]
    firstname: string
    lastname: string
    createDate: string
    token?: string // force in object to make it simpler
}

export interface IRole {
    userRolesLookUpId?: number
    roleName: string
    description: string
}

export interface ILoginResponse {
    username: string
    token: string
    userData: IUser
    userRoles: IRole[]
}

