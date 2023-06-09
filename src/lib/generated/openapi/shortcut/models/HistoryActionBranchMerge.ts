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
 * An action representing a VCS Branch being merged.
 * @export
 * @interface HistoryActionBranchMerge
 */
export interface HistoryActionBranchMerge {
    /**
     * The ID of the entity referenced.
     * @type {number}
     * @memberof HistoryActionBranchMerge
     */
    id: number;
    /**
     * The type of entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchMerge
     */
    entityType: string;
    /**
     * The name of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchMerge
     */
    name: string;
    /**
     * The URL from the provider of the VCS Branch that was pushed
     * @type {string}
     * @memberof HistoryActionBranchMerge
     */
    url: string;
    /**
     * The action of the entity referenced.
     * @type {string}
     * @memberof HistoryActionBranchMerge
     */
    action: HistoryActionBranchMergeActionEnum;
}


/**
 * @export
 */
export const HistoryActionBranchMergeActionEnum = {
    Merge: 'merge'
} as const;
export type HistoryActionBranchMergeActionEnum = typeof HistoryActionBranchMergeActionEnum[keyof typeof HistoryActionBranchMergeActionEnum];


/**
 * Check if a given object implements the HistoryActionBranchMerge interface.
 */
export function instanceOfHistoryActionBranchMerge(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "action" in value;

    return isInstance;
}

export function HistoryActionBranchMergeFromJSON(json: any): HistoryActionBranchMerge {
    return HistoryActionBranchMergeFromJSONTyped(json, false);
}

export function HistoryActionBranchMergeFromJSONTyped(json: any, ignoreDiscriminator: boolean): HistoryActionBranchMerge {
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

export function HistoryActionBranchMergeToJSON(value?: HistoryActionBranchMerge | null): any {
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

