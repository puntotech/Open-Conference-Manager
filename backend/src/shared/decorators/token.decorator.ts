import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((data, req) => {
  return req.headers.authorization.split('Bearer ')[1];
});
