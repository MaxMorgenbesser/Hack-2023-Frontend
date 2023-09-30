export interface UserModel {
    name:string
    tempToken:string
    token:string
}

export interface UserSelector {
    user:UserModel
}