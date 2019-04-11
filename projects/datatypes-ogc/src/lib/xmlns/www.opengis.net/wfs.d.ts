import * as Primitive from '../xml-primitives';
import * as gml from './gml';
import * as ogc from './ogc';

// Source files:
// http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd
// http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd
// http://schemas.opengis.net/wfs/1.0.0/wfs.xsd


declare module './gml' {
export interface _FeatureCollectionProxyType {
	/** This element is a container for the response to a GetFeature
	  * or GetFeatureWithLock (WFS-transaction.xsd) request. */
	FeatureCollection?: FeatureCollectionType;
}
}
interface BaseType {
	_exists: boolean;
	_namespace: string;
}
export type AllSomeType = ("ALL" | "SOME");
interface _AllSomeType extends Primitive._string { content: AllSomeType; }

interface _DeleteElementType extends BaseType {
	handle?: string;
	typeName: string;
	Filter: ogc.FilterType;
}
export interface DeleteElementType extends _DeleteElementType { constructor: { new(): DeleteElementType }; }
export var DeleteElementType: { new(): DeleteElementType };

/** The DescribeFeatureType operation allows a client application
  * to request that a Web Feature Service describe one or more
  * feature types.   A Web Feature Service must be able to generate
  * feature descriptions as valid GML2 application schemas.
  *
  * The schemas generated by the DescribeFeatureType operation can
  * be used by a client application to validate the output.
  *
  * Feature instances within the WFS interface must be specified
  * using GML2.  The schema of feature instances specified within
  * the WFS interface must validate against the feature schemas
  * generated by the DescribeFeatureType request. */
interface _DescribeFeatureTypeType extends BaseType {
	/** The outputFormat attribute is used to specify what schema
	  * description language should be used to describe features.
	  * The default value of XMLSCHEMA means that the Web Feature
	  * Service must generate a GML2 application schema that can
	  * be used to validate the GML2 output of a GetFeature request
	  * or feature instances specified in Transaction operations. */
	outputFormat?: string;
	service: string;
	version: string;
	/** The TypeName element is used to enumerate the feature types
	  * to be described.  If no TypeName elements are specified
	  * then all features should be described. */
	TypeName?: string[];
}
export interface DescribeFeatureTypeType extends _DescribeFeatureTypeType { constructor: { new(): DescribeFeatureTypeType }; }
export var DescribeFeatureTypeType: { new(): DescribeFeatureTypeType };

interface _EmptyType extends BaseType {}
export interface EmptyType extends _EmptyType { constructor: { new(): EmptyType }; }
export var EmptyType: { new(): EmptyType };

/** This type defines a container for the response to a
  * GetFeature or GetFeatureWithLock request.  If the
  * request is GetFeatureWithLock, the lockId attribute
  * must be populated.  The lockId attribute can otherwise
  * be safely ignored. */
interface _FeatureCollectionType extends gml._AbstractFeatureCollectionType {
	/** The value of the lockId attribute is an identifier
	  * that a Web Feature Service generates and which a
	  * client application can use in subsequent operations
	  * (such as a Transaction request) to reference the set
	  * of locked features. */
	lockId?: string;
}
export interface FeatureCollectionType extends _FeatureCollectionType { constructor: { new(): FeatureCollectionType }; }
export var FeatureCollectionType: { new(): FeatureCollectionType };

interface _FeaturesLockedType extends BaseType {
	FeatureId: ogc.FeatureIdType[];
}
export interface FeaturesLockedType extends _FeaturesLockedType { constructor: { new(): FeaturesLockedType }; }
export var FeaturesLockedType: { new(): FeaturesLockedType };

interface _FeaturesNotLockedType extends BaseType {
	FeatureId: ogc.FeatureIdType[];
}
export interface FeaturesNotLockedType extends _FeaturesNotLockedType { constructor: { new(): FeaturesNotLockedType }; }
export var FeaturesNotLockedType: { new(): FeaturesNotLockedType };

/** This type defines the GetCapabilities operation.  In response
  * to a GetCapabilities request, a Web Feature Service must
  * generate a capabilities XML document that validates against
  * the schemas defined in WFS-capabilities.xsd. */
