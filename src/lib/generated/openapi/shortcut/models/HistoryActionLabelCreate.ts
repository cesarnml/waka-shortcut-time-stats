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
 * An action representing a Label being created.
 * @export
 * @interface HistoryActionLabelCreate
 */
export interface HistoryActionLabelCreate {
  /**
   * The ID of the entity referenced.
   * @type {number}
   * @memberof HistoryActionLabelCreate
   */
  id: number
  /**
   * The type of entity referenced.
   * @type {string}
   * @memberof HistoryActionLabelCreate
   */
  entityType: string
  /**
   * The action of the entity referenced.
   * @type {string}
   * @memberof HistoryActionLabelCreate
   */
  action: HistoryActionLabelCreateActionEnum
  /**
   * The application URL of the Label.
   * @type {string}
   * @memberof HistoryActionLabelCreate
   */
  appUrl: string
  /**
   * The name of the Label.
   * @type {string}
   * @memberof HistoryActionLabelCreate
   */
  name: string
}

/**
 * @export
 */
export const HistoryActionLabelCreateActionEnum = {
  Create: 'create',
} as const
export type HistoryActionLabelCreateActionEnum =
  (typeof HistoryActionLabelCreateActionEnum)[keyof typeof HistoryActionLabelCreateActionEnum]

/**
 * Check if a given object implements the HistoryActionLabelCreate interface.
 */
export function instanceOfHistoryActionLabelCreate(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'id' in value
  isInstance = isInstance && 'entityType' in value
  isInstance = isInstance && 'action' in value
  isInstance = isInstance && 'appUrl' in value
  isInstance = isInstance && 'name' in value

  return isInstance
}

export function HistoryActionLabelCreateFromJSON(json: any): HistoryActionLabelCreate {
  return HistoryActionLabelCreateFromJSONTyped(json, false)
}

export function HistoryActionLabelCreateFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): HistoryActionLabelCreate {
  if (json === undefined || json === null) {
    return json
  }
  return {
    id: json['id'],
    entityType: json['entity_type'],
    action: json['action'],
    appUrl: json['app_url'],
    name: json['name'],
  }
}

export function HistoryActionLabelCreateToJSON(value?: HistoryActionLabelCreate | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    id: value.id,
    entity_type: value.entityType,
    action: value.action,
    app_url: value.appUrl,
    name: value.name,
  }
}
