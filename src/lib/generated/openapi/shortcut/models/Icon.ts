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
 * Icons are used to attach images to Groups, Workspaces, Members, and Loading screens in the Shortcut web application.
 * @export
 * @interface Icon
 */
export interface Icon {
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Icon
     */
    entityType: string;
    /**
     * The unique ID of the Icon.
     * @type {string}
     * @memberof Icon
     */
    id: string;
    /**
     * The time/date that the Icon was created.
     * @type {Date}
     * @memberof Icon
     */
    createdAt: Date;
    /**
     * The time/date that the Icon was updated.
     * @type {Date}
     * @memberof Icon
     */
    updatedAt: Date;
    /**
     * The URL of the Icon.
     * @type {string}
     * @memberof Icon
     */
    url: string;
}

/**
 * Check if a given object implements the Icon interface.
 */
export function instanceOfIcon(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "url" in value;

    return isInstance;
}

export function IconFromJSON(json: any): Icon {
    return IconFromJSONTyped(json, false);
}

export function IconFromJSONTyped(json: any, ignoreDiscriminator: boolean): Icon {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityType': json['entity_type'],
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
        'url': json['url'],
    };
}

export function IconToJSON(value?: Icon | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': value.entityType,
        'id': value.id,
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
        'url': value.url,
    };
}