interface _GetCapabilitiesType extends BaseType {
	service: string;
	version?: string;
}
export interface GetCapabilitiesType extends _GetCapabilitiesType { constructor: { new(): GetCapabilitiesType }; }
export var GetCapabilitiesType: { new(): GetCapabilitiesType };

/** A GetFeature element contains one or more Query elements
  * that describe a query operation on one feature type.  In
  * response to a GetFeature request, a Web Feature Service
  * must be able to generate a GML2 response that validates
  * using a schema generated by the DescribeFeatureType request.
  * A Web Feature Service may support other possibly non-XML
  * (and even binary) output formats as long as those formats
  * are advertised in the capabilities document. */
interface _GetFeatureType extends BaseType {
	handle?: string;
	/** The maxFeatures attribute is used to specify the maximum
	  * number of features that a GetFeature operation should
	  * generate (regardless of the actual number of query hits). */
	maxFeatures?: number;
	/** The outputFormat attribute is used to specify the output
	  * format that the Web Feature Service should generate in
	  * response to a GetFeature or GetFeatureWithLock element.
	  * The default value of GML2 indicates that the output is an
	  * XML document that conforms to the Geography Markup Language
	  * (GML) Implementation Specification V2.0.
	  *
	  * Other values may be used to specify other formats as long
	  * as those values are advertised in the capabilities document.
	  * For example, the value WKB may be used to indicate that a
	  * Well Known Binary format be used to encode the output. */
	outputFormat?: string;
	service: string;
	version: string;
	/** The Query element is used to describe a single query.
	  * One or more Query elements can be specified inside a
	  * GetFeature element so that multiple queries can be
	  * executed in one request.  The output from the various
	  * queries are combined in a wfs:FeatureCollection element
	  * to form the response to the request. */
	Query: QueryType[];
}
export interface GetFeatureType extends _GetFeatureType { constructor: { new(): GetFeatureType }; }
export var GetFeatureType: { new(): GetFeatureType };

/** A GetFeatureWithLock request operates identically to a
  * GetFeature request expect that it attempts to lock the
  * feature instances in the result set and includes a lock
  * identifier in its response to a client.  A lock identifier
  * is an identifier generated by a Web Feature Service that
  * a client application can use, in subsequent operations,
  * to reference the locked set of feature instances. */
interface _GetFeatureWithLockType extends BaseType {
	expiry?: number;
	handle?: string;
	maxFeatures?: number;
	outputFormat?: string;
	service: string;
	version: string;
	/** The Query element is used to describe a single query.
	  * One or more Query elements can be specified inside a
	  * GetFeature element so that multiple queries can be
	  * executed in one request.  The output from the various
	  * queries are combined in a wfs:FeatureCollection element
	  * to form the response to the request. */
	Query: QueryType[];
}
export interface GetFeatureWithLockType extends _GetFeatureWithLockType { constructor: { new(): GetFeatureWithLockType }; }
export var GetFeatureWithLockType: { new(): GetFeatureWithLockType };

interface _InsertElementType extends BaseType {
	handle?: string;
	Feature: gml.FeatureProxyType[];
}
export interface InsertElementType extends _InsertElementType { constructor: { new(): InsertElementType }; }
export var InsertElementType: { new(): InsertElementType };

interface _InsertResultType extends BaseType {
	handle?: string;
	FeatureId: ogc.FeatureIdType[];
}
export interface InsertResultType extends _InsertResultType { constructor: { new(): InsertResultType }; }
export var InsertResultType: { new(): InsertResultType };

/** This type defines the LockFeature operation.  The LockFeature
  * element contains one or more Lock elements that define
  * which features of a particular type should be locked.  A lock
  * identifier (lockId) is returned to the client application which
  * can be used by subsequent operations to reference the locked
  * features. */
interface _LockFeatureType extends BaseType {
	expiry?: number;
	/** The lockAction attribute is used to indicate what
	  * a Web Feature Service should do when it encounters
	  * a feature instance that has already been locked by
	  * another client application.
	  *
	  * Valid values are ALL or SOME.
	  *
	  * ALL means that the Web Feature Service must acquire
	  * locks on all the requested feature instances.  If it
	  * cannot acquire those locks then the request should
	  * fail.  In this instance, all locks acquired by the
	  * operation should be released.
	  *
	  * SOME means that the Web Feature Service should lock
	  * as many of the requested features as it can. */
	lockAction?: AllSomeType;
	service: string;
	version: string;
	/** The lock element is used to indicate which feature
	  * instances of particular type are to be locked. */
	Lock: LockType[];
}
export interface LockFeatureType extends _LockFeatureType { constructor: { new(): LockFeatureType }; }
export var LockFeatureType: { new(): LockFeatureType };

