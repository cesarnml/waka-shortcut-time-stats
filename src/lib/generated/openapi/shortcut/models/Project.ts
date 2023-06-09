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
import type { ProjectStats } from './ProjectStats';
import {
    ProjectStatsFromJSON,
    ProjectStatsFromJSONTyped,
    ProjectStatsToJSON,
} from './ProjectStats';

/**
 * Projects typically map to teams (such as Frontend, Backend, Mobile, Devops, etc) but can represent any open-ended product, component, or initiative.
 * @export
 * @interface Project
 */
export interface Project {
    /**
     * The Shortcut application url for the Project.
     * @type {string}
     * @memberof Project
     */
    appUrl: string;
    /**
     * The description of the Project.
     * @type {string}
     * @memberof Project
     */
    description: string | null;
    /**
     * True/false boolean indicating whether the Project is in an Archived state.
     * @type {boolean}
     * @memberof Project
     */
    archived: boolean;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Project
     */
    entityType: string;
    /**
     * The number of days before the thermometer appears in the Story summary.
     * @type {number}
     * @memberof Project
     */
    daysToThermometer: number;
    /**
     * The color associated with the Project in the Shortcut member interface.
     * @type {string}
     * @memberof Project
     */
    color: string | null;
    /**
     * The ID of the workflow the project belongs to.
     * @type {number}
     * @memberof Project
     */
    workflowId: number;
    /**
     * The name of the Project
     * @type {string}
     * @memberof Project
     */
    name: string;
    /**
     * The date at which the Project was started.
     * @type {Date}
     * @memberof Project
     */
    startTime: Date;
    /**
     * The time/date that the Project was last updated.
     * @type {Date}
     * @memberof Project
     */
    updatedAt: Date | null;
    /**
     * An array of UUIDs for any Members listed as Followers.
     * @type {Array<string>}
     * @memberof Project
     */
    followerIds: Array<string>;
    /**
     * This field can be set to another unique ID. In the case that the Project has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof Project
     */
    externalId: string | null;
    /**
     * The unique ID of the Project.
     * @type {number}
     * @memberof Project
     */
    id: number;
    /**
     * Configuration to enable or disable thermometers in the Story summary.
     * @type {boolean}
     * @memberof Project
     */
    showThermometer: boolean;
    /**
     * The ID of the team the project belongs to.
     * @type {number}
     * @memberof Project
     */
    teamId: number;
    /**
     * The number of weeks per iteration in this Project.
     * @type {number}
     * @memberof Project
     */
    iterationLength: number;
    /**
     * The Project abbreviation used in Story summaries. Should be kept to 3 characters at most.
     * @type {string}
     * @memberof Project
     */
    abbreviation: string | null;
    /**
     * 
     * @type {ProjectStats}
     * @memberof Project
     */
    stats: ProjectStats;
    /**
     * The time/date that the Project was created.
     * @type {Date}
     * @memberof Project
     */
    createdAt: Date | null;
}

/**
 * Check if a given object implements the Project interface.
 */
export function instanceOfProject(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "daysToThermometer" in value;
    isInstance = isInstance && "color" in value;
    isInstance = isInstance && "workflowId" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "startTime" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "followerIds" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "showThermometer" in value;
    isInstance = isInstance && "teamId" in value;
    isInstance = isInstance && "iterationLength" in value;
    isInstance = isInstance && "abbreviation" in value;
    isInstance = isInstance && "stats" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function ProjectFromJSON(json: any): Project {
    return ProjectFromJSONTyped(json, false);
}

export function ProjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): Project {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appUrl': json['app_url'],
        'description': json['description'],
        'archived': json['archived'],
        'entityType': json['entity_type'],
        'daysToThermometer': json['days_to_thermometer'],
        'color': json['color'],
        'workflowId': json['workflow_id'],
        'name': json['name'],
        'startTime': (new Date(json['start_time'])),
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'followerIds': json['follower_ids'],
        'externalId': json['external_id'],
        'id': json['id'],
        'showThermometer': json['show_thermometer'],
        'teamId': json['team_id'],
        'iterationLength': json['iteration_length'],
        'abbreviation': json['abbreviation'],
        'stats': ProjectStatsFromJSON(json['stats']),
        'createdAt': (json['created_at'] === null ? null : new Date(json['created_at'])),
    };
}

export function ProjectToJSON(value?: Project | null): any {
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
        'entity_type': value.entityType,
        'days_to_thermometer': value.daysToThermometer,
        'color': value.color,
        'workflow_id': value.workflowId,
        'name': value.name,
        'start_time': (value.startTime.toISOString()),
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'follower_ids': value.followerIds,
        'external_id': value.externalId,
        'id': value.id,
        'show_thermometer': value.showThermometer,
        'team_id': value.teamId,
        'iteration_length': value.iterationLength,
        'abbreviation': value.abbreviation,
        'stats': ProjectStatsToJSON(value.stats),
        'created_at': (value.createdAt === null ? null : value.createdAt.toISOString()),
    };
}

