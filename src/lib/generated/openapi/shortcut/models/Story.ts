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
import type { Branch } from './Branch';
import {
    BranchFromJSON,
    BranchFromJSONTyped,
    BranchToJSON,
} from './Branch';
import type { Commit } from './Commit';
import {
    CommitFromJSON,
    CommitFromJSONTyped,
    CommitToJSON,
} from './Commit';
import type { LabelSlim } from './LabelSlim';
import {
    LabelSlimFromJSON,
    LabelSlimFromJSONTyped,
    LabelSlimToJSON,
} from './LabelSlim';
import type { LinkedFile } from './LinkedFile';
import {
    LinkedFileFromJSON,
    LinkedFileFromJSONTyped,
    LinkedFileToJSON,
} from './LinkedFile';
import type { PullRequest } from './PullRequest';
import {
    PullRequestFromJSON,
    PullRequestFromJSONTyped,
    PullRequestToJSON,
} from './PullRequest';
import type { StoryComment } from './StoryComment';
import {
    StoryCommentFromJSON,
    StoryCommentFromJSONTyped,
    StoryCommentToJSON,
} from './StoryComment';
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
import type { Task } from './Task';
import {
    TaskFromJSON,
    TaskFromJSONTyped,
    TaskToJSON,
} from './Task';
import type { TypedStoryLink } from './TypedStoryLink';
import {
    TypedStoryLinkFromJSON,
    TypedStoryLinkFromJSONTyped,
    TypedStoryLinkToJSON,
} from './TypedStoryLink';
import type { UploadedFile } from './UploadedFile';
import {
    UploadedFileFromJSON,
    UploadedFileFromJSONTyped,
    UploadedFileToJSON,
} from './UploadedFile';

/**
 * Stories are the standard unit of work in Shortcut and represent individual features, bugs, and chores.
 * @export
 * @interface Story
 */
