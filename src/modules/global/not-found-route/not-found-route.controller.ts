import { Controller, Get } from '@nestjs/common';

@Controller('not-found-route')
export class NotFoundRouteController {
  @Get()
  defaultNotFoundRoute() {
    return 'this route does not exist';
  }
}
