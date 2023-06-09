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
 * 
 * @export
 * @interface UpdateCategory
 */
export interface UpdateCategory {
    /**
     * The new name of the Category.
     * @type {string}
     * @memberof UpdateCategory
     */
    name?: string;
    /**
     * The hex color to be displayed with the Category (for example, "#ff0000").
     * @type {string}
     * @memberof UpdateCategory
     */
    color?: string | null;
    /**
     * A true/false boolean indicating if the Category has been archived.
     * @type {boolean}
     * @memberof UpdateCategory
     */
    archived?: boolean;
}

/**
 * Check if a given object implements the UpdateCategory interface.
 */
export function instanceOfUpdateCategory(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateCategoryFromJSON(json: any): UpdateCategory {
    return UpdateCategoryFromJSONTyped(json, false);
}

export function UpdateCategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateCategory {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'color': !exists(json, 'color') ? undefined : json['color'],
        'archived': !exists(json, 'archived') ? undefined : json['archived'],
    };
}

export function UpdateCategoryToJSON(value?: UpdateCategory | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'color': value.color,
        'archived': value.archived,
    };
}

