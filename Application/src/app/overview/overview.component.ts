import { UserService } from './../user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../user';
import { Observable, Subscription } from 'rxjs';

// exponentialBackoff:
import { fromEvent } from 'rxjs';
import { sampleTime, startWith, switchMapTo, tap, map, flatMap } from 'rxjs/operators';
import { intervalBackoff } from 'backoff-rxjs';

export const INITIAL_INTERVAL_MS = 20 * 1000; // 20 sec, response time of REST service called
export const MAX_INTERVAL_MS = 6000; // 1 min

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit  {

  users: User[] = [];
  n: number;
  mySubscription: Subscription;
  exponentialBackoffTimer$: Observable<any>;
 
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.exponentialBackoffTimer$ =
      fromEvent(document, null).pipe(

        // There could be many mousemoves, we'd want to sample only
        // with certain frequency
        sampleTime(INITIAL_INTERVAL_MS),

        // Start immediately
        startWith(null),

        // Resetting exponential interval operator
        switchMapTo(intervalBackoff({
          backoffDelay: (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval,
          initialInterval: INITIAL_INTERVAL_MS,
          maxInterval: MAX_INTERVAL_MS
        })),

        // attaching the function that is to be reset:
        flatMap(n => {
          console.log('iteration since reset: ' + n);
          this.n = n;
          return this.getAndAssignPosts$();
      }),
    );
}

  getAndAssignPosts$(): Observable<void> {
    return this.userService.getAll().pipe(map(users => {
      this.users = users;
      
      
     
    }));
  }
}