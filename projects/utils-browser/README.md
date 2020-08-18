# @dlr-eoc/utils-browser

This library contains a collection of utilities that do not themselves depend on angular.

## Download

A few utilities that save us some boilerplate for downloading data to a file.
 - downloadJson
 - downloadBlob
 - downloadUrl

## Layout

 - Page: A utility class intended to help with getting the dimensions of a paper



### Development
The `utils` libraries are all designed to have no production dependencies on angular. The primary objective here is to create utilities that can be used in other frameworks or framework-independent. Such utilities might take on the form of libraries of webcomponents. 

Inspired by [clarity-design's shift to a framework-independent core](https://medium.com/claritydesignsystem/clarity-core-72f6d3a029bc), we strive to make those utilities available outside of angular, while at the same time cause minimal disruptions in the current usage of all those outsourced tools.

We intend to obtain this goal by:
 - **Minimal disruptions to the current usage**: When a components or parts of them are moved to a utils-library, we maintain a wrapper that keeps the angular-template syntax. We strive to minimize breaking changes.
 - **Minimal external dependencies**: We hope to make our utils as atomic as possible, meaning that we'll avoid external dependencies where possible. We will, of course, still use very important libraries like openlayers, but avoid others that are less vital.
 - **Unopinionated**: These utilities are intended to be used in any framework. As such, we try to avoid any Angular- or UKIS-specific idioms that might not fit in with another users idea of how a certain tool is best used.
 - **Gradual transition**: As UKIS matures, we will move more and more functionality out of angular-components and into utility-libraries.
 - **Keeping up with web-standards**: One core motivation for the creation of the utils-libraries was our objective of using some functionality of Ukis within other applications (like static site generators, django, CMS etc) as web components. As a consequence, we intend to design the utilities with modern web-standards and -api's in mind.