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
 * Corresponds to a VCS Label associated with a Pull Request.
 * @export
 * @interface PullRequestLabel
 */
export interface PullRequestLabel {
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof PullRequestLabel
     */
    entityType: string;
    /**
     * The unique ID of the VCS Label.
     * @type {number}
     * @memberof PullRequestLabel
     */
    id: number;
    /**
     * The color of the VCS label.
     * @type {string}
     * @memberof PullRequestLabel
     */
    color: string;
    /**
     * The description of the VCS label.
     * @type {string}
     * @memberof PullRequestLabel
     */
    description?: string | null;
    /**
     * The name of the VCS label.
     * @type {string}
     * @memberof PullRequestLabel
     */
    name: string;
}

/**
 * Check if a given object implements the PullRequestLabel interface.
 */
export function instanceOfPullRequestLabel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "color" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function PullRequestLabelFromJSON(json: any): PullRequestLabel {
    return PullRequestLabelFromJSONTyped(json, false);
}

export function PullRequestLabelFromJSONTyped(json: any, ignoreDiscriminator: boolean): PullRequestLabel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityType': json['entity_type'],
        'id': json['id'],
        'color': json['color'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'name': json['name'],
    };
}

export function PullRequestLabelToJSON(value?: PullRequestLabel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': value.entityType,
        'id': value.id,
        'color': value.color,
        'description': value.description,
        'name': value.name,
    };
}
