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
 * An action representing a Story Comment being created.
 * @export
 * @interface HistoryActionStoryCommentCreate
 */
export interface HistoryActionStoryCommentCreate {
    /**
     * The ID of the entity referenced.
     * @type {number}
     * @memberof HistoryActionStoryCommentCreate
     */
    id: number;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryActionStoryCommentCreate
     */
    entityType: string;
    /**
     * The action of the entity referenced.
     * @type {string}
     * @memberof HistoryActionStoryCommentCreate
     */
    action: HistoryActionStoryCommentCreateActionEnum;
    /**
     * The application URL of the Story Comment.
     * @type {string}
     * @memberof HistoryActionStoryCommentCreate
     */
    appUrl: string;
    /**
     * The text of the Story Comment.
     * @type {string}
     * @memberof HistoryActionStoryCommentCreate
     */
    text: string;
    /**
     * The Member ID of who created the Story Comment.
     * @type {string}
     * @memberof HistoryActionStoryCommentCreate
     */
    authorId: string;
}


/**
 * @export
 */
export const HistoryActionStoryCommentCreateActionEnum = {
    Create: 'create'
} as const;
export type HistoryActionStoryCommentCreateActionEnum = typeof HistoryActionStoryCommentCreateActionEnum[keyof typeof HistoryActionStoryCommentCreateActionEnum];


/**
 * Check if a given object implements the HistoryActionStoryCommentCreate interface.
 */
export function instanceOfHistoryActionStoryCommentCreate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "action" in value;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "text" in value;
    isInstance = isInstance && "authorId" in value;

    return isInstance;
}

export function HistoryActionStoryCommentCreateFromJSON(json: any): HistoryActionStoryCommentCreate {
    return HistoryActionStoryCommentCreateFromJSONTyped(json, false);
}

export function HistoryActionStoryCommentCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryActionStoryCommentCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'entityType': json['entity_type'],
        'action': json['action'],
        'appUrl': json['app_url'],
        'text': json['text'],
        'authorId': json['author_id'],
    };
}

export function HistoryActionStoryCommentCreateToJSON(value?: HistoryActionStoryCommentCreate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'entity_type': value.entityType,
        'action': value.action,
        'app_url': value.appUrl,
        'text': value.text,
        'author_id': value.authorId,
    };
}

