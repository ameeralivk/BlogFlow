export interface UserRegisterRequestDTO {
  fullName: string;
  email: string;
  password?: string;
}

export interface UserResponseDTO {
  id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  createdAt?: Date;
}

export interface UserLoginRequestDTO {
  email: string;
  password?: string;
}

export interface UpdateProfileRequestDTO {
  fullName?: string;
  profileImage?: string;
}
