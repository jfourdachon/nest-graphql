import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Response } from 'express';
import { User } from 'src/user/user.model';

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    return GqlExecutionContext.create(context).getContext().req.res
  }
  
);

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);

export const Cookies = createParamDecorator(
    (data: unknown, context: ExecutionContext): any => {
      const ctx = GqlExecutionContext.create(context).getContext();
      return ctx.req && ctx.req.cookies;
    },
  );