/** This type defines the Lock element.  The Lock element
  * defines a locking operation on feature instances of
  * a single type. An OGC Filter is used to constrain the
  * scope of the operation.  Features to be locked can be
  * identified individually by using their feature identifier
  * or they can be locked by satisfying the spatial and
  * non-spatial constraints defined in the filter. */
interface _LockType extends BaseType {
	handle?: string;
	typeName: string;
	Filter?: ogc.FilterType;
}
export interface LockType extends _LockType { constructor: { new(): LockType }; }
export var LockType: { new(): LockType };

interface _NativeType extends BaseType {
	/** In the event that a Web Feature Service does not recognize
	  * the vendorId or does not recognize the vendor specific command,
	  * the safeToIgnore attribute is used to indicate whether the
	  * exception can be safely ignored.  A value of TRUE means that
	  * the Web Feature Service may ignore the command.  A value of
	  * FALSE means that a Web Feature Service cannot ignore the
	  * command and an exception should be raised if a problem is
	  * encountered. */
	safeToIgnore: boolean;
	/** The vendorId attribute is used to specify the name of
	  * vendor who's vendor specific command the client
	  * application wishes to execute. */
	vendorId: string;
}
export interface NativeType extends _NativeType { constructor: { new(): NativeType }; }
export var NativeType: { new(): NativeType };

interface _PropertyType extends BaseType {
	/** The Name element contains the name of a feature property
	  * to be updated. */
	Name: string;
}
export interface PropertyType extends _PropertyType { constructor: { new(): PropertyType }; }
export var PropertyType: { new(): PropertyType };

/** The Query element is of type QueryType. */
interface _QueryType extends BaseType {
	/** For systems that implement versioning, the featureVersion
	  * attribute is used to specify which version of a particular
	  * feature instance is to be retrieved.  A value of ALL means
	  * that all versions should be retrieved.  An integer value
	  * 'i', means that the ith version should be retrieve if it
	  * exists or the most recent version otherwise. */
	featureVersion?: string;
	handle?: string;
	typeName: string;
	Filter?: ogc.FilterType;
	PropertyName?: ogc.PropertyNameType[];
}
export interface QueryType extends _QueryType { constructor: { new(): QueryType }; }
export var QueryType: { new(): QueryType };

interface _StatusType extends BaseType {
	FAILED: EmptyType;
	PARTIAL: EmptyType;
	SUCCESS: EmptyType;
}
export interface StatusType extends _StatusType { constructor: { new(): StatusType }; }
export var StatusType: { new(): StatusType };

interface _TransactionResultType extends BaseType {
	handle?: string;
	/** In the event that an exception was encountered while
	  * processing a transaction, a Web Feature Service may
	  * use the Locator element to try and identify the part
	  * of the transaction that failed.  If the element(s)
	  * contained in a Transaction element included a handle
	  * attribute, then a Web Feature Service may report the
	  * handle to identify the offending element. */
	Locator?: string;
	/** The Message element may contain an exception report
	  * generated by a Web Feature Service when an exception
	  * is encountered. */
	Message?: string;
	/** The Status element contains an element indicating the
	  * completion status of a transaction.  The SUCCESS element
	  * is used to indicate successful completion.  The FAILED
	  * element is used to indicate that an exception was
	  * encountered. */
	Status: StatusType;
}
export interface TransactionResultType extends _TransactionResultType { constructor: { new(): TransactionResultType }; }
export var TransactionResultType: { new(): TransactionResultType };

/** The TranactionType defines the Transaction operation.  A
  * Transaction element contains one or more Insert, Update
  * Delete and Native elements that allow a client application
  * to create, modify or remove feature instances from the
  * feature repository that a Web Feature Service controls. */
