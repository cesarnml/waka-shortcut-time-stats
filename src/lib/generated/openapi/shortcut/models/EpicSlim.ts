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
import type { EpicAssociatedGroup } from './EpicAssociatedGroup'
import {
  EpicAssociatedGroupFromJSON,
  EpicAssociatedGroupFromJSONTyped,
  EpicAssociatedGroupToJSON,
} from './EpicAssociatedGroup'
import type { EpicStats } from './EpicStats'
import { EpicStatsFromJSON, EpicStatsFromJSONTyped, EpicStatsToJSON } from './EpicStats'
import type { LabelSlim } from './LabelSlim'
import { LabelSlimFromJSON, LabelSlimFromJSONTyped, LabelSlimToJSON } from './LabelSlim'

/**
 * EpicSlim represents the same resource as an Epic but is more light-weight, including all Epic fields except the comments array. The description string can be optionally included. Use the [Get Epic](#Get-Epic) endpoint to fetch the unabridged payload for an Epic.
 * @export
 * @interface EpicSlim
 */
export interface EpicSlim {
  /**
   * The Shortcut application url for the Epic.
   * @type {string}
   * @memberof EpicSlim
   */
  appUrl: string
  /**
   * The Epic's description.
   * @type {string}
   * @memberof EpicSlim
   */
  description?: string
  /**
   * True/false boolean that indicates whether the Epic is archived or not.
   * @type {boolean}
   * @memberof EpicSlim
   */
  archived: boolean
  /**
   * A true/false boolean indicating if the Epic has been started.
   * @type {boolean}
   * @memberof EpicSlim
   */
  started: boolean
  /**
   * A string description of this resource.
   * @type {string}
   * @memberof EpicSlim
   */
  entityType: string
  /**
   * An array of Labels attached to the Epic.
   * @type {Array<LabelSlim>}
   * @memberof EpicSlim
   */
  labels: Array<LabelSlim>
  /**
   * Deprecated: use member_mention_ids.
   * @type {Array<string>}
   * @memberof EpicSlim
   */
  mentionIds: Array<string>
  /**
   * An array of Member IDs that have been mentioned in the Epic description.
   * @type {Array<string>}
   * @memberof EpicSlim
   */
  memberMentionIds: Array<string>
  /**
   * An array containing Group IDs and Group-owned story counts for the Epic's associated groups.
   * @type {Array<EpicAssociatedGroup>}
   * @memberof EpicSlim
   */
  associatedGroups: Array<EpicAssociatedGroup>
  /**
   * The IDs of Projects related to this Epic.
   * @type {Array<number>}
   * @memberof EpicSlim
   */
  projectIds: Array<number>
  /**
   * The number of stories in this epic which are not associated with a project.
   * @type {number}
   * @memberof EpicSlim
   */
  storiesWithoutProjects: number
  /**
   * A manual override for the time/date the Epic was completed.
   * @type {Date}
   * @memberof EpicSlim
   */
  completedAtOverride: Date | null
  /**
   * The ID of the associated productboard integration.
   * @type {string}
   * @memberof EpicSlim
   */
  productboardPluginId: string | null
  /**
   * The time/date the Epic was started.
   * @type {Date}
   * @memberof EpicSlim
   */
  startedAt: Date | null
  /**
   * The time/date the Epic was completed.
   * @type {Date}
   * @memberof EpicSlim
   */
  completedAt: Date | null
  /**
   * The name of the Epic.
   * @type {string}
   * @memberof EpicSlim
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof EpicSlim
   */
  globalId: string
  /**
   * A true/false boolean indicating if the Epic has been completed.
   * @type {boolean}
   * @memberof EpicSlim
   */
  completed: boolean
  /**
   * The URL of the associated productboard feature.
   * @type {string}
   * @memberof EpicSlim
   */
  productboardUrl: string | null
  /**
   * The Epic's planned start date.
   * @type {Date}
   * @memberof EpicSlim
   */
  plannedStartDate: Date | null
  /**
   * `Deprecated` The workflow state that the Epic is in.
   * @type {string}
   * @memberof EpicSlim
   */
  state: string
  /**
   * The ID of the Milestone this Epic is related to.
   * @type {number}
   * @memberof EpicSlim
   */
  milestoneId: number | null
  /**
   * The ID of the Member that requested the epic.
   * @type {string}
   * @memberof EpicSlim
   */
  requestedById: string
  /**
   * The ID of the Epic State.
   * @type {number}
   * @memberof EpicSlim
   */
  epicStateId: number
  /**
   * An array of Label ids attached to the Epic.
   * @type {Array<number>}
   * @memberof EpicSlim
   */
  labelIds: Array<number>
  /**
   * A manual override for the time/date the Epic was started.
   * @type {Date}
   * @memberof EpicSlim
   */
  startedAtOverride: Date | null
  /**
   *
   * @type {string}
   * @memberof EpicSlim
   */
  groupId: string | null
  /**
   * The time/date the Epic was updated.
   * @type {Date}
   * @memberof EpicSlim
   */
  updatedAt: Date | null
  /**
   * An array of Group IDs that have been mentioned in the Epic description.
   * @type {Array<string>}
   * @memberof EpicSlim
   */
  groupMentionIds: Array<string>
  /**
   * The ID of the associated productboard feature.
   * @type {string}
   * @memberof EpicSlim
   */
  productboardId: string | null
  /**
   * An array of UUIDs for any Members you want to add as Followers on this Epic.
   * @type {Array<string>}
   * @memberof EpicSlim
   */
  followerIds: Array<string>
  /**
   * An array of UUIDs for any members you want to add as Owners on this new Epic.
   * @type {Array<string>}
   * @memberof EpicSlim
   */
  ownerIds: Array<string>
  /**
   * This field can be set to another unique ID. In the case that the Epic has been imported from another tool, the ID in the other tool can be indicated here.
   * @type {string}
   * @memberof EpicSlim
   */
  externalId: string | null
  /**
   * The unique ID of the Epic.
   * @type {number}
   * @memberof EpicSlim
   */
  id: number
  /**
   * The Epic's relative position in the Epic workflow state.
   * @type {number}
   * @memberof EpicSlim
   */
  position: number
  /**
   * The name of the associated productboard feature.
   * @type {string}
   * @memberof EpicSlim
   */
  productboardName: string | null
  /**
   * The Epic's deadline.
   * @type {Date}
   * @memberof EpicSlim
   */
  deadline: Date | null
  /**
   *
   * @type {EpicStats}
   * @memberof EpicSlim
   */
  stats: EpicStats
  /**
   * The time/date the Epic was created.
   * @type {Date}
   * @memberof EpicSlim
   */
  createdAt: Date | null
}

