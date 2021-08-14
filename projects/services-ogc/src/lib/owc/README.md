# OGC OWS Context 

The `OwcJsonService` is a parser to read from / write to [OWS Context (GeoJSON Encoding Standard)](http://docs.opengeospatial.org/is/14-055r2/14-055r2.html) files.
The types for it are derived from a [json schema](types/owc-ogc.schema.json) (provided by the OGC) and extended by hand, using the following documentation. 

- http://docs.opengeospatial.org/is/14-055r2/14-055r2.html
- https://www.ogc.org/standards/owc
- http://www.owscontext.org
- https://github.com/opengeospatial/owscontext/tree/master/json/dev/trax/json



## Json Schema To types
- [json to ts](https://github.com/bcherny/json-schema-to-typescript)
`json2ts --input .../owc-ogc.schema.json --output .../owc-ogc.schema.d.ts`


- [ts to json](https://github.com/YousefED/typescript-json-schema)

`typescript-json-schema .../owc-json.ts "*" --required=true --titles=true --propOrder=true --topRef=true -o .../owc-json.schema_t2s.json`

