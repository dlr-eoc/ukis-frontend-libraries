import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ukis-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  host: {
    "[class.date-range]": "true"
  }
})
export class DateRangeComponent implements OnInit {
  /**
   * A date range of the OWC Data with a min and a max and the chosen values valuemin and valuemax in format YYYY-MM-DD
   */
  @Input('date-range') daterange: { min: string, max: string, valuemin: string, valuemax: string };
  @Output('date-rangeChange') emitter = new EventEmitter<any>();

  toggle: boolean = true;
  constructor() {
  }

  ngOnInit() {

  }

  onDateRangeChange = (event) => {
    this.emitter.emit(this.daterange)
  }
}
