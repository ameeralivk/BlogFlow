import { UserResponseDTO } from "../dto/user.dto";

export const toUserResponseDTO = (user: any): UserResponseDTO => {
  return {
    id: user._id ? user._id.toString() : user.id,
    fullName: user.fullName,
    email: user.email,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
  };
};
