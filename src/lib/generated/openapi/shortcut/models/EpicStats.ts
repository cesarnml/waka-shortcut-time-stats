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
/**
 * A group of calculated values for this Epic.
 * @export
 * @interface EpicStats
 */
export interface EpicStats {
    /**
     * The total number of completed points in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numPointsDone: number;
    /**
     * The total number of documents associated with this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numRelatedDocuments: number;
    /**
     * The average cycle time (in seconds) of completed stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    averageCycleTime?: number;
    /**
     * The total number of unstarted Stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesUnstarted: number;
    /**
     * The total number of Stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesTotal: number;
    /**
     * The date of the last update of a Story in this Epic.
     * @type {Date}
     * @memberof EpicStats
     */
    lastStoryUpdate: Date | null;
    /**
     * The total number of started points in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numPointsStarted: number;
    /**
     * The total number of unstarted points in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numPointsUnstarted: number;
    /**
     * The total number of started Stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesStarted: number;
    /**
     * The total number of Stories with no point estimate.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesUnestimated: number;
    /**
     * The total number of backlog Stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesBacklog: number;
    /**
     * The average lead time (in seconds) of completed stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    averageLeadTime?: number;
    /**
     * The total number of backlog points in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numPointsBacklog: number;
    /**
     * The total number of points in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numPoints: number;
    /**
     * The total number of done Stories in this Epic.
     * @type {number}
     * @memberof EpicStats
     */
    numStoriesDone: number;
}

/**
 * Check if a given object implements the EpicStats interface.
 */
export function instanceOfEpicStats(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "numPointsDone" in value;
    isInstance = isInstance && "numRelatedDocuments" in value;
    isInstance = isInstance && "numStoriesUnstarted" in value;
    isInstance = isInstance && "numStoriesTotal" in value;
    isInstance = isInstance && "lastStoryUpdate" in value;
    isInstance = isInstance && "numPointsStarted" in value;
    isInstance = isInstance && "numPointsUnstarted" in value;
    isInstance = isInstance && "numStoriesStarted" in value;
    isInstance = isInstance && "numStoriesUnestimated" in value;
    isInstance = isInstance && "numStoriesBacklog" in value;
    isInstance = isInstance && "numPointsBacklog" in value;
    isInstance = isInstance && "numPoints" in value;
    isInstance = isInstance && "numStoriesDone" in value;

    return isInstance;
}

export function EpicStatsFromJSON(json: any): EpicStats {
    return EpicStatsFromJSONTyped(json, false);
}

export function EpicStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): EpicStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'numPointsDone': json['num_points_done'],
        'numRelatedDocuments': json['num_related_documents'],
        'averageCycleTime': !exists(json, 'average_cycle_time') ? undefined : json['average_cycle_time'],
        'numStoriesUnstarted': json['num_stories_unstarted'],
        'numStoriesTotal': json['num_stories_total'],
        'lastStoryUpdate': (json['last_story_update'] === null ? null : new Date(json['last_story_update'])),
        'numPointsStarted': json['num_points_started'],
        'numPointsUnstarted': json['num_points_unstarted'],
        'numStoriesStarted': json['num_stories_started'],
        'numStoriesUnestimated': json['num_stories_unestimated'],
        'numStoriesBacklog': json['num_stories_backlog'],
        'averageLeadTime': !exists(json, 'average_lead_time') ? undefined : json['average_lead_time'],
        'numPointsBacklog': json['num_points_backlog'],
        'numPoints': json['num_points'],
        'numStoriesDone': json['num_stories_done'],
    };
}

export function EpicStatsToJSON(value?: EpicStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'num_points_done': value.numPointsDone,
        'num_related_documents': value.numRelatedDocuments,
        'average_cycle_time': value.averageCycleTime,
        'num_stories_unstarted': value.numStoriesUnstarted,
        'num_stories_total': value.numStoriesTotal,
        'last_story_update': (value.lastStoryUpdate === null ? null : value.lastStoryUpdate.toISOString()),
        'num_points_started': value.numPointsStarted,
        'num_points_unstarted': value.numPointsUnstarted,
        'num_stories_started': value.numStoriesStarted,
        'num_stories_unestimated': value.numStoriesUnestimated,
        'num_stories_backlog': value.numStoriesBacklog,
        'average_lead_time': value.averageLeadTime,
        'num_points_backlog': value.numPointsBacklog,
        'num_points': value.numPoints,
        'num_stories_done': value.numStoriesDone,
    };
}

