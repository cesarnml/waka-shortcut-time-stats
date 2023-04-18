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
 * The synced item for the story.
 * @export
 * @interface SyncedItem
 */
export interface SyncedItem {
    /**
     * The id used to reference an external entity.
     * @type {string}
     * @memberof SyncedItem
     */
    externalId: string;
    /**
     * The url to the external entity.
     * @type {string}
     * @memberof SyncedItem
     */
    url: string;
}

/**
 * Check if a given object implements the SyncedItem interface.
 */
export function instanceOfSyncedItem(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "url" in value;

    return isInstance;
}

export function SyncedItemFromJSON(json: any): SyncedItem {
    return SyncedItemFromJSONTyped(json, false);
}

export function SyncedItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): SyncedItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'externalId': json['external_id'],
        'url': json['url'],
    };
}

export function SyncedItemToJSON(value?: SyncedItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'external_id': value.externalId,
        'url': value.url,
    };
}

