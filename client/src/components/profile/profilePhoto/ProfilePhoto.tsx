import React from "react";
import { User } from "../../../types/user";
import ProfilePhotoImg from "./ProfilePhotoImg";
import PhotoPhotoPlaceholder from "./ProfilePhotoPlaceholder";

function ProfilePhoto({ user, size }: { user: User | any; size: string }) {
  if (user.profilePhotoUrl) {
    return <ProfilePhotoImg src={user.profilePhotoUrl} size={size} />;
  }

  return <PhotoPhotoPlaceholder user={user} size={size} />;
}

export default ProfilePhoto;
