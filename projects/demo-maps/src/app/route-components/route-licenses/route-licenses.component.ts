import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule, ClrDatagridModule } from '@clr/angular';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

/**
 * This component expects a assets/licenses.json file to be present in the project bundle.
 *  That file was created with the following command:
 * ```
 *   cd ./frontend-libraries
 *   npm install -g license-checker
 *   npx license-checker --json --out ./dist/demo-maps/assets
 * ```
 * You might want to add this command to the build-process by adding a "postbuild" task to your package.json.
 *
 * Alternatively, you could call the tool from a node-script like this:
 * ```
 * function writeLicenses(args: {rootDir?: string, outputFile?: string}): void {
 *
 *   const checkerArgs = {
 *     production: true,
 *     json: true,
 *     start: args.rootDir ? args.rootDir : PATH.resolve(__dirname + '/../..'),
 *     out: args.outputFile ? args.outputFile : PATH.resolve(__dirname + '/../../dist/demo-maps/assets/licenses.json'),
 *     unknown: true
 *   };
 *
 *   checker.init(checkerArgs, function(err, json) {
 *     if (!!err) {
 *       console.error('Found error');
 *       console.error(err);
 *     }
 *     const formattedOutput = JSON.stringify(json, null, 2) + '\n';
 *     const targetDir = PATH.dirname(checkerArgs.out);
 *     mkdirp.sync(targetDir);
 *     FS.writeFileSync(checkerArgs.out, formattedOutput, 'utf8');
 *   });
 * }
 * ```
 */

interface License {
  name: string;
  license: string;
  repository: string;
  publisher: string;
}


@Component({
    selector: 'app-route-licenses',
    templateUrl: './route-licenses.component.html',
    styleUrls: ['./route-licenses.component.scss'],
    standalone: true,
    imports: [ClrStopEscapePropagationDirective, ClrPopoverHostDirective, ClrSignpostModule, ClrConditionalModule, ClrDatagridModule, NgIf, NgFor, AsyncPipe]
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
            name,
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
