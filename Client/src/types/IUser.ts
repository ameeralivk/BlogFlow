export interface IUser {
    fullName:string,
    email:string,
    password:string
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ValidationError {
  field: string;
  message: string;
}