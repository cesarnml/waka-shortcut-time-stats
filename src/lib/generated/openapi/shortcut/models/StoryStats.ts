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
 * The stats object for Stories
 * @export
 * @interface StoryStats
 */
export interface StoryStats {
    /**
     * The number of documents related to this Story.
     * @type {number}
     * @memberof StoryStats
     */
    numRelatedDocuments: number;
}

/**
 * Check if a given object implements the StoryStats interface.
 */
export function instanceOfStoryStats(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "numRelatedDocuments" in value;

    return isInstance;
}

export function StoryStatsFromJSON(json: any): StoryStats {
    return StoryStatsFromJSONTyped(json, false);
}

export function StoryStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): StoryStats {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'numRelatedDocuments': json['num_related_documents'],
    };
}

export function StoryStatsToJSON(value?: StoryStats | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'num_related_documents': value.numRelatedDocuments,
    };
}
