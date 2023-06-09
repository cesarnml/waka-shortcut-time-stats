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
 * The Team ID for the Story.
 * @export
 * @interface StoryHistoryChangeOldNewUuid
 */
export interface StoryHistoryChangeOldNewUuid {
    /**
     * The old value.
     * @type {string}
     * @memberof StoryHistoryChangeOldNewUuid
     */
    old?: string;
    /**
     * The new value.
     * @type {string}
     * @memberof StoryHistoryChangeOldNewUuid
     */
    _new?: string;
}

/**
 * Check if a given object implements the StoryHistoryChangeOldNewUuid interface.
 */
export function instanceOfStoryHistoryChangeOldNewUuid(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StoryHistoryChangeOldNewUuidFromJSON(json: any): StoryHistoryChangeOldNewUuid {
    return StoryHistoryChangeOldNewUuidFromJSONTyped(json, false);
}

export function StoryHistoryChangeOldNewUuidFromJSONTyped(json: any, ignoreDiscriminator: boolean): StoryHistoryChangeOldNewUuid {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'old': !exists(json, 'old') ? undefined : json['old'],
        '_new': !exists(json, 'new') ? undefined : json['new'],
    };
}

export function StoryHistoryChangeOldNewUuidToJSON(value?: StoryHistoryChangeOldNewUuid | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'old': value.old,
        'new': value._new,
    };
}

