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
 * Epic State is any of the at least 3 columns. Epic States correspond to one of 3 types: Unstarted, Started, or Done.
 * @export
 * @interface EpicState
 */
export interface EpicState {
  /**
   * The description of what sort of Epics belong in that Epic State.
   * @type {string}
   * @memberof EpicState
   */
  description: string
  /**
   * A string description of this resource.
   * @type {string}
   * @memberof EpicState
   */
  entityType: string
  /**
   * The hex color for this Epic State.
   * @type {string}
   * @memberof EpicState
   */
  color?: string
  /**
   * The Epic State's name.
   * @type {string}
   * @memberof EpicState
   */
  name: string
  /**
   *
   * @type {string}
   * @memberof EpicState
   */
  globalId: string
  /**
   * The type of Epic State (Unstarted, Started, or Done)
   * @type {string}
   * @memberof EpicState
   */
  type: string
  /**
   * When the Epic State was last updated.
   * @type {Date}
   * @memberof EpicState
   */
  updatedAt: Date
  /**
   * The unique ID of the Epic State.
   * @type {number}
   * @memberof EpicState
   */
  id: number
  /**
   * The position that the Epic State is in, starting with 0 at the left.
   * @type {number}
   * @memberof EpicState
   */
  position: number
  /**
   * The time/date the Epic State was created.
   * @type {Date}
   * @memberof EpicState
   */
  createdAt: Date
}

/**
 * Check if a given object implements the EpicState interface.
 */
export function instanceOfEpicState(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'description' in value
  isInstance = isInstance && 'entityType' in value
  isInstance = isInstance && 'name' in value
  isInstance = isInstance && 'globalId' in value
  isInstance = isInstance && 'type' in value
  isInstance = isInstance && 'updatedAt' in value
  isInstance = isInstance && 'id' in value
  isInstance = isInstance && 'position' in value
  isInstance = isInstance && 'createdAt' in value

  return isInstance
}

export function EpicStateFromJSON(json: any): EpicState {
  return EpicStateFromJSONTyped(json, false)
}

export function EpicStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): EpicState {
  if (json === undefined || json === null) {
    return json
  }
  return {
    description: json['description'],
    entityType: json['entity_type'],
    color: !exists(json, 'color') ? undefined : json['color'],
    name: json['name'],
    globalId: json['global_id'],
    type: json['type'],
    updatedAt: new Date(json['updated_at']),
    id: json['id'],
    position: json['position'],
    createdAt: new Date(json['created_at']),
  }
}

export function EpicStateToJSON(value?: EpicState | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    description: value.description,
    entity_type: value.entityType,
    color: value.color,
    name: value.name,
    global_id: value.globalId,
    type: value.type,
    updated_at: value.updatedAt.toISOString(),
    id: value.id,
    position: value.position,
    created_at: value.createdAt.toISOString(),
  }
}
