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
import type { IterationSlim } from './IterationSlim';
import {
    IterationSlimFromJSON,
    IterationSlimFromJSONTyped,
    IterationSlimToJSON,
} from './IterationSlim';

/**
 * The results of the Iteration search query.
 * @export
 * @interface IterationSearchResults
 */
export interface IterationSearchResults {
    /**
     * The total number of matches for the search query. The first 1000 matches can be paged through via the API.
     * @type {number}
     * @memberof IterationSearchResults
     */
    total: number;
    /**
     * A list of search results.
     * @type {Array<IterationSlim>}
     * @memberof IterationSearchResults
     */
    data: Array<IterationSlim>;
    /**
     * The URL path and query string for the next page of search results.
     * @type {string}
     * @memberof IterationSearchResults
     */
    next: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof IterationSearchResults
     */
    cursors?: Array<string>;
}

/**
 * Check if a given object implements the IterationSearchResults interface.
 */
export function instanceOfIterationSearchResults(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "total" in value;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "next" in value;

    return isInstance;
}

export function IterationSearchResultsFromJSON(json: any): IterationSearchResults {
    return IterationSearchResultsFromJSONTyped(json, false);
}

export function IterationSearchResultsFromJSONTyped(json: any, ignoreDiscriminator: boolean): IterationSearchResults {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'total': json['total'],
        'data': ((json['data'] as Array<any>).map(IterationSlimFromJSON)),
        'next': json['next'],
        'cursors': !exists(json, 'cursors') ? undefined : json['cursors'],
    };
}

export function IterationSearchResultsToJSON(value?: IterationSearchResults | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'total': value.total,
        'data': ((value.data as Array<any>).map(IterationSlimToJSON)),
        'next': value.next,
        'cursors': value.cursors,
    };
}

