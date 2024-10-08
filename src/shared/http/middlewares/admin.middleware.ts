import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "@nestjs/common";

function EnsureAdminMiddleware(request: Request, response: Response, next: NextFunction) {
    const user = request.user
   try {
    if (!user.is_admin) {
        throw new UnauthorizedException('User Unauthorized')
    }
    next()
   } catch (error) {
    throw new UnauthorizedException('JWT token invalid')

    
   }
    
  


}

export default EnsureAdminMiddleware;