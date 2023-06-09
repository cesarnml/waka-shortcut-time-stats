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
 * An action representing a VCS Branch being pushed.
 * @export
 * @interface HistoryActionBranchPush
 */
export interface HistoryActionBranchPush {
    /**
     * The ID of the entity referenced.
     * @type {number}
     * @memberof HistoryActionBranchPush
     */
    id: number;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchPush
     */
    entityType: string;
    /**
     * The name of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchPush
     */
    name: string;
    /**
     * The URL from the provider of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchPush
     */
    url: string;
    /**
     * The action of the entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchPush
     */
    action: HistoryActionBranchPushActionEnum;
}


/**
 * @export
 */
export const HistoryActionBranchPushActionEnum = {
    Push: 'push'
} as const;
export type HistoryActionBranchPushActionEnum = typeof HistoryActionBranchPushActionEnum[keyof typeof HistoryActionBranchPushActionEnum];


/**
 * Check if a given object implements the HistoryActionBranchPush interface.
 */
export function instanceOfHistoryActionBranchPush(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "action" in value;

    return isInstance;
}

export function HistoryActionBranchPushFromJSON(json: any): HistoryActionBranchPush {
    return HistoryActionBranchPushFromJSONTyped(json, false);
}

export function HistoryActionBranchPushFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryActionBranchPush {
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

export function HistoryActionBranchPushToJSON(value?: HistoryActionBranchPush | null): any {
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