/**
 * Check if a given object implements the EpicSlim interface.
 */
export function instanceOfEpicSlim(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'appUrl' in value
  isInstance = isInstance && 'archived' in value
  isInstance = isInstance && 'started' in value
  isInstance = isInstance && 'entityType' in value
  isInstance = isInstance && 'labels' in value
  isInstance = isInstance && 'mentionIds' in value
  isInstance = isInstance && 'memberMentionIds' in value
  isInstance = isInstance && 'associatedGroups' in value
  isInstance = isInstance && 'projectIds' in value
  isInstance = isInstance && 'storiesWithoutProjects' in value
  isInstance = isInstance && 'completedAtOverride' in value
  isInstance = isInstance && 'productboardPluginId' in value
  isInstance = isInstance && 'startedAt' in value
  isInstance = isInstance && 'completedAt' in value
  isInstance = isInstance && 'name' in value
  isInstance = isInstance && 'globalId' in value
  isInstance = isInstance && 'completed' in value
  isInstance = isInstance && 'productboardUrl' in value
  isInstance = isInstance && 'plannedStartDate' in value
  isInstance = isInstance && 'state' in value
  isInstance = isInstance && 'milestoneId' in value
  isInstance = isInstance && 'requestedById' in value
  isInstance = isInstance && 'epicStateId' in value
  isInstance = isInstance && 'labelIds' in value
  isInstance = isInstance && 'startedAtOverride' in value
  isInstance = isInstance && 'groupId' in value
  isInstance = isInstance && 'updatedAt' in value
  isInstance = isInstance && 'groupMentionIds' in value
  isInstance = isInstance && 'productboardId' in value
  isInstance = isInstance && 'followerIds' in value
  isInstance = isInstance && 'ownerIds' in value
  isInstance = isInstance && 'externalId' in value
  isInstance = isInstance && 'id' in value
  isInstance = isInstance && 'position' in value
  isInstance = isInstance && 'productboardName' in value
  isInstance = isInstance && 'deadline' in value
  isInstance = isInstance && 'stats' in value
  isInstance = isInstance && 'createdAt' in value

  return isInstance
}

