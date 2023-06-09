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
 * An action representing a VCS Branch being created.
 * @export
 * @interface HistoryActionBranchCreate
 */
export interface HistoryActionBranchCreate {
    /**
     * The ID of the entity referenced.
     * @type {number}
     * @memberof HistoryActionBranchCreate
     */
    id: number;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchCreate
     */
    entityType: string;
    /**
     * The name of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchCreate
     */
    name: string;
    /**
     * The URL from the provider of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchCreate
     */
    url: string;
    /**
     * The action of the entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchCreate
     */
    action: HistoryActionBranchCreateActionEnum;
}


/**
 * @export
 */
export const HistoryActionBranchCreateActionEnum = {
    Create: 'create'
} as const;
export type HistoryActionBranchCreateActionEnum = typeof HistoryActionBranchCreateActionEnum[keyof typeof HistoryActionBranchCreateActionEnum];


/**
 * Check if a given object implements the HistoryActionBranchCreate interface.
 */
export function instanceOfHistoryActionBranchCreate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "action" in value;

    return isInstance;
}

export function HistoryActionBranchCreateFromJSON(json: any): HistoryActionBranchCreate {
    return HistoryActionBranchCreateFromJSONTyped(json, false);
}

export function HistoryActionBranchCreateFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryActionBranchCreate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'entityType': json['entity_type'],
        'name': json['name'],
        'url': json['url'],
        'action': json['action'],
    };
}

export function HistoryActionBranchCreateToJSON(value?: HistoryActionBranchCreate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'entity_type': value.entityType,
        'name': value.name,
        'url': value.url,
        'action': value.action,
    };
}

