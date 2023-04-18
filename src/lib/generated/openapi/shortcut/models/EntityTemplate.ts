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
import type { StoryContents } from './StoryContents';
import {
    StoryContentsFromJSON,
    StoryContentsFromJSONTyped,
    StoryContentsToJSON,
} from './StoryContents';

/**
 * An entity template can be used to prefill various fields when creating new stories.
 * @export
 * @interface EntityTemplate
 */
export interface EntityTemplate {
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof EntityTemplate
     */
    entityType: string;
    /**
     * The unique identifier for the entity template.
     * @type {string}
     * @memberof EntityTemplate
     */
    id: string;
    /**
     * The time/date when the entity template was created.
     * @type {Date}
     * @memberof EntityTemplate
     */
    createdAt: Date;
    /**
     * The time/date when the entity template was last updated.
     * @type {Date}
     * @memberof EntityTemplate
     */
    updatedAt: Date;
    /**
     * The template's name.
     * @type {string}
     * @memberof EntityTemplate
     */
    name: string;
    /**
     * The unique ID of the member who created the template.
     * @type {string}
     * @memberof EntityTemplate
     */
    authorId: string;
    /**
     * The last time that someone created an entity using this template.
     * @type {Date}
     * @memberof EntityTemplate
     */
    lastUsedAt: Date;
    /**
     * 
     * @type {StoryContents}
     * @memberof EntityTemplate
     */
    storyContents: StoryContents;
}

/**
 * Check if a given object implements the EntityTemplate interface.
 */
export function instanceOfEntityTemplate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "authorId" in value;
    isInstance = isInstance && "lastUsedAt" in value;
    isInstance = isInstance && "storyContents" in value;

    return isInstance;
}

export function EntityTemplateFromJSON(json: any): EntityTemplate {
    return EntityTemplateFromJSONTyped(json, false);
}

export function EntityTemplateFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityTemplate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityType': json['entity_type'],
        'id': json['id'],
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
        'name': json['name'],
        'authorId': json['author_id'],
        'lastUsedAt': (new Date(json['last_used_at'])),
        'storyContents': StoryContentsFromJSON(json['story_contents']),
    };
}

export function EntityTemplateToJSON(value?: EntityTemplate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': value.entityType,
        'id': value.id,
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
        'name': value.name,
        'author_id': value.authorId,
        'last_used_at': (value.lastUsedAt.toISOString()),
        'story_contents': StoryContentsToJSON(value.storyContents),
    };
}

