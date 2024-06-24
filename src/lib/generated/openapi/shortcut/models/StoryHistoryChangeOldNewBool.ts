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
 * True if the Story has archived, otherwise false.
 * @export
 * @interface StoryHistoryChangeOldNewBool
 */
export interface StoryHistoryChangeOldNewBool {
  /**
   * The old value.
   * @type {boolean}
   * @memberof StoryHistoryChangeOldNewBool
   */
  old?: boolean
  /**
   * The new value.
   * @type {boolean}
   * @memberof StoryHistoryChangeOldNewBool
   */
  _new?: boolean
}

/**
 * Check if a given object implements the StoryHistoryChangeOldNewBool interface.
 */
export function instanceOfStoryHistoryChangeOldNewBool(value: object): boolean {
  let isInstance = true

  return isInstance
}

export function StoryHistoryChangeOldNewBoolFromJSON(json: any): StoryHistoryChangeOldNewBool {
  return StoryHistoryChangeOldNewBoolFromJSONTyped(json, false)
}

export function StoryHistoryChangeOldNewBoolFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): StoryHistoryChangeOldNewBool {
  if (json === undefined || json === null) {
    return json
  }
  return {
    old: !exists(json, 'old') ? undefined : json['old'],
    _new: !exists(json, 'new') ? undefined : json['new'],
  }
}

export function StoryHistoryChangeOldNewBoolToJSON(
  value?: StoryHistoryChangeOldNewBool | null,
): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    old: value.old,
    new: value._new,
  }
}
