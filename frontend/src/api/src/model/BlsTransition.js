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
import Bls from './Bls';
import OccupationTransition from './OccupationTransition';

/**
 * The BlsTransition model module.
 * @module model/BlsTransition
 * @version v1
 */
class BlsTransition {
    /**
     * Constructs a new <code>BlsTransition</code>.
     * @alias module:model/BlsTransition
     */
    constructor() { 
        
        BlsTransition.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>BlsTransition</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BlsTransition} obj Optional instance to populate.
     * @return {module:model/BlsTransition} The populated <code>BlsTransition</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new BlsTransition();

            if (data.hasOwnProperty('bls')) {
                obj['bls'] = Bls.constructFromObject(data['bls']);
            }
            if (data.hasOwnProperty('transitions')) {
                obj['transitions'] = OccupationTransition.constructFromObject(data['transitions']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Bls} bls
 */
BlsTransition.prototype['bls'] = undefined;

/**
 * @member {module:model/OccupationTransition} transitions
 */
BlsTransition.prototype['transitions'] = undefined;






export default BlsTransition;

