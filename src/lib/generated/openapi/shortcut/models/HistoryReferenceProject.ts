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
 * A reference to an Project.
 * @export
 * @interface HistoryReferenceProject
 */
export interface HistoryReferenceProject {
    /**
     * The ID of the entity referenced.
     * @type {object}
     * @memberof HistoryReferenceProject
     */
    id: object;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryReferenceProject
     */
    entityType: string;
    /**
     * The application URL of the Project.
     * @type {string}
     * @memberof HistoryReferenceProject
     */
    appUrl: string;
    /**
     * The name of the entity referenced.
     * @type {string}
     * @memberof HistoryReferenceProject
     */
    name: string;
}

/**
 * Check if a given object implements the HistoryReferenceProject interface.
 */
export function instanceOfHistoryReferenceProject(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function HistoryReferenceProjectFromJSON(json: any): HistoryReferenceProject {
    return HistoryReferenceProjectFromJSONTyped(json, false);
}

export function HistoryReferenceProjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryReferenceProject {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'entityType': json['entity_type'],
        'appUrl': json['app_url'],
        'name': json['name'],
    };
}

export function HistoryReferenceProjectToJSON(value?: HistoryReferenceProject | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'entity_type': value.entityType,
        'app_url': value.appUrl,
        'name': value.name,
    };
}

