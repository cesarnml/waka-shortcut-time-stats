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
 * @interface UpdateLinkedFile
 */
export interface UpdateLinkedFile {
    /**
     * The description of the file.
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    description?: string;
    /**
     * The ID of the linked story.
     * @type {number}
     * @memberof UpdateLinkedFile
     */
    storyId?: number;
    /**
     * The name of the file.
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    name?: string;
    /**
     * The URL of the thumbnail, if the integration provided it.
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    thumbnailUrl?: string;
    /**
     * The integration type of the file (e.g. google, dropbox, box).
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    type?: UpdateLinkedFileTypeEnum;
    /**
     * The filesize, if the integration provided it.
     * @type {number}
     * @memberof UpdateLinkedFile
     */
    size?: number;
    /**
     * The UUID of the member that uploaded the file.
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    uploaderId?: string;
    /**
     * The URL of linked file.
     * @type {string}
     * @memberof UpdateLinkedFile
     */
    url?: string;
}


/**
 * @export
 */
export const UpdateLinkedFileTypeEnum = {
    Google: 'google',
    Url: 'url',
    Dropbox: 'dropbox',
    Box: 'box',
    Onedrive: 'onedrive'
} as const;
export type UpdateLinkedFileTypeEnum = typeof UpdateLinkedFileTypeEnum[keyof typeof UpdateLinkedFileTypeEnum];


/**
 * Check if a given object implements the UpdateLinkedFile interface.
 */
export function instanceOfUpdateLinkedFile(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateLinkedFileFromJSON(json: any): UpdateLinkedFile {
    return UpdateLinkedFileFromJSONTyped(json, false);
}

export function UpdateLinkedFileFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateLinkedFile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'storyId': !exists(json, 'story_id') ? undefined : json['story_id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'thumbnailUrl': !exists(json, 'thumbnail_url') ? undefined : json['thumbnail_url'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'size': !exists(json, 'size') ? undefined : json['size'],
        'uploaderId': !exists(json, 'uploader_id') ? undefined : json['uploader_id'],
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function UpdateLinkedFileToJSON(value?: UpdateLinkedFile | null): any {
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
        'url': value.url,
    };
}

