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
 * The estimate value for the Story
 * @export
 * @interface StoryHistoryChangeOldNewInt
 */
export interface StoryHistoryChangeOldNewInt {
    /**
     * The old value.
     * @type {number}
     * @memberof StoryHistoryChangeOldNewInt
     */
    old?: number;
    /**
     * The new value.
     * @type {number}
     * @memberof StoryHistoryChangeOldNewInt
     */
    _new?: number;
}

/**
 * Check if a given object implements the StoryHistoryChangeOldNewInt interface.
 */
export function instanceOfStoryHistoryChangeOldNewInt(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StoryHistoryChangeOldNewIntFromJSON(json: any): StoryHistoryChangeOldNewInt {
    return StoryHistoryChangeOldNewIntFromJSONTyped(json, false);
}

export function StoryHistoryChangeOldNewIntFromJSONTyped(json: any, ignoreDiscriminator: boolean): StoryHistoryChangeOldNewInt {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'old': !exists(json, 'old') ? undefined : json['old'],
        '_new': !exists(json, 'new') ? undefined : json['new'],
    };
}

export function StoryHistoryChangeOldNewIntToJSON(value?: StoryHistoryChangeOldNewInt | null): any {
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

