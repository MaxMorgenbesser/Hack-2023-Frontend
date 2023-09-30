export interface UserModel {
    name:string
    tempToken:string
    token:string
    _id:string
}

export interface UserSelector {
    user:UserModel
}