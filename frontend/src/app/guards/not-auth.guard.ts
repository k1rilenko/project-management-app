import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token/token.service';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  canActivate(): MaybeAsync<GuardResult> {
    const token = this.tokenService.getToken();
    if (!token) {
      return this.router.createUrlTree(['welcome']);
    } else {
      return true;
    }
  }
}
