/* tslint:disable */
/* eslint-disable */
/**
 * Shortcut API
 * Shortcut API
 *
 * The version of the OpenAPI document: 3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * The Identity of the VCS user that authored the Commit.
 * @export
 * @interface Identity
 */
export interface Identity {
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Identity
     */
    entityType: string;
    /**
     * This is your login in VCS.
     * @type {string}
     * @memberof Identity
     */
    name: string | null;
    /**
     * The type of Identity; currently only type is github.
     * @type {string}
     * @memberof Identity
     */
    type: string | null;
}

/**
 * Check if a given object implements the Identity interface.
 */
export function instanceOfIdentity(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function IdentityFromJSON(json: any): Identity {
    return IdentityFromJSONTyped(json, false);
}

export function IdentityFromJSONTyped(json: any, ignoreDiscriminator: boolean): Identity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityType': json['entity_type'],
        'name': json['name'],
        'type': json['type'],
    };
}

export function IdentityToJSON(value?: Identity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': value.entityType,
        'name': value.name,
        'type': value.type,
    };
}

