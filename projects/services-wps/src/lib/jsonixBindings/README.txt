This folder contrains jsonix-bindings.
Binding files allow customizing schema compilation.
Binding files are typically named bindings.xjb

The typical bindings file is structured as follows:

<jaxb:bindings
	version="1.0"
	xmlns:jaxb="http://java.sun.com/xml/ns/jaxb" 
	xmlns:xs="http://www.w3.org/2001/XMLSchema" 
	xmlns:jsonix="http://jsonix.highsource.org/customizations"
	jaxb:extensionBindingPrefixes="jsonix">

	<jaxb:bindings schemaLocation="schema.xsd" 
		node="/xs:schema">

		<jaxb:schemaBindings>
			<jaxb:package name="com.acme.foo.myschema"/>
		</jaxb:schemaBindings>

		<!-- Further customization elements -->

	</jaxb:bindings>
</jaxb:bindings>

The <jaxb:bindings schemaLocation="schema.xsd" node="/xs:schema" ... /> applies customizations to schema defined in the schema.xsd file. 
This element may contain further configuration or customization elements.