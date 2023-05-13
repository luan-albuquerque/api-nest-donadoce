import { UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "src/config/jwt/config.jwt";

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
  name: string;
  username: string;
  email: string;
  is_enabled: boolean,
  is_admin: boolean,
  is_product: boolean,
  is_revenues: boolean
}


function EnsureAuthenticatedMiddleware(request: Request, response: Response, next: NextFunction) {
  try {

    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException("JWT is missign")
    }

    const [, token] = authHeader.split(' ')

  
    const decoded = verify(token, secret);    
  
    const { id, name, username, email, is_admin, is_enabled, is_product, is_revenues } = decoded as TokenPayload;
    if (!is_enabled) {
      throw new UnauthorizedException('User Unauthorized')

    }
    request.user = {
      id,
      name,
      username,
      email,
      is_admin,
      is_enabled,
      is_product,
      is_revenues
    }



    next()
  } catch (error) {
    console.log({error});
    
    // throw new UnauthorizedException('JWT token invalid')
  }

}
export default EnsureAuthenticatedMiddleware 