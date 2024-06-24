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
/**
 *
 * @export
 * @interface CreateProject
 */
export interface CreateProject {
  /**
   * The Project description.
   * @type {string}
   * @memberof CreateProject
   */
  description?: string
  /**
   * The color you wish to use for the Project in the system.
   * @type {string}
   * @memberof CreateProject
   */
  color?: string
  /**
   * The name of the Project.
   * @type {string}
   * @memberof CreateProject
   */
  name: string
  /**
   * The date at which the Project was started.
   * @type {Date}
   * @memberof CreateProject
   */
  startTime?: Date
  /**
   * Defaults to the time/date it is created but can be set to reflect another date.
   * @type {Date}
   * @memberof CreateProject
   */
  updatedAt?: Date
  /**
   * An array of UUIDs for any members you want to add as Owners on this new Epic.
   * @type {Array<string>}
   * @memberof CreateProject
   */
  followerIds?: Array<string>
  /**
   * This field can be set to another unique ID. In the case that the Project has been imported from another tool, the ID in the other tool can be indicated here.
   * @type {string}
   * @memberof CreateProject
   */
  externalId?: string
  /**
   * The ID of the team the project belongs to.
   * @type {number}
   * @memberof CreateProject
   */
  teamId: number
  /**
   * The number of weeks per iteration in this Project.
   * @type {number}
   * @memberof CreateProject
   */
  iterationLength?: number
  /**
   * The Project abbreviation used in Story summaries. Should be kept to 3 characters at most.
   * @type {string}
   * @memberof CreateProject
   */
  abbreviation?: string
  /**
   * Defaults to the time/date it is created but can be set to reflect another date.
   * @type {Date}
   * @memberof CreateProject
   */
  createdAt?: Date
}

/**
 * Check if a given object implements the CreateProject interface.
 */
export function instanceOfCreateProject(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'name' in value
  isInstance = isInstance && 'teamId' in value

  return isInstance
}

export function CreateProjectFromJSON(json: any): CreateProject {
  return CreateProjectFromJSONTyped(json, false)
}

export function CreateProjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateProject {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: !exists(json, 'description') ? undefined : json['description'],
    color: !exists(json, 'color') ? undefined : json['color'],
    name: json['name'],
    startTime: !exists(json, 'start_time') ? undefined : new Date(json['start_time']),
    updatedAt: !exists(json, 'updated_at') ? undefined : new Date(json['updated_at']),
    followerIds: !exists(json, 'follower_ids') ? undefined : json['follower_ids'],
    externalId: !exists(json, 'external_id') ? undefined : json['external_id'],
    teamId: json['team_id'],
    iterationLength: !exists(json, 'iteration_length') ? undefined : json['iteration_length'],
    abbreviation: !exists(json, 'abbreviation') ? undefined : json['abbreviation'],
    createdAt: !exists(json, 'created_at') ? undefined : new Date(json['created_at']),
  }
}

export function CreateProjectToJSON(value?: CreateProject | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    description: value.description,
    color: value.color,
    name: value.name,
    start_time: value.startTime === undefined ? undefined : value.startTime.toISOString(),
    updated_at: value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
    follower_ids: value.followerIds,
    external_id: value.externalId,
    team_id: value.teamId,
    iteration_length: value.iterationLength,
    abbreviation: value.abbreviation,
    created_at: value.createdAt === undefined ? undefined : value.createdAt.toISOString(),
  }
}
