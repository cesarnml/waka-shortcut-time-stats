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
import type { CreateStoryParams } from './CreateStoryParams';
import {
    CreateStoryParamsFromJSON,
    CreateStoryParamsFromJSONTyped,
    CreateStoryParamsToJSON,
} from './CreateStoryParams';

/**
 * 
 * @export
 * @interface CreateStories
 */
export interface CreateStories {
    /**
     * An array of stories to be created.
     * @type {Array<CreateStoryParams>}
     * @memberof CreateStories
     */
    stories: Array<CreateStoryParams>;
}

/**
 * Check if a given object implements the CreateStories interface.
 */
export function instanceOfCreateStories(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "stories" in value;

    return isInstance;
}

export function CreateStoriesFromJSON(json: any): CreateStories {
    return CreateStoriesFromJSONTyped(json, false);
}

export function CreateStoriesFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateStories {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'stories': ((json['stories'] as Array<any>).map(CreateStoryParamsFromJSON)),
    };
}

export function CreateStoriesToJSON(value?: CreateStories | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'stories': ((value.stories as Array<any>).map(CreateStoryParamsToJSON)),
    };
}

