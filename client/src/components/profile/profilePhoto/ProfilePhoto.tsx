import React from "react";
import { User } from "../../../types/user";
import ProfilePhotoImg from "./ProfilePhotoImg";
import PhotoPhotoPlaceholder from "./ProfilePhotoPlaceholder";

function ProfilePhoto({ user, size }: { user: User | any; size: string }) {
  return (
    <>
      {user.profilePhotoUrl ? (
        <ProfilePhotoImg src={user.profilePhotoUrl} size={size} />
      ) : (
        <PhotoPhotoPlaceholder user={user} size={size} />
      )}
    </>
  );
}

export default ProfilePhoto;
