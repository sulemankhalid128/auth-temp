import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * @returns {User}
 */
export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => GqlExecutionContext.create(ctx).getContext().user
);
