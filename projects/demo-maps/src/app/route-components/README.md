# In this folder there are the components for each angular application route

- the route component.ts must have a ```@HostBinding('class') class = 'content-container';``` to work with the clarity layout!

- if the routes don't should share the same services e.g you want a new map instance on a other route use e.g.
```providers: [MapOlService, MapStateService, LayersService]```

- the route template should have a clarity content-area and e.g. a clr-vertical-nav
``` 
<section class="content-area"></section>
<clr-vertical-nav></clr-vertical-nav>
```

for more information see:
- [clarity application layout](https://clarity.design/documentation/app-layout) and
- [clarity navigation](https://clarity.design/documentation/navigation) and
- [clarity vertical nav](https://clarity.design/documentation/vertical-nav/)



## Licenses

The licenses-component is intended as a tool to help you when you want to display all your third-party dependencies licenses. Depending on their or your own licensing, this might be good practice or even required.

It expects a assets/licenses.json file to be present in the project bundle.
 That file was created with the following command:
```bash
  cd ./frontend-libraries
  npm install -g license-checker
  npx license-checker --json --out ./dist/demo-maps/assets
```
You might want to add that command to the build-process by adding a "postbuild" task to your package.json.
Alternatively, you could call the tool from a node-script like this:
```js
function writeLicenses(args: {rootDir?: string, outputFile?: string}): void {
  const checkerArgs = {
    production: true,
    json: true,
    start: args.rootDir ? args.rootDir : PATH.resolve(__dirname + '/../..'),
    out: args.outputFile ? args.outputFile : PATH.resolve(__dirname + '/../../dist/demo-maps/assets/licenses.json'),
    unknown: true
  };
  checker.init(checkerArgs, function(err, json) {
    if (!!err) {
      console.error('Found error');
      console.error(err);
    }
    const formattedOutput = JSON.stringify(json, null, 2) + '\n';
    const targetDir = PATH.dirname(checkerArgs.out);
    mkdirp.sync(targetDir);
    FS.writeFileSync(checkerArgs.out, formattedOutput, 'utf8');
  });
}
```
