export interface IUserDetails {
  userName: string,
  firstName: string,
  lastName: string,
  email: string,
  loggedIn: boolean
}
export class UserDetails {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  loggedIn: boolean = false;
}
