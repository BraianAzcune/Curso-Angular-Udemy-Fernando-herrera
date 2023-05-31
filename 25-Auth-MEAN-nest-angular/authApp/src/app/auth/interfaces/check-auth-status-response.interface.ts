import { User } from "./user.interface";

export interface CheckAuthStatusResponse {
  token: string;
  user: User;
}
