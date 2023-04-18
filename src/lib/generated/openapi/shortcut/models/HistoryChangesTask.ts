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
import type { StoryHistoryChangeAddsRemovesUuid } from './StoryHistoryChangeAddsRemovesUuid';
import {
    StoryHistoryChangeAddsRemovesUuidFromJSON,
    StoryHistoryChangeAddsRemovesUuidFromJSONTyped,
    StoryHistoryChangeAddsRemovesUuidToJSON,
} from './StoryHistoryChangeAddsRemovesUuid';
import type { StoryHistoryChangeOldNewBool } from './StoryHistoryChangeOldNewBool';
import {
    StoryHistoryChangeOldNewBoolFromJSON,
    StoryHistoryChangeOldNewBoolFromJSONTyped,
    StoryHistoryChangeOldNewBoolToJSON,
} from './StoryHistoryChangeOldNewBool';
import type { StoryHistoryChangeOldNewStr } from './StoryHistoryChangeOldNewStr';
import {
    StoryHistoryChangeOldNewStrFromJSON,
    StoryHistoryChangeOldNewStrFromJSONTyped,
    StoryHistoryChangeOldNewStrToJSON,
} from './StoryHistoryChangeOldNewStr';

/**
 * The changes that have occurred as a result of the action.
 * @export
 * @interface HistoryChangesTask
 */
export interface HistoryChangesTask {
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesTask
     */
    complete?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeOldNewStr}
     * @memberof HistoryChangesTask
     */
    description?: StoryHistoryChangeOldNewStr;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesTask
     */
    mentionIds?: StoryHistoryChangeAddsRemovesUuid;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesTask
     */
    ownerIds?: StoryHistoryChangeAddsRemovesUuid;
}

/**
 * Check if a given object implements the HistoryChangesTask interface.
 */
export function instanceOfHistoryChangesTask(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function HistoryChangesTaskFromJSON(json: any): HistoryChangesTask {
    return HistoryChangesTaskFromJSONTyped(json, false);
}

export function HistoryChangesTaskFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryChangesTask {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'complete': !exists(json, 'complete') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['complete']),
        'description': !exists(json, 'description') ? undefined : StoryHistoryChangeOldNewStrFromJSON(json['description']),
        'mentionIds': !exists(json, 'mention_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['mention_ids']),
        'ownerIds': !exists(json, 'owner_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['owner_ids']),
    };
}

export function HistoryChangesTaskToJSON(value?: HistoryChangesTask | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'complete': StoryHistoryChangeOldNewBoolToJSON(value.complete),
        'description': StoryHistoryChangeOldNewStrToJSON(value.description),
        'mention_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.mentionIds),
        'owner_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.ownerIds),
    };
}

