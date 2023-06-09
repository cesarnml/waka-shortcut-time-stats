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
 * @interface UpdateComment
 */
export interface UpdateComment {
    /**
     * The updated comment text.
     * @type {string}
     * @memberof UpdateComment
     */
    text: string;
}

/**
 * Check if a given object implements the UpdateComment interface.
 */
export function instanceOfUpdateComment(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;

    return isInstance;
}

export function UpdateCommentFromJSON(json: any): UpdateComment {
    return UpdateCommentFromJSONTyped(json, false);
}

export function UpdateCommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateComment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'text': json['text'],
    };
}

export function UpdateCommentToJSON(value?: UpdateComment | null): any {
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

