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
 * 
 * @export
 * @interface CreateLinkedFile
 */
export interface CreateLinkedFile {
    /**
     * The description of the file.
     * @type {string}
     * @memberof CreateLinkedFile
     */
    description?: string;
    /**
     * The ID of the linked story.
     * @type {number}
     * @memberof CreateLinkedFile
     */
    storyId?: number;
    /**
     * The name of the file.
     * @type {string}
     * @memberof CreateLinkedFile
     */
    name: string;
    /**
     * The URL of the thumbnail, if the integration provided it.
     * @type {string}
     * @memberof CreateLinkedFile
     */
    thumbnailUrl?: string;
    /**
     * The integration type of the file (e.g. google, dropbox, box).
     * @type {string}
     * @memberof CreateLinkedFile
     */
    type: CreateLinkedFileTypeEnum;
    /**
     * The filesize, if the integration provided it.
     * @type {number}
     * @memberof CreateLinkedFile
     */
    size?: number;
    /**
     * The UUID of the member that uploaded the file.
     * @type {string}
     * @memberof CreateLinkedFile
     */
    uploaderId?: string;
    /**
     * The content type of the image (e.g. txt/plain).
     * @type {string}
     * @memberof CreateLinkedFile
     */
    contentType?: string;
    /**
     * The URL of linked file.
     * @type {string}
     * @memberof CreateLinkedFile
     */
    url: string;
}


/**
 * @export
 */
export const CreateLinkedFileTypeEnum = {
    Google: 'google',
    Url: 'url',
    Dropbox: 'dropbox',
    Box: 'box',
    Onedrive: 'onedrive'
} as const;
export type CreateLinkedFileTypeEnum = typeof CreateLinkedFileTypeEnum[keyof typeof CreateLinkedFileTypeEnum];


/**
 * Check if a given object implements the CreateLinkedFile interface.
 */
export function instanceOfCreateLinkedFile(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "url" in value;

    return isInstance;
}

export function CreateLinkedFileFromJSON(json: any): CreateLinkedFile {
    return CreateLinkedFileFromJSONTyped(json, false);
}

export function CreateLinkedFileFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateLinkedFile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'storyId': !exists(json, 'story_id') ? undefined : json['story_id'],
        'name': json['name'],
        'thumbnailUrl': !exists(json, 'thumbnail_url') ? undefined : json['thumbnail_url'],
        'type': json['type'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'uploaderId': !exists(json, 'uploader_id') ? undefined : json['uploader_id'],
        'contentType': !exists(json, 'content_type') ? undefined : json['content_type'],
        'url': json['url'],
    };
}

export function CreateLinkedFileToJSON(value?: CreateLinkedFile | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'story_id': value.storyId,
        'name': value.name,
        'thumbnail_url': value.thumbnailUrl,
        'type': value.type,
        'size': value.size,
        'uploader_id': value.uploaderId,
        'content_type': value.contentType,
        'url': value.url,
    };
}

