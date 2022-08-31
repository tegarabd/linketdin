import { Location } from "./location";

export type Job = {
  id: string;
  title: string;
  companyName: string;
  workplace: string;
  location: Location;
  employmentType: string;
  description: string;
};
