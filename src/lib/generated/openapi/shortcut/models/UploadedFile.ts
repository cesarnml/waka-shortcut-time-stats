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
 * An UploadedFile is any document uploaded to your Shortcut Workspace. Files attached from a third-party service are different: see the Linked Files endpoint.
 * @export
 * @interface UploadedFile
 */
export interface UploadedFile {
    /**
     * The description of the file.
     * @type {string}
     * @memberof UploadedFile
     */
    description: string | null;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof UploadedFile
     */
    entityType: string;
    /**
     * The unique IDs of the Stories associated with this file.
     * @type {Array<number>}
     * @memberof UploadedFile
     */
    storyIds: Array<number>;
    /**
     * Deprecated: use member_mention_ids.
     * @type {Array<string>}
     * @memberof UploadedFile
     */
    mentionIds: Array<string>;
    /**
     * The unique IDs of the Members who are mentioned in the file description.
     * @type {Array<string>}
     * @memberof UploadedFile
     */
    memberMentionIds: Array<string>;
    /**
     * The optional User-specified name of the file.
     * @type {string}
     * @memberof UploadedFile
     */
    name: string;
    /**
     * The url where the thumbnail of the file can be found in Shortcut.
     * @type {string}
     * @memberof UploadedFile
     */
    thumbnailUrl: string | null;
    /**
     * The size of the file.
     * @type {number}
     * @memberof UploadedFile
     */
    size: number;
    /**
     * The unique ID of the Member who uploaded the file.
     * @type {string}
     * @memberof UploadedFile
     */
    uploaderId: string;
    /**
     * Free form string corresponding to a text or image file.
     * @type {string}
     * @memberof UploadedFile
     */
    contentType: string;
    /**
     * The time/date that the file was updated.
     * @type {Date}
     * @memberof UploadedFile
     */
    updatedAt: Date | null;
    /**
     * The name assigned to the file in Shortcut upon upload.
     * @type {string}
     * @memberof UploadedFile
     */
    filename: string;
    /**
     * The unique IDs of the Groups who are mentioned in the file description.
     * @type {Array<string>}
     * @memberof UploadedFile
     */
    groupMentionIds: Array<string>;
    /**
     * This field can be set to another unique ID. In the case that the File has been imported from another tool, the ID in the other tool can be indicated here.
     * @type {string}
     * @memberof UploadedFile
     */
    externalId: string | null;
    /**
     * The unique ID for the file.
     * @type {number}
     * @memberof UploadedFile
     */
    id: number;
    /**
     * The URL for the file.
     * @type {string}
     * @memberof UploadedFile
     */
    url: string | null;
    /**
     * The time/date that the file was created.
     * @type {Date}
     * @memberof UploadedFile
     */
    createdAt: Date;
}

/**
 * Check if a given object implements the UploadedFile interface.
 */
export function instanceOfUploadedFile(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "storyIds" in value;
    isInstance = isInstance && "mentionIds" in value;
    isInstance = isInstance && "memberMentionIds" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "thumbnailUrl" in value;
    isInstance = isInstance && "size" in value;
    isInstance = isInstance && "uploaderId" in value;
    isInstance = isInstance && "contentType" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "filename" in value;
    isInstance = isInstance && "groupMentionIds" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function UploadedFileFromJSON(json: any): UploadedFile {
    return UploadedFileFromJSONTyped(json, false);
}

export function UploadedFileFromJSONTyped(json: any, ignoreDiscriminator: boolean): UploadedFile {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'entityType': json['entity_type'],
        'storyIds': json['story_ids'],
        'mentionIds': json['mention_ids'],
        'memberMentionIds': json['member_mention_ids'],
        'name': json['name'],
        'thumbnailUrl': json['thumbnail_url'],
        'size': json['size'],
        'uploaderId': json['uploader_id'],
        'contentType': json['content_type'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'filename': json['filename'],
        'groupMentionIds': json['group_mention_ids'],
        'externalId': json['external_id'],
        'id': json['id'],
        'url': json['url'],
        'createdAt': (new Date(json['created_at'])),
    };
}

export function UploadedFileToJSON(value?: UploadedFile | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'entity_type': value.entityType,
        'story_ids': value.storyIds,
        'mention_ids': value.mentionIds,
        'member_mention_ids': value.memberMentionIds,
        'name': value.name,
        'thumbnail_url': value.thumbnailUrl,
        'size': value.size,
        'uploader_id': value.uploaderId,
        'content_type': value.contentType,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'filename': value.filename,
        'group_mention_ids': value.groupMentionIds,
        'external_id': value.externalId,
        'id': value.id,
        'url': value.url,
        'created_at': (value.createdAt.toISOString()),
    };
}

