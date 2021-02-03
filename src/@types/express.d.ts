declare namespace Express {
  export interface Request {
    user: {
      id: string;
      user_type?: string;
    }
  }
}
