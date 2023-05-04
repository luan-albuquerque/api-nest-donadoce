declare namespace Express {
    export interface Request {
      user: {
        id: string;
        name: string;
        username: string;
        email: string;
        is_enabled: boolean,
        is_admin: boolean,
        is_product: boolean,
        is_revenues: boolean
      };
    }
  }