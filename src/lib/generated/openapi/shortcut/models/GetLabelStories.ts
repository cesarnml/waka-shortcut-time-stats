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
 * @interface GetLabelStories
 */
export interface GetLabelStories {
    /**
     * A true/false boolean indicating whether to return Stories with their descriptions.
     * @type {boolean}
     * @memberof GetLabelStories
     */
    includesDescription?: boolean;
}

/**
 * Check if a given object implements the GetLabelStories interface.
 */
export function instanceOfGetLabelStories(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetLabelStoriesFromJSON(json: any): GetLabelStories {
    return GetLabelStoriesFromJSONTyped(json, false);
}

export function GetLabelStoriesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetLabelStories {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'includesDescription': !exists(json, 'includes_description') ? undefined : json['includes_description'],
    };
}

export function GetLabelStoriesToJSON(value?: GetLabelStories | null): any {
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
