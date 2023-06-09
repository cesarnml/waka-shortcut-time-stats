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
 * @interface GetProjectStories
 */
export interface GetProjectStories {
    /**
     * A true/false boolean indicating whether to return Stories with their descriptions.
     * @type {boolean}
     * @memberof GetProjectStories
     */
    includesDescription?: boolean;
}

/**
 * Check if a given object implements the GetProjectStories interface.
 */
export function instanceOfGetProjectStories(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GetProjectStoriesFromJSON(json: any): GetProjectStories {
    return GetProjectStoriesFromJSONTyped(json, false);
}

export function GetProjectStoriesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetProjectStories {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'includesDescription': !exists(json, 'includes_description') ? undefined : json['includes_description'],
    };
}

export function GetProjectStoriesToJSON(value?: GetProjectStories | null): any {
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

