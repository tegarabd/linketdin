import { Date } from "./date";
import { Location } from "./location";
import { User } from "./user";

export type Experience = {
  id: string;
  user: User;
  title: string;
  employmentType: string;
  companyName: string;
  location: Location;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  industry: string;
  headline: string;
};
