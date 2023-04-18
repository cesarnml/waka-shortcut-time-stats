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
 * A Label can be used to associate and filter Stories and Epics, and also create new Workspaces. A slim Label does not include aggregate stats. Fetch the Label using the labels endpoint to retrieve them.
 * @export
 * @interface LabelSlim
 */
export interface LabelSlim {
    /**
     * The Shortcut application url for the Label.
     * @type {string}
     * @memberof LabelSlim
     */
    appUrl: string;
    /**
     * The description of the Label.
     * @type {string}
     * @memberof LabelSlim
     */
    description: string | null;
    /**
     * A true/false boolean indicating if the Label has been archived.
     * @type {boolean}
     * @memberof LabelSlim
     */
    archived: boolean;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof LabelSlim
     */
    entityType: string;
    /**
     * The hex color to be displayed with the Label (for example, "#ff0000").
     * @type {string}
     * @memberof LabelSlim
     */
    color: string | null;
    /**
     * The name of the Label.
     * @type {string}
     * @memberof LabelSlim
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof LabelSlim
     */
    globalId: string;
    /**
     * The time/date that the Label was updated.
     * @type {Date}
     * @memberof LabelSlim
     */
    updatedAt: Date | null;
    /**
     * This field can be set to another unique ID. In the case that the Label has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof LabelSlim
     */
    externalId: string | null;
    /**
     * The unique ID of the Label.
     * @type {number}
     * @memberof LabelSlim
     */
    id: number;
    /**
     * The time/date that the Label was created.
     * @type {Date}
     * @memberof LabelSlim
     */
    createdAt: Date | null;
}

/**
 * Check if a given object implements the LabelSlim interface.
 */
export function instanceOfLabelSlim(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "color" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "globalId" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function LabelSlimFromJSON(json: any): LabelSlim {
    return LabelSlimFromJSONTyped(json, false);
}

export function LabelSlimFromJSONTyped(json: any, ignoreDiscriminator: boolean): LabelSlim {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appUrl': json['app_url'],
        'description': json['description'],
        'archived': json['archived'],
        'entityType': json['entity_type'],
        'color': json['color'],
        'name': json['name'],
        'globalId': json['global_id'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'externalId': json['external_id'],
        'id': json['id'],
        'createdAt': (json['created_at'] === null ? null : new Date(json['created_at'])),
    };
}

export function LabelSlimToJSON(value?: LabelSlim | null): any {
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
        'color': value.color,
        'name': value.name,
        'global_id': value.globalId,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'external_id': value.externalId,
        'id': value.id,
        'created_at': (value.createdAt === null ? null : value.createdAt.toISOString()),
    };
}
