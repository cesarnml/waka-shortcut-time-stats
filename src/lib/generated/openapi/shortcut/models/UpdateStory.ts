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

import { exists, mapValues } from '../runtime'
import type { CreateLabelParams } from './CreateLabelParams'
import {
  CreateLabelParamsFromJSON,
  CreateLabelParamsFromJSONTyped,
  CreateLabelParamsToJSON,
} from './CreateLabelParams'
import type { CustomFieldValueParams } from './CustomFieldValueParams'
import {
  CustomFieldValueParamsFromJSON,
  CustomFieldValueParamsFromJSONTyped,
  CustomFieldValueParamsToJSON,
} from './CustomFieldValueParams'

/**
 *
 * @export
 * @interface UpdateStory
 */
export interface UpdateStory {
  /**
   * The description of the story.
   * @type {string}
   * @memberof UpdateStory
   */
  description?: string
  /**
   * True if the story is archived, otherwise false.
   * @type {boolean}
   * @memberof UpdateStory
   */
  archived?: boolean
  /**
   * An array of labels attached to the story.
   * @type {Array<CreateLabelParams>}
   * @memberof UpdateStory
   */
  labels?: Array<CreateLabelParams>
  /**
   * An array of IDs of Pull/Merge Requests attached to the story.
   * @type {Set<number>}
   * @memberof UpdateStory
   */
  pullRequestIds?: Set<number>
  /**
   * The type of story (feature, bug, chore).
   * @type {string}
   * @memberof UpdateStory
   */
  storyType?: UpdateStoryStoryTypeEnum
  /**
   * A map specifying a CustomField ID and CustomFieldEnumValue ID that represents an assertion of some value for a CustomField.
   * @type {Array<CustomFieldValueParams>}
   * @memberof UpdateStory
   */
  customFields?: Array<CustomFieldValueParams>
  /**
   * One of "first" or "last". This can be used to move the given story to the first or last position in the workflow state.
   * @type {string}
   * @memberof UpdateStory
   */
  moveTo?: UpdateStoryMoveToEnum
  /**
   * An array of IDs of files attached to the story.
   * @type {Set<number>}
   * @memberof UpdateStory
   */
  fileIds?: Set<number>
  /**
   * A manual override for the time/date the Story was completed.
   * @type {Date}
   * @memberof UpdateStory
   */
  completedAtOverride?: Date | null
  /**
   * The title of the story.
   * @type {string}
   * @memberof UpdateStory
   */
  name?: string
  /**
   * The ID of the epic the story belongs to.
   * @type {number}
   * @memberof UpdateStory
   */
  epicId?: number | null
  /**
   * An array of External Links associated with this story.
   * @type {Array<string>}
   * @memberof UpdateStory
   */
  externalLinks?: Array<string>
  /**
   * An array of IDs of Branches attached to the story.
   * @type {Set<number>}
   * @memberof UpdateStory
   */
  branchIds?: Set<number>
  /**
   * An array of IDs of Commits attached to the story.
   * @type {Set<number>}
   * @memberof UpdateStory
   */
  commitIds?: Set<number>
  /**
   * The ID of the member that requested the story.
   * @type {string}
   * @memberof UpdateStory
   */
  requestedById?: string
  /**
   * The ID of the iteration the story belongs to.
   * @type {number}
   * @memberof UpdateStory
   */
  iterationId?: number | null
  /**
   * A manual override for the time/date the Story was started.
   * @type {Date}
   * @memberof UpdateStory
   */
  startedAtOverride?: Date | null
  /**
   * The ID of the group to associate with this story
   * @type {string}
   * @memberof UpdateStory
   */
  groupId?: string | null
  /**
   * The ID of the workflow state to put the story in.
   * @type {number}
   * @memberof UpdateStory
   */
  workflowStateId?: number
  /**
   * An array of UUIDs of the followers of this story.
   * @type {Set<string>}
   * @memberof UpdateStory
   */
  followerIds?: Set<string>
  /**
   * An array of UUIDs of the owners of this story.
   * @type {Set<string>}
   * @memberof UpdateStory
   */
  ownerIds?: Set<string>
  /**
   * The ID of the story we want to move this story before.
   * @type {number}
   * @memberof UpdateStory
   */
  beforeId?: number
  /**
   * The numeric point estimate of the story. Can also be null, which means unestimated.
   * @type {number}
   * @memberof UpdateStory
   */
  estimate?: number | null
  /**
   * The ID of the story we want to move this story after.
   * @type {number}
   * @memberof UpdateStory
   */
  afterId?: number
  /**
   * The ID of the project the story belongs to.
   * @type {number}
   * @memberof UpdateStory
   */
  projectId?: number | null
  /**
   * An array of IDs of linked files attached to the story.
   * @type {Set<number>}
   * @memberof UpdateStory
   */
  linkedFileIds?: Set<number>
  /**
   * The due date of the story.
   * @type {Date}
   * @memberof UpdateStory
   */
  deadline?: Date | null
}

/**
 * @export
 */
export const UpdateStoryStoryTypeEnum = {
  Feature: 'feature',
  Chore: 'chore',
  Bug: 'bug',
} as const
export type UpdateStoryStoryTypeEnum =
  (typeof UpdateStoryStoryTypeEnum)[keyof typeof UpdateStoryStoryTypeEnum]

/**
 * @export
 */
