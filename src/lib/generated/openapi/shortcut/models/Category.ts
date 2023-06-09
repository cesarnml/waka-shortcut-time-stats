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
 * A Category can be used to associate Milestones.
 * @export
 * @interface Category
 */
export interface Category {
    /**
     * A true/false boolean indicating if the Category has been archived.
     * @type {boolean}
     * @memberof Category
     */
    archived: boolean;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Category
     */
    entityType: string;
    /**
     * The hex color to be displayed with the Category (for example, "#ff0000").
     * @type {string}
     * @memberof Category
     */
    color: string | null;
    /**
     * The name of the Category.
     * @type {string}
     * @memberof Category
     */
    name: string;
    /**
     * The type of entity this Category is associated with; currently Milestone is the only type of Category.
     * @type {string}
     * @memberof Category
     */
    type: string;
    /**
     * The time/date that the Category was updated.
     * @type {Date}
     * @memberof Category
     */
    updatedAt: Date;
    /**
     * This field can be set to another unique ID. In the case that the Category has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof Category
     */
    externalId: string | null;
    /**
     * The unique ID of the Category.
     * @type {number}
     * @memberof Category
     */
    id: number;
    /**
     * The time/date that the Category was created.
     * @type {Date}
     * @memberof Category
     */
    createdAt: Date;
}

/**
 * Check if a given object implements the Category interface.
 */
export function instanceOfCategory(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "archived" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "color" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function CategoryFromJSON(json: any): Category {
    return CategoryFromJSONTyped(json, false);
}

export function CategoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Category {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'archived': json['archived'],
        'entityType': json['entity_type'],
        'color': json['color'],
        'name': json['name'],
        'type': json['type'],
        'updatedAt': (new Date(json['updated_at'])),
        'externalId': json['external_id'],
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
    };
}

export function CategoryToJSON(value?: Category | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'archived': value.archived,
        'entity_type': value.entityType,
        'color': value.color,
        'name': value.name,
        'type': value.type,
        'updated_at': (value.updatedAt.toISOString()),
        'external_id': value.externalId,
        'id': value.id,
        'created_at': (value.createdAt.toISOString()),
    };
}

