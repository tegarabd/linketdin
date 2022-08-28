import { Date } from "./date";
import { User } from "./user";

export type Education = {
  id: string;
  user: User;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  grade: number;
  activities: string;
  description: string;
};
