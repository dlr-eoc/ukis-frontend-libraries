import {
  Component,
  effect,
  inject,
  signal,
} from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  ClrConditionalModule,
  ClrDatagridModule,
  ClrPopoverHostDirective,
  ClrSignpostModule,
  ClrStopEscapePropagationDirective,
} from "@clr/angular";

/**
 * This component expects a assets/licenses.json file to be present in the project bundle.
 *  That file was created with the following command:
 * ```
 *   cd ./frontend-libraries
 *   npx license-checker-evergreen --json --out ./dist/demo-maps/assets
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
  imports: [
    ClrStopEscapePropagationDirective,
    ClrPopoverHostDirective,
    ClrSignpostModule,
    ClrConditionalModule,
    ClrDatagridModule,
  ],
  selector: "app-licenses-example",
  styleUrl: "./licenses-example.scss",
  templateUrl: "./licenses-example.html",
  host: {
    class: 'content-container'
  }
})
export class LicensesExample {
  private http = inject(HttpClient);
  public licenses = signal<License[]>([]);
  constructor() {
    const init = effect(async () => {
      const licenses = await firstValueFrom(
        this.http.get("licenses.json").pipe(map((data:any) => {
          const licenses: License[] = [];
          for (const name in data) {
            if (data[name]) {
              const val = data[name];
              licenses.push({
                name,
                license: val.licenses,
                repository: val.repository,
                publisher: val.publisher,
              });
            }
          }
          return licenses;
        })),
      );
      this.licenses.set(licenses);
      init.destroy();
    });
  }

  ngOnInit() {
  }
}
