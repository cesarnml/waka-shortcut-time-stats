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
import type { StoryHistoryChangeAddsRemovesInt } from './StoryHistoryChangeAddsRemovesInt';
import {
    StoryHistoryChangeAddsRemovesIntFromJSON,
    StoryHistoryChangeAddsRemovesIntFromJSONTyped,
    StoryHistoryChangeAddsRemovesIntToJSON,
} from './StoryHistoryChangeAddsRemovesInt';
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
import type { StoryHistoryChangeOldNewInt } from './StoryHistoryChangeOldNewInt';
import {
    StoryHistoryChangeOldNewIntFromJSON,
    StoryHistoryChangeOldNewIntFromJSONTyped,
    StoryHistoryChangeOldNewIntToJSON,
} from './StoryHistoryChangeOldNewInt';
import type { StoryHistoryChangeOldNewStr } from './StoryHistoryChangeOldNewStr';
import {
    StoryHistoryChangeOldNewStrFromJSON,
    StoryHistoryChangeOldNewStrFromJSONTyped,
    StoryHistoryChangeOldNewStrToJSON,
} from './StoryHistoryChangeOldNewStr';
import type { StoryHistoryChangeOldNewUuid } from './StoryHistoryChangeOldNewUuid';
import {
    StoryHistoryChangeOldNewUuidFromJSON,
    StoryHistoryChangeOldNewUuidFromJSONTyped,
    StoryHistoryChangeOldNewUuidToJSON,
} from './StoryHistoryChangeOldNewUuid';

/**
 * The changes that have occurred as a result of the action.
 * @export
 * @interface HistoryChangesStory
 */
export interface HistoryChangesStory {
    /**
     * 
     * @type {StoryHistoryChangeOldNewStr}
     * @memberof HistoryChangesStory
     */
    description?: StoryHistoryChangeOldNewStr;
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesStory
     */
    archived?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesStory
     */
    started?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    taskIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesStory
     */
    mentionIds?: StoryHistoryChangeAddsRemovesUuid;
    /**
     * 
     * @type {StoryHistoryChangeOldNewStr}
     * @memberof HistoryChangesStory
     */
    storyType?: StoryHistoryChangeOldNewStr;
    /**
     * 
     * @type {StoryHistoryChangeOldNewStr}
     * @memberof HistoryChangesStory
     */
    name?: StoryHistoryChangeOldNewStr;
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesStory
     */
    completed?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesStory
     */
    blocker?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeOldNewInt}
     * @memberof HistoryChangesStory
     */
    epicId?: StoryHistoryChangeOldNewInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    branchIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    commitIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeOldNewUuid}
     * @memberof HistoryChangesStory
     */
    requestedById?: StoryHistoryChangeOldNewUuid;
    /**
     * 
     * @type {StoryHistoryChangeOldNewInt}
     * @memberof HistoryChangesStory
     */
    iterationId?: StoryHistoryChangeOldNewInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    labelIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeOldNewUuid}
     * @memberof HistoryChangesStory
     */
    groupId?: StoryHistoryChangeOldNewUuid;
    /**
     * 
     * @type {StoryHistoryChangeOldNewInt}
     * @memberof HistoryChangesStory
     */
    workflowStateId?: StoryHistoryChangeOldNewInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    objectStoryLinkIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesStory
     */
    followerIds?: StoryHistoryChangeAddsRemovesUuid;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesStory
     */
    ownerIds?: StoryHistoryChangeAddsRemovesUuid;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesUuid}
     * @memberof HistoryChangesStory
     */
    customFieldValueIds?: StoryHistoryChangeAddsRemovesUuid;
    /**
     * 
     * @type {StoryHistoryChangeOldNewInt}
     * @memberof HistoryChangesStory
     */
    estimate?: StoryHistoryChangeOldNewInt;
    /**
     * 
     * @type {StoryHistoryChangeAddsRemovesInt}
     * @memberof HistoryChangesStory
     */
    subjectStoryLinkIds?: StoryHistoryChangeAddsRemovesInt;
    /**
     * 
     * @type {StoryHistoryChangeOldNewBool}
     * @memberof HistoryChangesStory
     */
    blocked?: StoryHistoryChangeOldNewBool;
    /**
     * 
     * @type {StoryHistoryChangeOldNewInt}
     * @memberof HistoryChangesStory
     */
    projectId?: StoryHistoryChangeOldNewInt;
    /**
     * 
     * @type {StoryHistoryChangeOldNewStr}
     * @memberof HistoryChangesStory
     */
    deadline?: StoryHistoryChangeOldNewStr;
}

/**
 * Check if a given object implements the HistoryChangesStory interface.
 */
