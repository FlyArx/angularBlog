import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService, AlertType} from "../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit, OnDestroy{


@Input() delay = 5000
   text: string
   type: AlertType
  aSub: Subscription
  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
   this.aSub = this.alertService.alert$.subscribe({
    next: alert => {
      this.text = alert.text
      this.type = alert.type
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.text = ''
      }, this.delay)
    }
  })
  }
  ngOnDestroy() {
  if (this.aSub) {
    this.aSub.unsubscribe()
  }
  }

}