interface _TransactionType extends BaseType {
	handle?: string;
	/** The releaseAction attribute is used to control how a Web
	  * Feature service releases locks on feature instances after
	  * a Transaction request has been processed.
	  *
	  * Valid values are ALL or SOME.
	  *
	  * A value of ALL means that the Web Feature Service should
	  * release the locks of all feature instances locked with the
	  * specified lockId, regardless or whether or not the features
	  * were actually modified.
	  *
	  * A value of SOME means that the Web Feature Service will
	  * only release the locks held on feature instances that
	  * were actually operated upon by the transaction.  The lockId
	  * that the client application obtained shall remain valid and
	  * the other, unmodified, feature instances shall remain locked.
	  * If the expiry attribute was specified in the original operation
	  * that locked the feature instances, then the expiry counter
	  * will be reset to give the client application that same amount
	  * of time to post subsequent transactions against the locked
	  * features. */
	releaseAction?: AllSomeType;
	service: string;
	version: string;
	/** The Delete element is used to indicate that one or more
	  * feature instances should be removed from the feature
	  * repository. */
	Delete?: DeleteElementType[];
	/** The Insert element is used to indicate that the Web Feature
	  * Service should create a new instance of a feature type.  The
	  * feature instance is specified using GML2 and one or more
	  * feature instances to be created can be contained inside the
	  * Insert element. */
	Insert?: InsertElementType[];
	/** The LockId element contains the value of the lock identifier
	  * obtained by a client application from a previous GetFeatureWithLock
	  * or LockFeature request. */
	LockId?: string;
	/** Many times, a Web Feature Service interacts with a repository
	  * that may have special vendor specific capabilities.  The native
	  * element allows vendor specific command to be passed to the
	  * repository via the Web Feature Service. */
	Native?: NativeType[];
	/** One or more existing feature instances can be changed by
	  * using the Update element.  Changing a feature instance
	  * means that the current value of one or more properties of
	  * the feature are replaced with new values.  The Update
	  * element contains  one or more Property elements.  A
	  * Property element contains the name or a feature property
	  * who's value is to be changed and the replacement value
	  * for that property. */
	Update?: UpdateElementType[];
}
export interface TransactionType extends _TransactionType { constructor: { new(): TransactionType }; }
export var TransactionType: { new(): TransactionType };

interface _UpdateElementType extends BaseType {
	handle?: string;
	typeName: string;
	Filter?: ogc.FilterType;
	/** The Property element is used to specify the new
	  * value of a feature property inside an Update element. */
	Property: PropertyType[];
}
export interface UpdateElementType extends _UpdateElementType { constructor: { new(): UpdateElementType }; }
export var UpdateElementType: { new(): UpdateElementType };

/** The WFS_LockFeatureResponseType is used to define an
  * element to contains the response to a LockFeature
  * operation. */
interface _WFS_LockFeatureResponseType extends BaseType {
	/** The LockFeature or GetFeatureWithLock operations
	  * identify and attempt to lock a set of feature
	  * instances that satisfy the constraints specified
	  * in the request.  In the event that the lockAction
	  * attribute (on the LockFeature or GetFeatureWithLock
	  * elements) is set to SOME, a Web Feature Service will
	  * attempt to lock as many of the feature instances from
	  * the result set as possible.
	  *
	  * The FeaturesLocked element contains list of ogc:FeatureId
	  * elements enumerating the feature instances that a WFS
	  * actually managed to lock. */
	FeaturesLocked?: FeaturesLockedType;
	/** In contrast to the FeaturesLocked element, the
	  * FeaturesNotLocked element contains a list of
	  * ogc:Filter elements identifying feature instances
	  * that a WFS did not manage to lock because they were
	  * already locked by another process. */
	FeaturesNotLocked?: FeaturesNotLockedType;
	/** The LockId element contains the value of the lock identifier
	  * obtained by a client application from a previous GetFeatureWithLock
	  * or LockFeature request. */
	LockId: string;
}
export interface WFS_LockFeatureResponseType extends _WFS_LockFeatureResponseType { constructor: { new(): WFS_LockFeatureResponseType }; }
export var WFS_LockFeatureResponseType: { new(): WFS_LockFeatureResponseType };

/** The WFS_TransactionResponseType defines the format of
  * the XML document that a Web Feature Service generates
  * in response to a Transaction request.  The response
  * includes the completion status of the transaction
  * and the feature identifiers of any newly created
  * feature instances. */