export function instanceOfHistoryChangesStory(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function HistoryChangesStoryFromJSON(json: any): HistoryChangesStory {
    return HistoryChangesStoryFromJSONTyped(json, false);
}

export function HistoryChangesStoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryChangesStory {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : StoryHistoryChangeOldNewStrFromJSON(json['description']),
        'archived': !exists(json, 'archived') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['archived']),
        'started': !exists(json, 'started') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['started']),
        'taskIds': !exists(json, 'task_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['task_ids']),
        'mentionIds': !exists(json, 'mention_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['mention_ids']),
        'storyType': !exists(json, 'story_type') ? undefined : StoryHistoryChangeOldNewStrFromJSON(json['story_type']),
        'name': !exists(json, 'name') ? undefined : StoryHistoryChangeOldNewStrFromJSON(json['name']),
        'completed': !exists(json, 'completed') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['completed']),
        'blocker': !exists(json, 'blocker') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['blocker']),
        'epicId': !exists(json, 'epic_id') ? undefined : StoryHistoryChangeOldNewIntFromJSON(json['epic_id']),
        'branchIds': !exists(json, 'branch_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['branch_ids']),
        'commitIds': !exists(json, 'commit_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['commit_ids']),
        'requestedById': !exists(json, 'requested_by_id') ? undefined : StoryHistoryChangeOldNewUuidFromJSON(json['requested_by_id']),
        'iterationId': !exists(json, 'iteration_id') ? undefined : StoryHistoryChangeOldNewIntFromJSON(json['iteration_id']),
        'labelIds': !exists(json, 'label_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['label_ids']),
        'groupId': !exists(json, 'group_id') ? undefined : StoryHistoryChangeOldNewUuidFromJSON(json['group_id']),
        'workflowStateId': !exists(json, 'workflow_state_id') ? undefined : StoryHistoryChangeOldNewIntFromJSON(json['workflow_state_id']),
        'objectStoryLinkIds': !exists(json, 'object_story_link_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['object_story_link_ids']),
        'followerIds': !exists(json, 'follower_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['follower_ids']),
        'ownerIds': !exists(json, 'owner_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['owner_ids']),
        'customFieldValueIds': !exists(json, 'custom_field_value_ids') ? undefined : StoryHistoryChangeAddsRemovesUuidFromJSON(json['custom_field_value_ids']),
        'estimate': !exists(json, 'estimate') ? undefined : StoryHistoryChangeOldNewIntFromJSON(json['estimate']),
        'subjectStoryLinkIds': !exists(json, 'subject_story_link_ids') ? undefined : StoryHistoryChangeAddsRemovesIntFromJSON(json['subject_story_link_ids']),
        'blocked': !exists(json, 'blocked') ? undefined : StoryHistoryChangeOldNewBoolFromJSON(json['blocked']),
        'projectId': !exists(json, 'project_id') ? undefined : StoryHistoryChangeOldNewIntFromJSON(json['project_id']),
        'deadline': !exists(json, 'deadline') ? undefined : StoryHistoryChangeOldNewStrFromJSON(json['deadline']),
    };
}

export function HistoryChangesStoryToJSON(value?: HistoryChangesStory | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': StoryHistoryChangeOldNewStrToJSON(value.description),
        'archived': StoryHistoryChangeOldNewBoolToJSON(value.archived),
        'started': StoryHistoryChangeOldNewBoolToJSON(value.started),
        'task_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.taskIds),
        'mention_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.mentionIds),
        'story_type': StoryHistoryChangeOldNewStrToJSON(value.storyType),
        'name': StoryHistoryChangeOldNewStrToJSON(value.name),
        'completed': StoryHistoryChangeOldNewBoolToJSON(value.completed),
        'blocker': StoryHistoryChangeOldNewBoolToJSON(value.blocker),
        'epic_id': StoryHistoryChangeOldNewIntToJSON(value.epicId),
        'branch_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.branchIds),
        'commit_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.commitIds),
        'requested_by_id': StoryHistoryChangeOldNewUuidToJSON(value.requestedById),
        'iteration_id': StoryHistoryChangeOldNewIntToJSON(value.iterationId),
        'label_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.labelIds),
        'group_id': StoryHistoryChangeOldNewUuidToJSON(value.groupId),
        'workflow_state_id': StoryHistoryChangeOldNewIntToJSON(value.workflowStateId),
        'object_story_link_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.objectStoryLinkIds),
        'follower_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.followerIds),
        'owner_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.ownerIds),
        'custom_field_value_ids': StoryHistoryChangeAddsRemovesUuidToJSON(value.customFieldValueIds),
        'estimate': StoryHistoryChangeOldNewIntToJSON(value.estimate),
        'subject_story_link_ids': StoryHistoryChangeAddsRemovesIntToJSON(value.subjectStoryLinkIds),
        'blocked': StoryHistoryChangeOldNewBoolToJSON(value.blocked),
        'project_id': StoryHistoryChangeOldNewIntToJSON(value.projectId),
        'deadline': StoryHistoryChangeOldNewStrToJSON(value.deadline),
    };
}