export interface Story {
    /**
     * The Shortcut application url for the Story.
     * @type {string}
     * @memberof Story
     */
    appUrl: string;
    /**
     * The description of the story.
     * @type {string}
     * @memberof Story
     */
    description: string;
    /**
     * True if the story has been archived or not.
     * @type {boolean}
     * @memberof Story
     */
    archived: boolean;
    /**
     * A true/false boolean indicating if the Story has been started.
     * @type {boolean}
     * @memberof Story
     */
    started: boolean;
    /**
     * An array of story links attached to the Story.
     * @type {Array<TypedStoryLink>}
     * @memberof Story
     */
    storyLinks: Array<TypedStoryLink>;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Story
     */
    entityType: string;
    /**
     * An array of labels attached to the story.
     * @type {Array<LabelSlim>}
     * @memberof Story
     */
    labels: Array<LabelSlim>;
    /**
     * Deprecated: use member_mention_ids.
     * @type {Array<string>}
     * @memberof Story
     */
    mentionIds: Array<string>;
    /**
     * 
     * @type {SyncedItem}
     * @memberof Story
     */
    syncedItem?: SyncedItem;
    /**
     * An array of Member IDs that have been mentioned in the Story description.
     * @type {Array<string>}
     * @memberof Story
     */
    memberMentionIds: Array<string>;
    /**
     * The type of story (feature, bug, chore).
     * @type {string}
     * @memberof Story
     */
    storyType: string;
    /**
     * An array of CustomField value assertions for the story.
     * @type {Array<StoryCustomField>}
     * @memberof Story
     */
    customFields?: Array<StoryCustomField>;
    /**
     * An array of linked files attached to the story.
     * @type {Array<LinkedFile>}
     * @memberof Story
     */
    linkedFiles: Array<LinkedFile>;
    /**
     * The ID of the workflow the story belongs to.
     * @type {number}
     * @memberof Story
     */
    workflowId: number;
    /**
     * A manual override for the time/date the Story was completed.
     * @type {Date}
     * @memberof Story
     */
    completedAtOverride: Date | null;
    /**
     * The time/date the Story was started.
     * @type {Date}
     * @memberof Story
     */
    startedAt: Date | null;
    /**
     * The time/date the Story was completed.
     * @type {Date}
     * @memberof Story
     */
    completedAt: Date | null;
    /**
     * The name of the story.
     * @type {string}
     * @memberof Story
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Story
     */
    globalId: string;
    /**
     * A true/false boolean indicating if the Story has been completed.
     * @type {boolean}
     * @memberof Story
     */
    completed: boolean;
    /**
     * An array of comments attached to the story.
     * @type {Array<StoryComment>}
     * @memberof Story
     */
    comments: Array<StoryComment>;
    /**
     * A true/false boolean indicating if the Story is currently a blocker of another story.
     * @type {boolean}
     * @memberof Story
     */
    blocker: boolean;
    /**
     * An array of Git branches attached to the story.
     * @type {Array<Branch>}
     * @memberof Story
     */
    branches: Array<Branch>;
    /**
     * The ID of the epic the story belongs to.
     * @type {number}
     * @memberof Story
     */
    epicId: number | null;
    /**
     * The IDs of any unresolved blocker comments on the Story.
     * @type {Array<number>}
     * @memberof Story
     */
    unresolvedBlockerComments?: Array<number>;
    /**
     * The ID of the story template used to create this story, or null if not created using a template.
     * @type {string}
     * @memberof Story
     */
    storyTemplateId: string | null;
    /**
     * An array of external links (strings) associated with a Story
     * @type {Array<string>}
     * @memberof Story
     */
    externalLinks: Array<string>;
    /**
     * The IDs of the iteration the story belongs to.
     * @type {Array<number>}
     * @memberof Story
     */
    previousIterationIds: Array<number>;
    /**
     * The ID of the Member that requested the story.
     * @type {string}
     * @memberof Story
     */
    requestedById: string;
    /**
     * The ID of the iteration the story belongs to.
     * @type {number}
     * @memberof Story
     */
    iterationId: number | null;
    /**
     * An array of tasks connected to the story.
     * @type {Array<Task>}
     * @memberof Story
     */
    tasks: Array<Task>;
    /**
     * An array of label ids attached to the story.
     * @type {Array<number>}
     * @memberof Story
     */
    labelIds: Array<number>;
    /**
     * A manual override for the time/date the Story was started.
     * @type {Date}
     * @memberof Story
     */
    startedAtOverride: Date | null;
    /**
     * The ID of the group associated with the story.
     * @type {string}
     * @memberof Story
     */
    groupId: string | null;
    /**
     * The ID of the workflow state the story is currently in.
     * @type {number}
     * @memberof Story
     */
    workflowStateId: number;
    /**
     * The time/date the Story was updated.
     * @type {Date}
     * @memberof Story
     */
    updatedAt: Date | null;
    /**
     * An array of Pull/Merge Requests attached to the story.
     * @type {Array<PullRequest>}
     * @memberof Story
     */
    pullRequests: Array<PullRequest>;
    /**
     * An array of Group IDs that have been mentioned in the Story description.
     * @type {Array<string>}
     * @memberof Story
     */
    groupMentionIds: Array<string>;
    /**
     * An array of UUIDs for any Members listed as Followers.
     * @type {Array<string>}
     * @memberof Story
     */
    followerIds: Array<string>;
    /**
     * An array of UUIDs of the owners of this story.
     * @type {Array<string>}
     * @memberof Story
     */
    ownerIds: Array<string>;
    /**
     * This field can be set to another unique ID. In the case that the Story has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof Story
     */
    externalId: string | null;
    /**
     * The unique ID of the Story.
     * @type {number}
     * @memberof Story
     */
    id: number;
    /**
     * The lead time (in seconds) of this story when complete.
     * @type {number}
     * @memberof Story
     */
    leadTime?: number;
    /**
     * The numeric point estimate of the story. Can also be null, which means unestimated.
     * @type {number}
     * @memberof Story
     */
    estimate: number | null;
    /**
     * An array of commits attached to the story.
     * @type {Array<Commit>}
     * @memberof Story
     */
    commits: Array<Commit>;
    /**
     * An array of files attached to the story.
     * @type {Array<UploadedFile>}
     * @memberof Story
     */
    files: Array<UploadedFile>;
    /**
     * A number representing the position of the story in relation to every other story in the current project.
     * @type {number}
     * @memberof Story
     */
    position: number;
    /**
     * A true/false boolean indicating if the Story is currently blocked.
     * @type {boolean}
     * @memberof Story
     */
    blocked: boolean;
    /**
     * The ID of the project the story belongs to.
     * @type {number}
     * @memberof Story
     */
    projectId: number | null;
    /**
     * The due date of the story.
     * @type {Date}
     * @memberof Story
     */
    deadline: Date | null;
    /**
     * 
     * @type {StoryStats}
     * @memberof Story
     */
    stats: StoryStats;
    /**
     * The cycle time (in seconds) of this story when complete.
     * @type {number}
     * @memberof Story
     */
    cycleTime?: number;
    /**
     * The time/date the Story was created.
     * @type {Date}
     * @memberof Story
     */
    createdAt: Date;
    /**
     * The time/date the Story was last changed workflow-state.
     * @type {Date}
     * @memberof Story
     */
    movedAt: Date | null;
}

