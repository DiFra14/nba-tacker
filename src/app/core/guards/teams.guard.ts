import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TrackerService} from "@/features/tracker/services/tracker.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamsGuard implements CanActivate {
  constructor(private trackerService: TrackerService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.trackerService.getSelectedGamesStatsTeamsSubject().pipe(
      map((teams) => {
        if (teams.length) {
          return true
        }
        return this.router.parseUrl('/');
      })
    )
  }
}