export function EpicSlimFromJSON(json: any): EpicSlim {
  return EpicSlimFromJSONTyped(json, false)
}

export function EpicSlimFromJSONTyped(json: any, ignoreDiscriminator: boolean): EpicSlim {
  if (json === undefined || json === null) {
    return json
  }
  return {
    appUrl: json['app_url'],
    description: !exists(json, 'description') ? undefined : json['description'],
    archived: json['archived'],
    started: json['started'],
    entityType: json['entity_type'],
    labels: (json['labels'] as Array<any>).map(LabelSlimFromJSON),
    mentionIds: json['mention_ids'],
    memberMentionIds: json['member_mention_ids'],
    associatedGroups: (json['associated_groups'] as Array<any>).map(EpicAssociatedGroupFromJSON),
    projectIds: json['project_ids'],
    storiesWithoutProjects: json['stories_without_projects'],
    completedAtOverride:
      json['completed_at_override'] === null ? null : new Date(json['completed_at_override']),
    productboardPluginId: json['productboard_plugin_id'],
    startedAt: json['started_at'] === null ? null : new Date(json['started_at']),
    completedAt: json['completed_at'] === null ? null : new Date(json['completed_at']),
    name: json['name'],
    globalId: json['global_id'],
    completed: json['completed'],
    productboardUrl: json['productboard_url'],
    plannedStartDate:
      json['planned_start_date'] === null ? null : new Date(json['planned_start_date']),
    state: json['state'],
    milestoneId: json['milestone_id'],
    requestedById: json['requested_by_id'],
    epicStateId: json['epic_state_id'],
    labelIds: json['label_ids'],
    startedAtOverride:
      json['started_at_override'] === null ? null : new Date(json['started_at_override']),
    groupId: json['group_id'],
    updatedAt: json['updated_at'] === null ? null : new Date(json['updated_at']),
    groupMentionIds: json['group_mention_ids'],
    productboardId: json['productboard_id'],
    followerIds: json['follower_ids'],
    ownerIds: json['owner_ids'],
    externalId: json['external_id'],
    id: json['id'],
    position: json['position'],
    productboardName: json['productboard_name'],
    deadline: json['deadline'] === null ? null : new Date(json['deadline']),
    stats: EpicStatsFromJSON(json['stats']),
    createdAt: json['created_at'] === null ? null : new Date(json['created_at']),
  }
}

export function EpicSlimToJSON(value?: EpicSlim | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    app_url: value.appUrl,
    description: value.description,
    archived: value.archived,
    started: value.started,
    entity_type: value.entityType,
    labels: (value.labels as Array<any>).map(LabelSlimToJSON),
    mention_ids: value.mentionIds,
    member_mention_ids: value.memberMentionIds,
    associated_groups: (value.associatedGroups as Array<any>).map(EpicAssociatedGroupToJSON),
    project_ids: value.projectIds,
    stories_without_projects: value.storiesWithoutProjects,
    completed_at_override:
      value.completedAtOverride === null ? null : value.completedAtOverride.toISOString(),
    productboard_plugin_id: value.productboardPluginId,
    started_at: value.startedAt === null ? null : value.startedAt.toISOString(),
    completed_at: value.completedAt === null ? null : value.completedAt.toISOString(),
    name: value.name,
    global_id: value.globalId,
    completed: value.completed,
    productboard_url: value.productboardUrl,
    planned_start_date:
      value.plannedStartDate === null ? null : value.plannedStartDate.toISOString(),
    state: value.state,
    milestone_id: value.milestoneId,
    requested_by_id: value.requestedById,
    epic_state_id: value.epicStateId,
    label_ids: value.labelIds,
    started_at_override:
      value.startedAtOverride === null ? null : value.startedAtOverride.toISOString(),
    group_id: value.groupId,
    updated_at: value.updatedAt === null ? null : value.updatedAt.toISOString(),
    group_mention_ids: value.groupMentionIds,
    productboard_id: value.productboardId,
    follower_ids: value.followerIds,
    owner_ids: value.ownerIds,
    external_id: value.externalId,
    id: value.id,
    position: value.position,
    productboard_name: value.productboardName,
    deadline: value.deadline === null ? null : value.deadline.toISOString(),
    stats: EpicStatsToJSON(value.stats),
    created_at: value.createdAt === null ? null : value.createdAt.toISOString(),
  }
}
