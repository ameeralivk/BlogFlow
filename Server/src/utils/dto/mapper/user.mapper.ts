import { IUser } from "../../../Types/IUser";
import { UserResponseDTO } from "../dto/user.dto";

export const toUserResponseDTO = (user: IUser): UserResponseDTO => {
  return {
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    profileImage: user.profileImage,
    createdAt: user.createdAt,
  };
};
