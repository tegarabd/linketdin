import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import EntirePageLoading from "../../../components/utilities/EntirePageLoading";
import { REGISTER } from "../../../graphql/authentication";
import { Redirect } from "../../../tools/Redirect";
import {
  RegisterData,
  RegisterEmailPassword,
  RegisterJob,
  RegisterLocation,
  RegisterName,
  RegisterProfilePhoto,
} from "../../../types/authentication";
import NotFound from "../../error/NotFound";
import EmailPassword from "./EmailPassword";
import Job from "./Job";
import Location from "./Location";
import Name from "./Name";
import ProfilePhoto from "./ProfilePhoto";

function RegisterPage() {
  const navigate = useNavigate();
  const [register, { loading, data }] = useMutation(REGISTER);
  const [registerData, setRegisterData] = useState<RegisterData>({
    company: "",
    email: "",
    employmentType: "",
    firstName: "",
    jobTitle: "",
    lastName: "",
    locationCity: "",
    locationRegion: "",
    password: "",
    profilePhotoUrl: "",
  });

  useEffect(() => {
    if (Object.values(registerData).some((value) => value === "")) {
      return;
    }

    register({ variables: { input: registerData } });

    return () => {};
  }, [registerData]);

  useEffect(() => {
    if (data) {
      navigate(`/auth/activate/${data.auth.register.activationId}`)
    }

    return () => {};
  }, [data]);

  const handleSubmitEmailPassword = (input: RegisterEmailPassword) => {
    setRegisterData({
      ...registerData,
      ...input,
    });
    navigate("/auth/register/name");
  };

  const handleSubmitName = (input: RegisterName) => {
    setRegisterData({
      ...registerData,
      ...input,
    });
    navigate("/auth/register/location");
  };

  const handleSubmitLocation = (input: RegisterLocation) => {
    setRegisterData({
      ...registerData,
      ...input,
    });
    navigate("/auth/register/job");
  };

  const handleSubmitJob = (input: RegisterJob) => {
    setRegisterData({
      ...registerData,
      ...input,
    });
    navigate("/auth/register/profile_photo");
  };

  const handleSubmitProfilePhoto = async (input: RegisterProfilePhoto) => {
    setRegisterData({
      ...registerData,
      ...input,
    });
  };

  if (loading) {
    return <EntirePageLoading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Redirect to="email_password" />} />
      <Route
        path="/email_password"
        element={
          <EmailPassword
            handleSubmitEmailPassword={handleSubmitEmailPassword}
          />
        }
      />
      <Route
        path="/name"
        element={
          <Name
            handleSubmitName={handleSubmitName}
            registerData={registerData}
          />
        }
      />
      <Route
        path="/location"
        element={
          <Location
            handleSubmitLocation={handleSubmitLocation}
            registerData={registerData}
          />
        }
      />
      <Route
        path="/job"
        element={
          <Job handleSubmitJob={handleSubmitJob} registerData={registerData} />
        }
      />
      <Route
        path="/profile_photo"
        element={
          <ProfilePhoto
            handleSubmitProfilePhoto={handleSubmitProfilePhoto}
            registerData={registerData}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RegisterPage;
