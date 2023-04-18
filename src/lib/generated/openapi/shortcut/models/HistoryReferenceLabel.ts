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
 * A reference to an Label.
 * @export
 * @interface HistoryReferenceLabel
 */
export interface HistoryReferenceLabel {
    /**
     * The ID of the entity referenced.
     * @type {object}
     * @memberof HistoryReferenceLabel
     */
    id: object;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryReferenceLabel
     */
    entityType: string;
    /**
     * The application URL of the Label.
     * @type {string}
     * @memberof HistoryReferenceLabel
     */
    appUrl: string;
    /**
     * The name of the entity referenced.
     * @type {string}
     * @memberof HistoryReferenceLabel
     */
    name: string;
}

/**
 * Check if a given object implements the HistoryReferenceLabel interface.
 */
export function instanceOfHistoryReferenceLabel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "appUrl" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function HistoryReferenceLabelFromJSON(json: any): HistoryReferenceLabel {
    return HistoryReferenceLabelFromJSONTyped(json, false);
}

export function HistoryReferenceLabelFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryReferenceLabel {
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

export function HistoryReferenceLabelToJSON(value?: HistoryReferenceLabel | null): any {
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