/**
 * Check if a given object implements the Story interface.
 */
export function instanceOfStory(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "started" in value;
    isInstance = isInstance && "storyLinks" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "labels" in value;
    isInstance = isInstance && "mentionIds" in value;
    isInstance = isInstance && "memberMentionIds" in value;
    isInstance = isInstance && "storyType" in value;
    isInstance = isInstance && "linkedFiles" in value;
    isInstance = isInstance && "workflowId" in value;
    isInstance = isInstance && "completedAtOverride" in value;
    isInstance = isInstance && "startedAt" in value;
    isInstance = isInstance && "completedAt" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "globalId" in value;
    isInstance = isInstance && "completed" in value;
    isInstance = isInstance && "comments" in value;
    isInstance = isInstance && "blocker" in value;
    isInstance = isInstance && "branches" in value;
    isInstance = isInstance && "epicId" in value;
    isInstance = isInstance && "storyTemplateId" in value;
    isInstance = isInstance && "externalLinks" in value;
    isInstance = isInstance && "previousIterationIds" in value;
    isInstance = isInstance && "requestedById" in value;
    isInstance = isInstance && "iterationId" in value;
    isInstance = isInstance && "tasks" in value;
    isInstance = isInstance && "labelIds" in value;
    isInstance = isInstance && "startedAtOverride" in value;
    isInstance = isInstance && "groupId" in value;
    isInstance = isInstance && "workflowStateId" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "pullRequests" in value;
    isInstance = isInstance && "groupMentionIds" in value;
    isInstance = isInstance && "followerIds" in value;
    isInstance = isInstance && "ownerIds" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "estimate" in value;
    isInstance = isInstance && "commits" in value;
    isInstance = isInstance && "files" in value;
    isInstance = isInstance && "position" in value;
    isInstance = isInstance && "blocked" in value;
    isInstance = isInstance && "projectId" in value;
    isInstance = isInstance && "deadline" in value;
    isInstance = isInstance && "stats" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "movedAt" in value;

    return isInstance;
}

export function StoryFromJSON(json: any): Story {
    return StoryFromJSONTyped(json, false);
}

