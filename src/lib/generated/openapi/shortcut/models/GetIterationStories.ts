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
 * 
 * @export
 * @interface GetIterationStories
 */
export interface GetIterationStories {
    /**
     * A true/false boolean indicating whether to return Stories with their descriptions.
     * @type {boolean}
     * @memberof GetIterationStories
     */
    includesDescription?: boolean;
}

/**
 * Check if a given object implements the GetIterationStories interface.
 */
export function instanceOfGetIterationStories(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetIterationStoriesFromJSON(json: any): GetIterationStories {
    return GetIterationStoriesFromJSONTyped(json, false);
}

export function GetIterationStoriesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetIterationStories {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'includesDescription': !exists(json, 'includes_description') ? undefined : json['includes_description'],
    };
}

export function GetIterationStoriesToJSON(value?: GetIterationStories | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'includes_description': value.includesDescription,
    };
}

