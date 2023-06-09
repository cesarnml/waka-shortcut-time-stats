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
 * Emoji reaction on a comment.
 * @export
 * @interface StoryReaction
 */
export interface StoryReaction {
    /**
     * Emoji text of the reaction.
     * @type {string}
     * @memberof StoryReaction
     */
    emoji: string;
    /**
     * Permissions who have reacted with this.
     * @type {Array<string>}
     * @memberof StoryReaction
     */
    permissionIds: Array<string>;
}

/**
 * Check if a given object implements the StoryReaction interface.
 */
export function instanceOfStoryReaction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "emoji" in value;
    isInstance = isInstance && "permissionIds" in value;

    return isInstance;
}

export function StoryReactionFromJSON(json: any): StoryReaction {
    return StoryReactionFromJSONTyped(json, false);
}

export function StoryReactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): StoryReaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'emoji': json['emoji'],
        'permissionIds': json['permission_ids'],
    };
}

export function StoryReactionToJSON(value?: StoryReaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'emoji': value.emoji,
        'permission_ids': value.permissionIds,
    };
}