export const UpdateStoryMoveToEnum = {
  Last: 'last',
  First: 'first',
} as const
export type UpdateStoryMoveToEnum =
  (typeof UpdateStoryMoveToEnum)[keyof typeof UpdateStoryMoveToEnum]

/**
 * Check if a given object implements the UpdateStory interface.
 */
export function instanceOfUpdateStory(value: object): boolean {
  let isInstance = true

  return isInstance
}

export function UpdateStoryFromJSON(json: any): UpdateStory {
  return UpdateStoryFromJSONTyped(json, false)
}

export function UpdateStoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateStory {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: !exists(json, 'description') ? undefined : json['description'],
    archived: !exists(json, 'archived') ? undefined : json['archived'],
    labels: !exists(json, 'labels')
      ? undefined
      : (json['labels'] as Array<any>).map(CreateLabelParamsFromJSON),
    pullRequestIds: !exists(json, 'pull_request_ids') ? undefined : json['pull_request_ids'],
    storyType: !exists(json, 'story_type') ? undefined : json['story_type'],
    customFields: !exists(json, 'custom_fields')
      ? undefined
      : (json['custom_fields'] as Array<any>).map(CustomFieldValueParamsFromJSON),
    moveTo: !exists(json, 'move_to') ? undefined : json['move_to'],
    fileIds: !exists(json, 'file_ids') ? undefined : json['file_ids'],
    completedAtOverride: !exists(json, 'completed_at_override')
      ? undefined
      : json['completed_at_override'] === null
      ? null
      : new Date(json['completed_at_override']),
    name: !exists(json, 'name') ? undefined : json['name'],
    epicId: !exists(json, 'epic_id') ? undefined : json['epic_id'],
    externalLinks: !exists(json, 'external_links') ? undefined : json['external_links'],
    branchIds: !exists(json, 'branch_ids') ? undefined : json['branch_ids'],
    commitIds: !exists(json, 'commit_ids') ? undefined : json['commit_ids'],
    requestedById: !exists(json, 'requested_by_id') ? undefined : json['requested_by_id'],
    iterationId: !exists(json, 'iteration_id') ? undefined : json['iteration_id'],
    startedAtOverride: !exists(json, 'started_at_override')
      ? undefined
      : json['started_at_override'] === null
      ? null
      : new Date(json['started_at_override']),
    groupId: !exists(json, 'group_id') ? undefined : json['group_id'],
    workflowStateId: !exists(json, 'workflow_state_id') ? undefined : json['workflow_state_id'],
    followerIds: !exists(json, 'follower_ids') ? undefined : json['follower_ids'],
    ownerIds: !exists(json, 'owner_ids') ? undefined : json['owner_ids'],
    beforeId: !exists(json, 'before_id') ? undefined : json['before_id'],
    estimate: !exists(json, 'estimate') ? undefined : json['estimate'],
    afterId: !exists(json, 'after_id') ? undefined : json['after_id'],
    projectId: !exists(json, 'project_id') ? undefined : json['project_id'],
    linkedFileIds: !exists(json, 'linked_file_ids') ? undefined : json['linked_file_ids'],
    deadline: !exists(json, 'deadline')
      ? undefined
      : json['deadline'] === null
      ? null
      : new Date(json['deadline']),
  }
}

export function UpdateStoryToJSON(value?: UpdateStory | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    description: value.description,
    archived: value.archived,
    labels:
      value.labels === undefined
        ? undefined
        : (value.labels as Array<any>).map(CreateLabelParamsToJSON),
    pull_request_ids:
      value.pullRequestIds === undefined ? undefined : Array.from(value.pullRequestIds as Set<any>),
    story_type: value.storyType,
    custom_fields:
      value.customFields === undefined
        ? undefined
        : (value.customFields as Array<any>).map(CustomFieldValueParamsToJSON),
    move_to: value.moveTo,
    file_ids: value.fileIds === undefined ? undefined : Array.from(value.fileIds as Set<any>),
    completed_at_override:
      value.completedAtOverride === undefined
        ? undefined
        : value.completedAtOverride === null
        ? null
        : value.completedAtOverride.toISOString(),
    name: value.name,
    epic_id: value.epicId,
    external_links: value.externalLinks,
    branch_ids: value.branchIds === undefined ? undefined : Array.from(value.branchIds as Set<any>),
    commit_ids: value.commitIds === undefined ? undefined : Array.from(value.commitIds as Set<any>),
    requested_by_id: value.requestedById,
    iteration_id: value.iterationId,
    started_at_override:
      value.startedAtOverride === undefined
        ? undefined
        : value.startedAtOverride === null
        ? null
        : value.startedAtOverride.toISOString(),
    group_id: value.groupId,
    workflow_state_id: value.workflowStateId,
    follower_ids:
      value.followerIds === undefined ? undefined : Array.from(value.followerIds as Set<any>),
    owner_ids: value.ownerIds === undefined ? undefined : Array.from(value.ownerIds as Set<any>),
    before_id: value.beforeId,
    estimate: value.estimate,
    after_id: value.afterId,
    project_id: value.projectId,
    linked_file_ids:
      value.linkedFileIds === undefined ? undefined : Array.from(value.linkedFileIds as Set<any>),
    deadline:
      value.deadline === undefined
        ? undefined
        : value.deadline === null
        ? null
        : value.deadline.toISOString(),
  }
}
