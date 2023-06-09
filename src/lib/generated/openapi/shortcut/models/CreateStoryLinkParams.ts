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
 * Request parameters for creating a Story Link within a Story.
 * @export
 * @interface CreateStoryLinkParams
 */
export interface CreateStoryLinkParams {
    /**
     * The unique ID of the Story defined as subject.
     * @type {number}
     * @memberof CreateStoryLinkParams
     */
    subjectId?: number;
    /**
     * How the subject Story acts on the object Story. This can be "blocks", "duplicates", or "relates to".
     * @type {string}
     * @memberof CreateStoryLinkParams
     */
    verb: CreateStoryLinkParamsVerbEnum;
    /**
     * The unique ID of the Story defined as object.
     * @type {number}
     * @memberof CreateStoryLinkParams
     */
    objectId?: number;
}


/**
 * @export
 */
export const CreateStoryLinkParamsVerbEnum = {
    Blocks: 'blocks',
    Duplicates: 'duplicates',
    RelatesTo: 'relates to'
} as const;
export type CreateStoryLinkParamsVerbEnum = typeof CreateStoryLinkParamsVerbEnum[keyof typeof CreateStoryLinkParamsVerbEnum];


/**
 * Check if a given object implements the CreateStoryLinkParams interface.
 */
export function instanceOfCreateStoryLinkParams(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "verb" in value;

    return isInstance;
}

export function CreateStoryLinkParamsFromJSON(json: any): CreateStoryLinkParams {
    return CreateStoryLinkParamsFromJSONTyped(json, false);
}

export function CreateStoryLinkParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateStoryLinkParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'subjectId': !exists(json, 'subject_id') ? undefined : json['subject_id'],
        'verb': json['verb'],
        'objectId': !exists(json, 'object_id') ? undefined : json['object_id'],
    };
}

export function CreateStoryLinkParamsToJSON(value?: CreateStoryLinkParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'subject_id': value.subjectId,
        'verb': value.verb,
        'object_id': value.objectId,
    };
}

