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
import type { LabelSlim } from './LabelSlim';
import {
    LabelSlimFromJSON,
    LabelSlimFromJSONTyped,
    LabelSlimToJSON,
} from './LabelSlim';
import type { StoryCustomField } from './StoryCustomField';
import {
    StoryCustomFieldFromJSON,
    StoryCustomFieldFromJSONTyped,
    StoryCustomFieldToJSON,
} from './StoryCustomField';
import type { StoryStats } from './StoryStats';
import {
    StoryStatsFromJSON,
    StoryStatsFromJSONTyped,
    StoryStatsToJSON,
} from './StoryStats';
import type { SyncedItem } from './SyncedItem';
import {
    SyncedItemFromJSON,
    SyncedItemFromJSONTyped,
    SyncedItemToJSON,
} from './SyncedItem';
import type { TypedStoryLink } from './TypedStoryLink';
import {
    TypedStoryLinkFromJSON,
    TypedStoryLinkFromJSONTyped,
    TypedStoryLinkToJSON,
} from './TypedStoryLink';

/**
 * StorySlim represents the same resource as a Story, but is more light-weight. For certain fields it provides ids rather than full resources (e.g., `comment_ids` and `file_ids`) and it also excludes certain aggregate values (e.g., `cycle_time`). The `description` field can be optionally included. Use the [Get Story](#Get-Story) endpoint to fetch the unabridged payload for a Story.
 * @export
 * @interface StorySlim
 */
