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
 * @interface UpdateStoryComment
 */
export interface UpdateStoryComment {
    /**
     * The updated comment text.
     * @type {string}
     * @memberof UpdateStoryComment
     */
    text: string;
}

/**
 * Check if a given object implements the UpdateStoryComment interface.
 */
export function instanceOfUpdateStoryComment(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;

    return isInstance;
}

export function UpdateStoryCommentFromJSON(json: any): UpdateStoryComment {
    return UpdateStoryCommentFromJSONTyped(json, false);
}

export function UpdateStoryCommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateStoryComment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'text': json['text'],
    };
}

export function UpdateStoryCommentToJSON(value?: UpdateStoryComment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
    };
}

