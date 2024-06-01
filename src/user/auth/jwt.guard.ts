import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user.service";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
    constructor(private readonly reflector: Reflector, private readonly userService: UserService) {
        super();
      }
      async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.req.headers.authorization) {
          throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
        }
        ctx.user = await this.validateToken(ctx.req.headers.authorization);
        return true;
      }


      async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
          throw new UnauthorizedException('Invalid Authorization Token - No Token Provided in Headers');
        }
        const token = auth.split(' ')[1];
        try {
          return await this.userService.verifyJwt(token);
        } catch (err) {
          throw new UnauthorizedException('Invalid Authorization Token - Expired or Invalid');
        }
      }
    
}