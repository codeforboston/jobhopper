/**
 * Jobhopper API
 * Jobhopper Swagger API Docs
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The StateName model module.
 * @module model/StateName
 * @version v1
 */
class StateName {
    /**
     * Constructs a new <code>StateName</code>.
     * @alias module:model/StateName
     * @param abbreviation {String} 
     * @param stateName {String} 
     */
    constructor(abbreviation, stateName) { 
        
        StateName.initialize(this, abbreviation, stateName);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, abbreviation, stateName) { 
        obj['abbreviation'] = abbreviation;
        obj['state_name'] = stateName;
    }

    /**
     * Constructs a <code>StateName</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StateName} obj Optional instance to populate.
     * @return {module:model/StateName} The populated <code>StateName</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StateName();

            if (data.hasOwnProperty('abbreviation')) {
                obj['abbreviation'] = ApiClient.convertToType(data['abbreviation'], 'String');
            }
            if (data.hasOwnProperty('state_name')) {
                obj['state_name'] = ApiClient.convertToType(data['state_name'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} abbreviation
 */
StateName.prototype['abbreviation'] = undefined;

/**
 * @member {String} state_name
 */
StateName.prototype['state_name'] = undefined;






export default StateName;