export interface StorySlim {
    /**
     * The Shortcut application url for the Story.
     * @type {string}
     * @memberof StorySlim
     */
    appUrl: string;
    /**
     * The description of the Story.
     * @type {string}
     * @memberof StorySlim
     */
    description?: string;
    /**
     * True if the story has been archived or not.
     * @type {boolean}
     * @memberof StorySlim
     */
    archived: boolean;
    /**
     * A true/false boolean indicating if the Story has been started.
     * @type {boolean}
     * @memberof StorySlim
     */
    started: boolean;
    /**
     * An array of story links attached to the Story.
     * @type {Array<TypedStoryLink>}
     * @memberof StorySlim
     */
    storyLinks: Array<TypedStoryLink>;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof StorySlim
     */
    entityType: string;
    /**
     * An array of labels attached to the story.
     * @type {Array<LabelSlim>}
     * @memberof StorySlim
     */
    labels: Array<LabelSlim>;
    /**
     * An array of IDs of Tasks attached to the story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    taskIds: Array<number>;
    /**
     * Deprecated: use member_mention_ids.
     * @type {Array<string>}
     * @memberof StorySlim
     */
    mentionIds: Array<string>;
    /**
     * 
     * @type {SyncedItem}
     * @memberof StorySlim
     */
    syncedItem?: SyncedItem;
    /**
     * An array of Member IDs that have been mentioned in the Story description.
     * @type {Array<string>}
     * @memberof StorySlim
     */
    memberMentionIds: Array<string>;
    /**
     * The type of story (feature, bug, chore).
     * @type {string}
     * @memberof StorySlim
     */
    storyType: string;
    /**
     * An array of CustomField value assertions for the story.
     * @type {Array<StoryCustomField>}
     * @memberof StorySlim
     */
    customFields?: Array<StoryCustomField>;
    /**
     * An array of IDs of Files attached to the story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    fileIds: Array<number>;
    /**
     * The number of tasks on the story which are complete.
     * @type {number}
     * @memberof StorySlim
     */
    numTasksCompleted: number;
    /**
     * The ID of the workflow the story belongs to.
     * @type {number}
     * @memberof StorySlim
     */
    workflowId: number;
    /**
     * A manual override for the time/date the Story was completed.
     * @type {Date}
     * @memberof StorySlim
     */
    completedAtOverride: Date | null;
    /**
     * The time/date the Story was started.
     * @type {Date}
     * @memberof StorySlim
     */
    startedAt: Date | null;
    /**
     * The time/date the Story was completed.
     * @type {Date}
     * @memberof StorySlim
     */
    completedAt: Date | null;
    /**
     * The name of the story.
     * @type {string}
     * @memberof StorySlim
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof StorySlim
     */
    globalId: string;
    /**
     * A true/false boolean indicating if the Story has been completed.
     * @type {boolean}
     * @memberof StorySlim
     */
    completed: boolean;
    /**
     * A true/false boolean indicating if the Story is currently a blocker of another story.
     * @type {boolean}
     * @memberof StorySlim
     */
    blocker: boolean;
    /**
     * The ID of the epic the story belongs to.
     * @type {number}
     * @memberof StorySlim
     */
    epicId: number | null;
    /**
     * The IDs of any unresolved blocker comments on the Story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    unresolvedBlockerComments?: Array<number>;
    /**
     * The ID of the story template used to create this story, or null if not created using a template.
     * @type {string}
     * @memberof StorySlim
     */
    storyTemplateId: string | null;
    /**
     * An array of external links (strings) associated with a Story
     * @type {Array<string>}
     * @memberof StorySlim
     */
    externalLinks: Array<string>;
    /**
     * The IDs of the iteration the story belongs to.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    previousIterationIds: Array<number>;
    /**
     * The ID of the Member that requested the story.
     * @type {string}
     * @memberof StorySlim
     */
    requestedById: string;
    /**
     * The ID of the iteration the story belongs to.
     * @type {number}
     * @memberof StorySlim
     */
    iterationId: number | null;
    /**
     * An array of label ids attached to the story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    labelIds: Array<number>;
    /**
     * A manual override for the time/date the Story was started.
     * @type {Date}
     * @memberof StorySlim
     */
    startedAtOverride: Date | null;
    /**
     * The ID of the group associated with the story.
     * @type {string}
     * @memberof StorySlim
     */
    groupId: string | null;
    /**
     * The ID of the workflow state the story is currently in.
     * @type {number}
     * @memberof StorySlim
     */
    workflowStateId: number;
    /**
     * The time/date the Story was updated.
     * @type {Date}
     * @memberof StorySlim
     */
    updatedAt: Date | null;
    /**
     * An array of Group IDs that have been mentioned in the Story description.
     * @type {Array<string>}
     * @memberof StorySlim
     */
    groupMentionIds: Array<string>;
    /**
     * An array of UUIDs for any Members listed as Followers.
     * @type {Array<string>}
     * @memberof StorySlim
     */
    followerIds: Array<string>;
    /**
     * An array of UUIDs of the owners of this story.
     * @type {Array<string>}
     * @memberof StorySlim
     */
    ownerIds: Array<string>;
    /**
     * This field can be set to another unique ID. In the case that the Story has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof StorySlim
     */
    externalId: string | null;
    /**
     * The unique ID of the Story.
     * @type {number}
     * @memberof StorySlim
     */
    id: number;
    /**
     * The lead time (in seconds) of this story when complete.
     * @type {number}
     * @memberof StorySlim
     */
    leadTime?: number;
    /**
     * The numeric point estimate of the story. Can also be null, which means unestimated.
     * @type {number}
     * @memberof StorySlim
     */
    estimate: number | null;
    /**
     * A number representing the position of the story in relation to every other story in the current project.
     * @type {number}
     * @memberof StorySlim
     */
    position: number;
    /**
     * A true/false boolean indicating if the Story is currently blocked.
     * @type {boolean}
     * @memberof StorySlim
     */
    blocked: boolean;
    /**
     * The ID of the project the story belongs to.
     * @type {number}
     * @memberof StorySlim
     */
    projectId: number | null;
    /**
     * An array of IDs of LinkedFiles attached to the story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    linkedFileIds: Array<number>;
    /**
     * The due date of the story.
     * @type {Date}
     * @memberof StorySlim
     */
    deadline: Date | null;
    /**
     * 
     * @type {StoryStats}
     * @memberof StorySlim
     */
    stats: StoryStats;
    /**
     * An array of IDs of Comments attached to the story.
     * @type {Array<number>}
     * @memberof StorySlim
     */
    commentIds: Array<number>;
    /**
     * The cycle time (in seconds) of this story when complete.
     * @type {number}
     * @memberof StorySlim
     */
    cycleTime?: number;
    /**
     * The time/date the Story was created.
     * @type {Date}
     * @memberof StorySlim
     */
    createdAt: Date;
    /**
     * The time/date the Story was last changed workflow-state.
     * @type {Date}
     * @memberof StorySlim
     */
    movedAt: Date | null;
}

