import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



interface License {
  name: string;
  license: string;
  repository: string;
  publisher: string;
}


@Component({
  selector: 'ukis-route-licenses',
  templateUrl: './route-licenses.component.html',
  styleUrls: ['./route-licenses.component.scss']
})
export class RouteLicensesComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  public licenses$: Observable<License[]>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.licenses$ = this.http.get('assets/licenses.json').pipe(map(data => {
      const licenses: License[] = [];
      for (const name in data) {
        if (data[name]) {
          const val = data[name];
          licenses.push({
            name: name,
            license: val.licenses,
            repository: val.repository,
            publisher: val.publisher
          });
        }
      }
      return licenses;
    }));
  }

}