export function StoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Story {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appUrl': json['app_url'],
        'description': json['description'],
        'archived': json['archived'],
        'started': json['started'],
        'storyLinks': ((json['story_links'] as Array<any>).map(TypedStoryLinkFromJSON)),
        'entityType': json['entity_type'],
        'labels': ((json['labels'] as Array<any>).map(LabelSlimFromJSON)),
        'mentionIds': json['mention_ids'],
        'syncedItem': !exists(json, 'synced_item') ? undefined : SyncedItemFromJSON(json['synced_item']),
        'memberMentionIds': json['member_mention_ids'],
        'storyType': json['story_type'],
        'customFields': !exists(json, 'custom_fields') ? undefined : ((json['custom_fields'] as Array<any>).map(StoryCustomFieldFromJSON)),
        'linkedFiles': ((json['linked_files'] as Array<any>).map(LinkedFileFromJSON)),
        'workflowId': json['workflow_id'],
        'completedAtOverride': (json['completed_at_override'] === null ? null : new Date(json['completed_at_override'])),
        'startedAt': (json['started_at'] === null ? null : new Date(json['started_at'])),
        'completedAt': (json['completed_at'] === null ? null : new Date(json['completed_at'])),
        'name': json['name'],
        'globalId': json['global_id'],
        'completed': json['completed'],
        'comments': ((json['comments'] as Array<any>).map(StoryCommentFromJSON)),
        'blocker': json['blocker'],
        'branches': ((json['branches'] as Array<any>).map(BranchFromJSON)),
        'epicId': json['epic_id'],
        'unresolvedBlockerComments': !exists(json, 'unresolved_blocker_comments') ? undefined : json['unresolved_blocker_comments'],
        'storyTemplateId': json['story_template_id'],
        'externalLinks': json['external_links'],
        'previousIterationIds': json['previous_iteration_ids'],
        'requestedById': json['requested_by_id'],
        'iterationId': json['iteration_id'],
        'tasks': ((json['tasks'] as Array<any>).map(TaskFromJSON)),
        'labelIds': json['label_ids'],
        'startedAtOverride': (json['started_at_override'] === null ? null : new Date(json['started_at_override'])),
        'groupId': json['group_id'],
        'workflowStateId': json['workflow_state_id'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'pullRequests': ((json['pull_requests'] as Array<any>).map(PullRequestFromJSON)),
        'groupMentionIds': json['group_mention_ids'],
        'followerIds': json['follower_ids'],
        'ownerIds': json['owner_ids'],
        'externalId': json['external_id'],
        'id': json['id'],
        'leadTime': !exists(json, 'lead_time') ? undefined : json['lead_time'],
        'estimate': json['estimate'],
        'commits': ((json['commits'] as Array<any>).map(CommitFromJSON)),
        'files': ((json['files'] as Array<any>).map(UploadedFileFromJSON)),
        'position': json['position'],
        'blocked': json['blocked'],
        'projectId': json['project_id'],
        'deadline': (json['deadline'] === null ? null : new Date(json['deadline'])),
        'stats': StoryStatsFromJSON(json['stats']),
        'cycleTime': !exists(json, 'cycle_time') ? undefined : json['cycle_time'],
        'createdAt': (new Date(json['created_at'])),
        'movedAt': (json['moved_at'] === null ? null : new Date(json['moved_at'])),
    };
}

export function StoryToJSON(value?: Story | null): any {
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
        'mention_ids': value.mentionIds,
        'synced_item': SyncedItemToJSON(value.syncedItem),
        'member_mention_ids': value.memberMentionIds,
        'story_type': value.storyType,
        'custom_fields': value.customFields === undefined ? undefined : ((value.customFields as Array<any>).map(StoryCustomFieldToJSON)),
        'linked_files': ((value.linkedFiles as Array<any>).map(LinkedFileToJSON)),
        'workflow_id': value.workflowId,
        'completed_at_override': (value.completedAtOverride === null ? null : value.completedAtOverride.toISOString()),
        'started_at': (value.startedAt === null ? null : value.startedAt.toISOString()),
        'completed_at': (value.completedAt === null ? null : value.completedAt.toISOString()),
        'name': value.name,
        'global_id': value.globalId,
        'completed': value.completed,
        'comments': ((value.comments as Array<any>).map(StoryCommentToJSON)),
        'blocker': value.blocker,
        'branches': ((value.branches as Array<any>).map(BranchToJSON)),
        'epic_id': value.epicId,
        'unresolved_blocker_comments': value.unresolvedBlockerComments,
        'story_template_id': value.storyTemplateId,
        'external_links': value.externalLinks,
        'previous_iteration_ids': value.previousIterationIds,
        'requested_by_id': value.requestedById,
        'iteration_id': value.iterationId,
        'tasks': ((value.tasks as Array<any>).map(TaskToJSON)),
        'label_ids': value.labelIds,
        'started_at_override': (value.startedAtOverride === null ? null : value.startedAtOverride.toISOString()),
        'group_id': value.groupId,
        'workflow_state_id': value.workflowStateId,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'pull_requests': ((value.pullRequests as Array<any>).map(PullRequestToJSON)),
        'group_mention_ids': value.groupMentionIds,
        'follower_ids': value.followerIds,
        'owner_ids': value.ownerIds,
        'external_id': value.externalId,
        'id': value.id,
        'lead_time': value.leadTime,
        'estimate': value.estimate,
        'commits': ((value.commits as Array<any>).map(CommitToJSON)),
        'files': ((value.files as Array<any>).map(UploadedFileToJSON)),
        'position': value.position,
        'blocked': value.blocked,
        'project_id': value.projectId,
        'deadline': (value.deadline === null ? null : value.deadline.toISOString()),
        'stats': StoryStatsToJSON(value.stats),
        'cycle_time': value.cycleTime,
        'created_at': (value.createdAt.toISOString()),
        'moved_at': (value.movedAt === null ? null : value.movedAt.toISOString()),
    };
}

