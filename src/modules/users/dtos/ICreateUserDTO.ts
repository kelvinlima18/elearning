export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  user_type?: string;
}
