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

/**
 *
 * @export
 * @interface UpdateEpic
 */
export interface UpdateEpic {
  /**
   * The Epic's description.
   * @type {string}
   * @memberof UpdateEpic
   */
  description?: string
  /**
   * A true/false boolean indicating whether the Epic is in archived state.
   * @type {boolean}
   * @memberof UpdateEpic
   */
  archived?: boolean
  /**
   * An array of Labels attached to the Epic.
   * @type {Array<CreateLabelParams>}
   * @memberof UpdateEpic
   */
  labels?: Array<CreateLabelParams>
  /**
   * A manual override for the time/date the Epic was completed.
   * @type {Date}
   * @memberof UpdateEpic
   */
  completedAtOverride?: Date | null
  /**
   * The Epic's name.
   * @type {string}
   * @memberof UpdateEpic
   */
  name?: string
  /**
   * The Epic's planned start date.
   * @type {Date}
   * @memberof UpdateEpic
   */
  plannedStartDate?: Date | null
  /**
   * `Deprecated` The Epic's state (to do, in progress, or done); will be ignored when `epic_state_id` is set.
   * @type {string}
   * @memberof UpdateEpic
   */
  state?: UpdateEpicStateEnum
  /**
   * The ID of the Milestone this Epic is related to.
   * @type {number}
   * @memberof UpdateEpic
   */
  milestoneId?: number | null
  /**
   * The ID of the member that requested the epic.
   * @type {string}
   * @memberof UpdateEpic
   */
  requestedById?: string
  /**
   * The ID of the Epic State.
   * @type {number}
   * @memberof UpdateEpic
   */
  epicStateId?: number
  /**
   * A manual override for the time/date the Epic was started.
   * @type {Date}
   * @memberof UpdateEpic
   */
  startedAtOverride?: Date | null
  /**
   * The ID of the group to associate with the epic.
   * @type {string}
   * @memberof UpdateEpic
   */
  groupId?: string | null
  /**
   * An array of UUIDs for any Members you want to add as Followers on this Epic.
   * @type {Array<string>}
   * @memberof UpdateEpic
   */
  followerIds?: Array<string>
  /**
   * An array of UUIDs for any members you want to add as Owners on this Epic.
   * @type {Array<string>}
   * @memberof UpdateEpic
   */
  ownerIds?: Array<string>
  /**
   * The ID of the Epic we want to move this Epic before.
   * @type {number}
   * @memberof UpdateEpic
   */
  beforeId?: number
  /**
   * The ID of the Epic we want to move this Epic after.
   * @type {number}
   * @memberof UpdateEpic
   */
  afterId?: number
  /**
   * The Epic's deadline.
   * @type {Date}
   * @memberof UpdateEpic
   */
  deadline?: Date | null
}

/**
 * @export
 */
export const UpdateEpicStateEnum = {
  InProgress: 'in progress',
  ToDo: 'to do',
  Done: 'done',
} as const
export type UpdateEpicStateEnum = (typeof UpdateEpicStateEnum)[keyof typeof UpdateEpicStateEnum]

/**
 * Check if a given object implements the UpdateEpic interface.
 */
export function instanceOfUpdateEpic(value: object): boolean {
  let isInstance = true

  return isInstance
}

export function UpdateEpicFromJSON(json: any): UpdateEpic {
  return UpdateEpicFromJSONTyped(json, false)
}

export function UpdateEpicFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateEpic {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: !exists(json, 'description') ? undefined : json['description'],
    archived: !exists(json, 'archived') ? undefined : json['archived'],
    labels: !exists(json, 'labels')
      ? undefined
      : (json['labels'] as Array<any>).map(CreateLabelParamsFromJSON),
    completedAtOverride: !exists(json, 'completed_at_override')
      ? undefined
      : json['completed_at_override'] === null
      ? null
      : new Date(json['completed_at_override']),
    name: !exists(json, 'name') ? undefined : json['name'],
    plannedStartDate: !exists(json, 'planned_start_date')
      ? undefined
      : json['planned_start_date'] === null
      ? null
      : new Date(json['planned_start_date']),
    state: !exists(json, 'state') ? undefined : json['state'],
    milestoneId: !exists(json, 'milestone_id') ? undefined : json['milestone_id'],
    requestedById: !exists(json, 'requested_by_id') ? undefined : json['requested_by_id'],
    epicStateId: !exists(json, 'epic_state_id') ? undefined : json['epic_state_id'],
    startedAtOverride: !exists(json, 'started_at_override')
      ? undefined
      : json['started_at_override'] === null
      ? null
      : new Date(json['started_at_override']),
    groupId: !exists(json, 'group_id') ? undefined : json['group_id'],
    followerIds: !exists(json, 'follower_ids') ? undefined : json['follower_ids'],
    ownerIds: !exists(json, 'owner_ids') ? undefined : json['owner_ids'],
    beforeId: !exists(json, 'before_id') ? undefined : json['before_id'],
    afterId: !exists(json, 'after_id') ? undefined : json['after_id'],
    deadline: !exists(json, 'deadline')
      ? undefined
      : json['deadline'] === null
      ? null
      : new Date(json['deadline']),
  }
}

export function UpdateEpicToJSON(value?: UpdateEpic | null): any {
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
    completed_at_override:
      value.completedAtOverride === undefined
        ? undefined
        : value.completedAtOverride === null
        ? null
        : value.completedAtOverride.toISOString(),
    name: value.name,
    planned_start_date:
      value.plannedStartDate === undefined
        ? undefined
        : value.plannedStartDate === null
        ? null
        : value.plannedStartDate.toISOString(),
    state: value.state,
    milestone_id: value.milestoneId,
    requested_by_id: value.requestedById,
    epic_state_id: value.epicStateId,
    started_at_override:
      value.startedAtOverride === undefined
        ? undefined
        : value.startedAtOverride === null
        ? null
        : value.startedAtOverride.toISOString(),
    group_id: value.groupId,
    follower_ids: value.followerIds,
    owner_ids: value.ownerIds,
    before_id: value.beforeId,
    after_id: value.afterId,
    deadline:
      value.deadline === undefined
        ? undefined
        : value.deadline === null
        ? null
        : value.deadline.toISOString(),
  }
}
