export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  locationRegion: string;
  locationCity: string;
  jobTitle: string;
  employmentType: string;
  company: string;
  profilePhotoUrl: string;
};

export type RegisterEmailPassword = {
  email: string;
  password: string;
};

export type RegisterName = {
  firstName: string;
  lastName: string;
};

export type RegisterLocation = {
  locationRegion: string;
  locationCity: string;
};

export type RegisterJob = {
  jobTitle: string;
  employmentType: string;
  company: string;
};

export type RegisterProfilePhoto = {
  profilePhotoUrl: string;
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
