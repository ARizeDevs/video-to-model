import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ARizeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const specialHeader = request.headers['arize-token'];

    const token =
      process.env.ARIZE_VIDEO_TO_MODEL_TOKEN ||
      'arize-vtm-xkey-x128Re5758321-cus365';

    if (!specialHeader || specialHeader !== token) {
      return false; // Block access if the special header is missing or doesn't have the expected value
    }

    return true;
  }
}
