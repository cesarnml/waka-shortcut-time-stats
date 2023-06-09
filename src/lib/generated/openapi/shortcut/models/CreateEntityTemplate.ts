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
import type { CreateStoryContents } from './CreateStoryContents';
import {
    CreateStoryContentsFromJSON,
    CreateStoryContentsFromJSONTyped,
    CreateStoryContentsToJSON,
} from './CreateStoryContents';

/**
 * Request paramaters for creating an entirely new entity template.
 * @export
 * @interface CreateEntityTemplate
 */
export interface CreateEntityTemplate {
    /**
     * The name of the new entity template
     * @type {string}
     * @memberof CreateEntityTemplate
     */
    name: string;
    /**
     * The id of the user creating this template.
     * @type {string}
     * @memberof CreateEntityTemplate
     */
    authorId?: string;
    /**
     * 
     * @type {CreateStoryContents}
     * @memberof CreateEntityTemplate
     */
    storyContents: CreateStoryContents;
}

/**
 * Check if a given object implements the CreateEntityTemplate interface.
 */
export function instanceOfCreateEntityTemplate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "storyContents" in value;

    return isInstance;
}

export function CreateEntityTemplateFromJSON(json: any): CreateEntityTemplate {
    return CreateEntityTemplateFromJSONTyped(json, false);
}

export function CreateEntityTemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateEntityTemplate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'authorId': !exists(json, 'author_id') ? undefined : json['author_id'],
        'storyContents': CreateStoryContentsFromJSON(json['story_contents']),
    };
}

export function CreateEntityTemplateToJSON(value?: CreateEntityTemplate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'author_id': value.authorId,
        'story_contents': CreateStoryContentsToJSON(value.storyContents),
    };
}

