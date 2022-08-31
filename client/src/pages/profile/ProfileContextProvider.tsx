import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_BLOCKED } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { User } from "../../types/user";

interface ProfileContextType {
  canModify: boolean;
  canView: boolean;
}

const ProfileContext = createContext<ProfileContextType>(null!);

function ProfileContextProvider({ children }: { children: JSX.Element }) {
  const { sub } = useJwt();
  const { userId } = useParams();
  const { data: userBlocked } = useQuery(USER_BLOCKED, {
    variables: { id: sub },
  });

  const [canModify, setCanModify] = useState(sub === userId);
  const [canView, setCanView] = useState(false);

  useEffect(() => {
    setCanModify(sub === userId);

    if (userBlocked) {
      const canView =
        userBlocked.user.blocked.find(
          (blocked: User) => blocked.id === userId
        ) == undefined;

      setCanView(canView);
    }

    return () => {};
  }, [userBlocked]);

  const value = { canModify, canView };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContextProvider;

export function useProfile() {
  return useContext(ProfileContext);
}
