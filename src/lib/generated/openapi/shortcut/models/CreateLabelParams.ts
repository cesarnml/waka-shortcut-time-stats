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
 * Request parameters for creating a Label on a Shortcut Story.
 * @export
 * @interface CreateLabelParams
 */
export interface CreateLabelParams {
    /**
     * The name of the new Label.
     * @type {string}
     * @memberof CreateLabelParams
     */
    name: string;
    /**
     * The description of the new Label.
     * @type {string}
     * @memberof CreateLabelParams
     */
    description?: string;
    /**
     * The hex color to be displayed with the Label (for example, "#ff0000").
     * @type {string}
     * @memberof CreateLabelParams
     */
    color?: string;
    /**
     * This field can be set to another unique ID. In the case that the Label has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof CreateLabelParams
     */
    externalId?: string;
}

/**
 * Check if a given object implements the CreateLabelParams interface.
 */
export function instanceOfCreateLabelParams(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function CreateLabelParamsFromJSON(json: any): CreateLabelParams {
    return CreateLabelParamsFromJSONTyped(json, false);
}

export function CreateLabelParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateLabelParams {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'color': !exists(json, 'color') ? undefined : json['color'],
        'externalId': !exists(json, 'external_id') ? undefined : json['external_id'],
    };
}

export function CreateLabelParamsToJSON(value?: CreateLabelParams | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'color': value.color,
        'external_id': value.externalId,
    };
}

