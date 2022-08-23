export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type GoogleAuth = {
  userId: string;
  email: string;
  profilePhotoUrl: string;
  firstName: string;
  lastName: string;
};
