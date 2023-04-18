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
 * A reference to a Story.
 * @export
 * @interface HistoryReferenceStory
 */
export interface HistoryReferenceStory {
    /**
     * The ID of the entity referenced.
     * @type {object}
     * @memberof HistoryReferenceStory
     */
    id: object;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryReferenceStory
     */
    entityType: string;
    /**
     * The application URL of the Story.
     * @type {string}
     * @memberof HistoryReferenceStory
     */
    appUrl: string;
    /**
     * The name of the entity referenced.
     * @type {string}
     * @memberof HistoryReferenceStory
     */
    name: string;
    /**
     * If the referenced entity is a Story, either "bug", "chore", or "feature".
     * @type {string}
     * @memberof HistoryReferenceStory
     */
    storyType: HistoryReferenceStoryStoryTypeEnum;
}


/**
 * @export
 */
export const HistoryReferenceStoryStoryTypeEnum = {
    Feature: 'feature',
    Chore: 'chore',
    Bug: 'bug'
} as const;
export type HistoryReferenceStoryStoryTypeEnum = typeof HistoryReferenceStoryStoryTypeEnum[keyof typeof HistoryReferenceStoryStoryTypeEnum];


/**
 * Check if a given object implements the HistoryReferenceStory interface.
 */
export function instanceOfHistoryReferenceStory(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "storyType" in value;

    return isInstance;
}

export function HistoryReferenceStoryFromJSON(json: any): HistoryReferenceStory {
    return HistoryReferenceStoryFromJSONTyped(json, false);
}

export function HistoryReferenceStoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryReferenceStory {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'entityType': json['entity_type'],
        'appUrl': json['app_url'],
        'name': json['name'],
        'storyType': json['story_type'],
    };
}

export function HistoryReferenceStoryToJSON(value?: HistoryReferenceStory | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'entity_type': value.entityType,
        'app_url': value.appUrl,
        'name': value.name,
        'story_type': value.storyType,
    };
}

