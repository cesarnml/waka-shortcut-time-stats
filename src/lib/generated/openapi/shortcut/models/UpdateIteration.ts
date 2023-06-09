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
import type { CreateLabelParams } from './CreateLabelParams';
import {
    CreateLabelParamsFromJSON,
    CreateLabelParamsFromJSONTyped,
    CreateLabelParamsToJSON,
} from './CreateLabelParams';

/**
 * 
 * @export
 * @interface UpdateIteration
 */
export interface UpdateIteration {
    /**
     * An array of UUIDs for any Members you want to add as Followers.
     * @type {Array<string>}
     * @memberof UpdateIteration
     */
    followerIds?: Array<string>;
    /**
     * An array of UUIDs for any Groups you want to add as Followers. Currently, only one Group association is presented in our web UI.
     * @type {Array<string>}
     * @memberof UpdateIteration
     */
    groupIds?: Array<string>;
    /**
     * An array of Labels attached to the Iteration.
     * @type {Array<CreateLabelParams>}
     * @memberof UpdateIteration
     */
    labels?: Array<CreateLabelParams>;
    /**
     * The description of the Iteration.
     * @type {string}
     * @memberof UpdateIteration
     */
    description?: string;
    /**
     * The name of this Iteration
     * @type {string}
     * @memberof UpdateIteration
     */
    name?: string;
    /**
     * The date this Iteration begins, e.g. 2019-07-01
     * @type {string}
     * @memberof UpdateIteration
     */
    startDate?: string;
    /**
     * The date this Iteration ends, e.g. 2019-07-05.
     * @type {string}
     * @memberof UpdateIteration
     */
    endDate?: string;
}

/**
 * Check if a given object implements the UpdateIteration interface.
 */
export function instanceOfUpdateIteration(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateIterationFromJSON(json: any): UpdateIteration {
    return UpdateIterationFromJSONTyped(json, false);
}

export function UpdateIterationFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateIteration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'followerIds': !exists(json, 'follower_ids') ? undefined : json['follower_ids'],
        'groupIds': !exists(json, 'group_ids') ? undefined : json['group_ids'],
        'labels': !exists(json, 'labels') ? undefined : ((json['labels'] as Array<any>).map(CreateLabelParamsFromJSON)),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'startDate': !exists(json, 'start_date') ? undefined : json['start_date'],
        'endDate': !exists(json, 'end_date') ? undefined : json['end_date'],
    };
}

export function UpdateIterationToJSON(value?: UpdateIteration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'follower_ids': value.followerIds,
        'group_ids': value.groupIds,
        'labels': value.labels === undefined ? undefined : ((value.labels as Array<any>).map(CreateLabelParamsToJSON)),
        'description': value.description,
        'name': value.name,
        'start_date': value.startDate,
        'end_date': value.endDate,
    };
}

