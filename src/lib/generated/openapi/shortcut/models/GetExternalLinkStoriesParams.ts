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
 * @interface GetExternalLinkStoriesParams
 */
export interface GetExternalLinkStoriesParams {
    /**
     * The external link associated with one or more stories.
     * @type {string}
     * @memberof GetExternalLinkStoriesParams
     */
    externalLink: string;
}

/**
 * Check if a given object implements the GetExternalLinkStoriesParams interface.
 */
export function instanceOfGetExternalLinkStoriesParams(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "externalLink" in value;

    return isInstance;
}

export function GetExternalLinkStoriesParamsFromJSON(json: any): GetExternalLinkStoriesParams {
    return GetExternalLinkStoriesParamsFromJSONTyped(json, false);
}

export function GetExternalLinkStoriesParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetExternalLinkStoriesParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'externalLink': json['external_link'],
    };
}

export function GetExternalLinkStoriesParamsToJSON(value?: GetExternalLinkStoriesParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'external_link': value.externalLink,
    };
}

