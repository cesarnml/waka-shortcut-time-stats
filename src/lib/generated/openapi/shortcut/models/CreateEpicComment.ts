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
 * @interface CreateEpicComment
 */
export interface CreateEpicComment {
    /**
     * The comment text.
     * @type {string}
     * @memberof CreateEpicComment
     */
    text: string;
    /**
     * The Member ID of the Comment's author. Defaults to the user identified by the API token.
     * @type {string}
     * @memberof CreateEpicComment
     */
    authorId?: string;
    /**
     * Defaults to the time/date the comment is created, but can be set to reflect another date.
     * @type {Date}
     * @memberof CreateEpicComment
     */
    createdAt?: Date;
    /**
     * Defaults to the time/date the comment is last updated, but can be set to reflect another date.
     * @type {Date}
     * @memberof CreateEpicComment
     */
    updatedAt?: Date;
    /**
     * This field can be set to another unique ID. In the case that the comment has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof CreateEpicComment
     */
    externalId?: string;
}

/**
 * Check if a given object implements the CreateEpicComment interface.
 */
export function instanceOfCreateEpicComment(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;

    return isInstance;
}

export function CreateEpicCommentFromJSON(json: any): CreateEpicComment {
    return CreateEpicCommentFromJSONTyped(json, false);
}

export function CreateEpicCommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateEpicComment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'text': json['text'],
        'authorId': !exists(json, 'author_id') ? undefined : json['author_id'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'externalId': !exists(json, 'external_id') ? undefined : json['external_id'],
    };
}

export function CreateEpicCommentToJSON(value?: CreateEpicComment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
        'author_id': value.authorId,
        'created_at': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updated_at': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'external_id': value.externalId,
    };
}

