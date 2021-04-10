import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Response } from 'express';

export const ResGql = createParamDecorator(
  (data: unknown, context: ExecutionContext): Response => {
    return GqlExecutionContext.create(context).getContext().req.res
  }
  
);


//TODO Put response Type as User after migrating to mongo
export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req && ctx.req.user;
  },
);