/**
 * Check if a given object implements the StorySlim interface.
 */
export function instanceOfStorySlim(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "started" in value;
    isInstance = isInstance && "storyLinks" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "labels" in value;
    isInstance = isInstance && "taskIds" in value;
    isInstance = isInstance && "mentionIds" in value;
    isInstance = isInstance && "memberMentionIds" in value;
    isInstance = isInstance && "storyType" in value;
    isInstance = isInstance && "fileIds" in value;
    isInstance = isInstance && "numTasksCompleted" in value;
    isInstance = isInstance && "workflowId" in value;
    isInstance = isInstance && "completedAtOverride" in value;
    isInstance = isInstance && "startedAt" in value;
    isInstance = isInstance && "completedAt" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "globalId" in value;
    isInstance = isInstance && "completed" in value;
    isInstance = isInstance && "blocker" in value;
    isInstance = isInstance && "epicId" in value;
    isInstance = isInstance && "storyTemplateId" in value;
    isInstance = isInstance && "externalLinks" in value;
    isInstance = isInstance && "previousIterationIds" in value;
    isInstance = isInstance && "requestedById" in value;
    isInstance = isInstance && "iterationId" in value;
    isInstance = isInstance && "labelIds" in value;
    isInstance = isInstance && "startedAtOverride" in value;
    isInstance = isInstance && "groupId" in value;
    isInstance = isInstance && "workflowStateId" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "groupMentionIds" in value;
    isInstance = isInstance && "followerIds" in value;
    isInstance = isInstance && "ownerIds" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "estimate" in value;
    isInstance = isInstance && "position" in value;
    isInstance = isInstance && "blocked" in value;
    isInstance = isInstance && "projectId" in value;
    isInstance = isInstance && "linkedFileIds" in value;
    isInstance = isInstance && "deadline" in value;
    isInstance = isInstance && "stats" in value;
    isInstance = isInstance && "commentIds" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "movedAt" in value;

    return isInstance;
}

export function StorySlimFromJSON(json: any): StorySlim {
    return StorySlimFromJSONTyped(json, false);
}

export function StorySlimFromJSONTyped(json: any, ignoreDiscriminator: boolean): StorySlim {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appUrl': json['app_url'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'archived': json['archived'],
        'started': json['started'],
        'storyLinks': ((json['story_links'] as Array<any>).map(TypedStoryLinkFromJSON)),
        'entityType': json['entity_type'],
        'labels': ((json['labels'] as Array<any>).map(LabelSlimFromJSON)),
        'taskIds': json['task_ids'],
        'mentionIds': json['mention_ids'],
        'syncedItem': !exists(json, 'synced_item') ? undefined : SyncedItemFromJSON(json['synced_item']),
        'memberMentionIds': json['member_mention_ids'],
        'storyType': json['story_type'],
        'customFields': !exists(json, 'custom_fields') ? undefined : ((json['custom_fields'] as Array<any>).map(StoryCustomFieldFromJSON)),
        'fileIds': json['file_ids'],
        'numTasksCompleted': json['num_tasks_completed'],
        'workflowId': json['workflow_id'],
        'completedAtOverride': (json['completed_at_override'] === null ? null : new Date(json['completed_at_override'])),
        'startedAt': (json['started_at'] === null ? null : new Date(json['started_at'])),
        'completedAt': (json['completed_at'] === null ? null : new Date(json['completed_at'])),
        'name': json['name'],
        'globalId': json['global_id'],
        'completed': json['completed'],
        'blocker': json['blocker'],
        'epicId': json['epic_id'],
        'unresolvedBlockerComments': !exists(json, 'unresolved_blocker_comments') ? undefined : json['unresolved_blocker_comments'],
        'storyTemplateId': json['story_template_id'],
        'externalLinks': json['external_links'],
        'previousIterationIds': json['previous_iteration_ids'],
        'requestedById': json['requested_by_id'],
        'iterationId': json['iteration_id'],
        'labelIds': json['label_ids'],
        'startedAtOverride': (json['started_at_override'] === null ? null : new Date(json['started_at_override'])),
        'groupId': json['group_id'],
        'workflowStateId': json['workflow_state_id'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'groupMentionIds': json['group_mention_ids'],
        'followerIds': json['follower_ids'],
        'ownerIds': json['owner_ids'],
        'externalId': json['external_id'],
        'id': json['id'],
        'leadTime': !exists(json, 'lead_time') ? undefined : json['lead_time'],
        'estimate': json['estimate'],
        'position': json['position'],
        'blocked': json['blocked'],
        'projectId': json['project_id'],
        'linkedFileIds': json['linked_file_ids'],
        'deadline': (json['deadline'] === null ? null : new Date(json['deadline'])),
        'stats': StoryStatsFromJSON(json['stats']),
        'commentIds': json['comment_ids'],
        'cycleTime': !exists(json, 'cycle_time') ? undefined : json['cycle_time'],
        'createdAt': (new Date(json['created_at'])),
        'movedAt': (json['moved_at'] === null ? null : new Date(json['moved_at'])),
    };
}