interface _WFS_TransactionResponseType extends BaseType {
	version: string;
	/** The InsertResult element contains a list of ogc:FeatureId
	  * elements that identify any newly created feature instances. */
	InsertResult?: InsertResultType[];
	/** The TransactionResult element contains a Status element
	  * indicating the completion status of a transaction.  In
	  * the event that the transaction fails, additional element
	  * may be included to help locate which part of the transaction
	  * failed and why. */
	TransactionResult: TransactionResultType;
}
export interface WFS_TransactionResponseType extends _WFS_TransactionResponseType { constructor: { new(): WFS_TransactionResponseType }; }
export var WFS_TransactionResponseType: { new(): WFS_TransactionResponseType };

export interface document extends BaseType {
	/** The Delete element is used to indicate that one or more
	  * feature instances should be removed from the feature
	  * repository. */
	Delete: DeleteElementType;
	/** The DescribeFeatureType element is used to request that a Web
	  * Feature Service generate a document describing one or more
	  * feature types. */
	DescribeFeatureType: DescribeFeatureTypeType;
	FAILED: EmptyType;
	/** This element is a container for the response to a GetFeature
	  * or GetFeatureWithLock (WFS-transaction.xsd) request. */
	FeatureCollection: FeatureCollectionType;
	/** The GetCapapbilities element is used to request that a Web Feature
	  * Service generate an XML document describing the organization
	  * providing the service, the WFS operations that the service
	  * supports, a list of feature types that the service can operate
	  * on and list of filtering capabilities that the service support.
	  * Such an XML document is called a capabilities document. */
	GetCapabilities: GetCapabilitiesType;
	/** The GetFeature element is used to request that a Web Feature
	  * Service return feature instances of one or more feature types. */
	GetFeature: GetFeatureType;
	/** This is the root element for the GetFeatureWithLock request.
	  * The GetFeatureWithLock operation performs identically to a
	  * GetFeature request except that the GetFeatureWithLock request
	  * locks all the feature instances in the result set and returns
	  * a lock identifier to a client application in the response. */
	GetFeatureWithLock: GetFeatureWithLockType;
	/** The Insert element is used to indicate that the Web Feature
	  * Service should create a new instance of a feature type.  The
	  * feature instance is specified using GML2 and one or more
	  * feature instances to be created can be contained inside the
	  * Insert element. */
	Insert: InsertElementType;
	/** This is the root element for a LockFeature request.
	  * The LockFeature request can be used to lock one or
	  * more feature instances. */
	LockFeature: LockFeatureType;
	/** The LockId element contains the value of the lock identifier
	  * obtained by a client application from a previous GetFeatureWithLock
	  * or LockFeature request. */
	LockId: string;
	/** Many times, a Web Feature Service interacts with a repository
	  * that may have special vendor specific capabilities.  The native
	  * element allows vendor specific command to be passed to the
	  * repository via the Web Feature Service. */
	Native: NativeType;
	PARTIAL: EmptyType;
	/** The Property element is used to specify the new
	  * value of a feature property inside an Update element. */
	Property: PropertyType;
	/** The Query element is used to describe a single query.
	  * One or more Query elements can be specified inside a
	  * GetFeature element so that multiple queries can be
	  * executed in one request.  The output from the various
	  * queries are combined in a wfs:FeatureCollection element
	  * to form the response to the request. */
	Query: QueryType;
	SUCCESS: EmptyType;
	/** This is the root element for a Transaction request.
	  * A transaction request allows insert, update and
	  * delete operations to be performed to create, change
	  * or remove feature instances. */
	Transaction: TransactionType;
	/** One or more existing feature instances can be changed by
	  * using the Update element.  Changing a feature instance
	  * means that the current value of one or more properties of
	  * the feature are replaced with new values.  The Update
	  * element contains  one or more Property elements.  A
	  * Property element contains the name or a feature property
	  * who's value is to be changed and the replacement value
	  * for that property. */
	Update: UpdateElementType;
	/** The WFS_LockFeatureResponse element contains a report
	  * about the completion status of a LockFeature request. */
	WFS_LockFeatureResponse: WFS_LockFeatureResponseType;
	/** The WFS_TransactionResponse element contains a report
	  * about the completion status of a Transaction operation. */
	WFS_TransactionResponse: WFS_TransactionResponseType;
}
export var document: document;
