#! /bin/bash

java -jar jsonix-schema-compiler-full.jar \
    -nv -logLevel DEBUG \
    -b ../src/lib/jsonixBindings \
    -d ../src/lib/jsonixMappings \
    -p wps \
    http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd
    
    #http://schemas.opengis.net/ows/1.1.0/owsAll.xsd
    #http://schemas.opengis.net/wps/1.0.0/wpsGetCapabilities_response.xsd
    #http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService?service=WPS&version=1.0.0&request=GetCapabilities
    #http://www.engr.iupui.edu/~fernande/cpt499/201/lessons/xsd/examples/order.xsd