export function StorySlimToJSON(value?: StorySlim | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'app_url': value.appUrl,
        'description': value.description,
        'archived': value.archived,
        'started': value.started,
        'story_links': ((value.storyLinks as Array<any>).map(TypedStoryLinkToJSON)),
        'entity_type': value.entityType,
        'labels': ((value.labels as Array<any>).map(LabelSlimToJSON)),
        'task_ids': value.taskIds,
        'mention_ids': value.mentionIds,
        'synced_item': SyncedItemToJSON(value.syncedItem),
        'member_mention_ids': value.memberMentionIds,
        'story_type': value.storyType,
        'custom_fields': value.customFields === undefined ? undefined : ((value.customFields as Array<any>).map(StoryCustomFieldToJSON)),
        'file_ids': value.fileIds,
        'num_tasks_completed': value.numTasksCompleted,
        'workflow_id': value.workflowId,
        'completed_at_override': (value.completedAtOverride === null ? null : value.completedAtOverride.toISOString()),
        'started_at': (value.startedAt === null ? null : value.startedAt.toISOString()),
        'completed_at': (value.completedAt === null ? null : value.completedAt.toISOString()),
        'name': value.name,
        'global_id': value.globalId,
        'completed': value.completed,
        'blocker': value.blocker,
        'epic_id': value.epicId,
        'unresolved_blocker_comments': value.unresolvedBlockerComments,
        'story_template_id': value.storyTemplateId,
        'external_links': value.externalLinks,
        'previous_iteration_ids': value.previousIterationIds,
        'requested_by_id': value.requestedById,
        'iteration_id': value.iterationId,
        'label_ids': value.labelIds,
        'started_at_override': (value.startedAtOverride === null ? null : value.startedAtOverride.toISOString()),
        'group_id': value.groupId,
        'workflow_state_id': value.workflowStateId,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'group_mention_ids': value.groupMentionIds,
        'follower_ids': value.followerIds,
        'owner_ids': value.ownerIds,
        'external_id': value.externalId,
        'id': value.id,
        'lead_time': value.leadTime,
        'estimate': value.estimate,
        'position': value.position,
        'blocked': value.blocked,
        'project_id': value.projectId,
        'linked_file_ids': value.linkedFileIds,
        'deadline': (value.deadline === null ? null : value.deadline.toISOString()),
        'stats': StoryStatsToJSON(value.stats),
        'comment_ids': value.commentIds,
        'cycle_time': value.cycleTime,
        'created_at': (value.createdAt.toISOString()),
        'moved_at': (value.movedAt === null ? null : value.movedAt.toISOString()),
    };
}

