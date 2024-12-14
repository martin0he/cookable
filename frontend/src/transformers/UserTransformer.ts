/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../types";

export const transformUser = (backendData: any): User => {
  return {
    id: backendData.id,
    username: backendData.username,
    firstName: backendData.first_name,
    lastName: backendData.last_name,
    profilePictureUrl: backendData.profile_picture_url || null,
    email: backendData.email,
    bio: backendData.bio || null,
    dateRegistered: new Date(backendData.date_registered),
    password: backendData.password_hash,
  };
};
