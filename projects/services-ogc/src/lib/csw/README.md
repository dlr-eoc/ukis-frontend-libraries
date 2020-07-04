## Type definitions

Created with [cxsd](https://github.com/charto/cxsd#readme), 
Using the [opengis schema files](http://schemas.opengis.net/csw/2.0.2/).

Some manual changes have been made.

## Parsing

Cxsd is actually meant to be used in conjunction with [cxml](https://github.com/charto/cxml#readme) as parser. 
However, cxml has not seen activity in the last year, and currently still seems to depend on some node-only libraries, making it at least difficult to use in a browser.

Instead, we're using [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) for parsing and validation.
It is quite configurable, hopefully to the point that it can parse XML the same way cxml would.
The unittests so far confirm that fast-xml-parser parses xml in the same datastructure as cxml should.

If, however, incompatibilities should surface between cxsd's type-definitions and fast-xml-parsers parsing-results, we'll have to either
 - hope that cxml is in a browser-runnable state by then, or
 - create the type definitions in another way (jsonix?)


## TODOs
did i miss any required parameters?
is the created xml body incomplete?
can it be completed with _namespace and _exists?
otherwise, move back to jsonix.