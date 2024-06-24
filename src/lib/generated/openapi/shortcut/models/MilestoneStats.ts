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
 * A group of calculated values for this Milestone.
 * @export
 * @interface MilestoneStats
 */
export interface MilestoneStats {
  /**
   * The average cycle time (in seconds) of completed stories in this Milestone.
   * @type {number}
   * @memberof MilestoneStats
   */
  averageCycleTime?: number
  /**
   * The average lead time (in seconds) of completed stories in this Milestone.
   * @type {number}
   * @memberof MilestoneStats
   */
  averageLeadTime?: number
  /**
   * The number of related documents tp this Milestone.
   * @type {number}
   * @memberof MilestoneStats
   */
  numRelatedDocuments: number
}

/**
 * Check if a given object implements the MilestoneStats interface.
 */
export function instanceOfMilestoneStats(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'numRelatedDocuments' in value

  return isInstance
}

export function MilestoneStatsFromJSON(json: any): MilestoneStats {
  return MilestoneStatsFromJSONTyped(json, false)
}

export function MilestoneStatsFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): MilestoneStats {
  if (json === undefined || json === null) {
    return json
  }
  return {
    averageCycleTime: !exists(json, 'average_cycle_time') ? undefined : json['average_cycle_time'],
    averageLeadTime: !exists(json, 'average_lead_time') ? undefined : json['average_lead_time'],
    numRelatedDocuments: json['num_related_documents'],
  }
}

export function MilestoneStatsToJSON(value?: MilestoneStats | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    average_cycle_time: value.averageCycleTime,
    average_lead_time: value.averageLeadTime,
    num_related_documents: value.numRelatedDocuments,
  }
}
