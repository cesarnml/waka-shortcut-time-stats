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
import type { Category } from './Category';
import {
    CategoryFromJSON,
    CategoryFromJSONTyped,
    CategoryToJSON,
} from './Category';
import type { MilestoneStats } from './MilestoneStats';
import {
    MilestoneStatsFromJSON,
    MilestoneStatsFromJSONTyped,
    MilestoneStatsToJSON,
} from './MilestoneStats';

/**
 * A Milestone in search results. This is typed differently from Milestone because the details=slim search argument will omit some fields.
 * @export
 * @interface MilestoneSearchResult
 */
export interface MilestoneSearchResult {
    /**
     * The Shortcut application url for the Milestone.
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    appUrl: string;
    /**
     * The Milestone's description.
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    description?: string;
    /**
     * A boolean indicating whether the Milestone has been archived or not.
     * @type {boolean}
     * @memberof MilestoneSearchResult
     */
    archived: boolean;
    /**
     * A true/false boolean indicating if the Milestone has been started.
     * @type {boolean}
     * @memberof MilestoneSearchResult
     */
    started: boolean;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    entityType: string;
    /**
     * A manual override for the time/date the Milestone was completed.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    completedAtOverride: Date | null;
    /**
     * The time/date the Milestone was started.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    startedAt: Date | null;
    /**
     * The time/date the Milestone was completed.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    completedAt: Date | null;
    /**
     * The name of the Milestone.
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    globalId: string;
    /**
     * A true/false boolean indicating if the Milestone has been completed.
     * @type {boolean}
     * @memberof MilestoneSearchResult
     */
    completed: boolean;
    /**
     * The workflow state that the Milestone is in.
     * @type {string}
     * @memberof MilestoneSearchResult
     */
    state: string;
    /**
     * A manual override for the time/date the Milestone was started.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    startedAtOverride: Date | null;
    /**
     * The time/date the Milestone was updated.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    updatedAt: Date;
    /**
     * An array of Categories attached to the Milestone.
     * @type {Array<Category>}
     * @memberof MilestoneSearchResult
     */
    categories: Array<Category>;
    /**
     * The unique ID of the Milestone.
     * @type {number}
     * @memberof MilestoneSearchResult
     */
    id: number;
    /**
     * A number representing the position of the Milestone in relation to every other Milestone within the Workspace.
     * @type {number}
     * @memberof MilestoneSearchResult
     */
    position: number;
    /**
     * 
     * @type {MilestoneStats}
     * @memberof MilestoneSearchResult
     */
    stats: MilestoneStats;
    /**
     * The time/date the Milestone was created.
     * @type {Date}
     * @memberof MilestoneSearchResult
     */
    createdAt: Date;
}

/**
 * Check if a given object implements the MilestoneSearchResult interface.
 */
export function instanceOfMilestoneSearchResult(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "started" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "completedAtOverride" in value;
    isInstance = isInstance && "startedAt" in value;
    isInstance = isInstance && "completedAt" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "globalId" in value;
    isInstance = isInstance && "completed" in value;
    isInstance = isInstance && "state" in value;
    isInstance = isInstance && "startedAtOverride" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "categories" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "position" in value;
    isInstance = isInstance && "stats" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function MilestoneSearchResultFromJSON(json: any): MilestoneSearchResult {
    return MilestoneSearchResultFromJSONTyped(json, false);
}

export function MilestoneSearchResultFromJSONTyped(json: any, ignoreDiscriminator: boolean): MilestoneSearchResult {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appUrl': json['app_url'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'archived': json['archived'],
        'started': json['started'],
        'entityType': json['entity_type'],
        'completedAtOverride': (json['completed_at_override'] === null ? null : new Date(json['completed_at_override'])),
        'startedAt': (json['started_at'] === null ? null : new Date(json['started_at'])),
        'completedAt': (json['completed_at'] === null ? null : new Date(json['completed_at'])),
        'name': json['name'],
        'globalId': json['global_id'],
        'completed': json['completed'],
        'state': json['state'],
        'startedAtOverride': (json['started_at_override'] === null ? null : new Date(json['started_at_override'])),
        'updatedAt': (new Date(json['updated_at'])),
        'categories': ((json['categories'] as Array<any>).map(CategoryFromJSON)),
        'id': json['id'],
        'position': json['position'],
        'stats': MilestoneStatsFromJSON(json['stats']),
        'createdAt': (new Date(json['created_at'])),
    };
}

export function MilestoneSearchResultToJSON(value?: MilestoneSearchResult | null): any {
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
        'entity_type': value.entityType,
        'completed_at_override': (value.completedAtOverride === null ? null : value.completedAtOverride.toISOString()),
        'started_at': (value.startedAt === null ? null : value.startedAt.toISOString()),
        'completed_at': (value.completedAt === null ? null : value.completedAt.toISOString()),
        'name': value.name,
        'global_id': value.globalId,
        'completed': value.completed,
        'state': value.state,
        'started_at_override': (value.startedAtOverride === null ? null : value.startedAtOverride.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
        'categories': ((value.categories as Array<any>).map(CategoryToJSON)),
        'id': value.id,
        'position': value.position,
        'stats': MilestoneStatsToJSON(value.stats),
        'created_at': (value.createdAt.toISOString()),
    };
}
