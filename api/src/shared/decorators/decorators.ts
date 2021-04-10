import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Response } from 'express';
import { UserType } from 'src/users/users.type';

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    return GqlExecutionContext.create(context).getContext().req.res
  }
  
);

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserType => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);