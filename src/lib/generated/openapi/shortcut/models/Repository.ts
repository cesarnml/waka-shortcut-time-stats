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
 * Repository refers to a VCS repository.
 * @export
 * @interface Repository
 */
export interface Repository {
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Repository
     */
    entityType: string;
    /**
     * The shorthand name of the VCS repository.
     * @type {string}
     * @memberof Repository
     */
    name: string | null;
    /**
     * The type of Repository. Currently this can only be "github".
     * @type {string}
     * @memberof Repository
     */
    type: string;
    /**
     * The time/date the Repository was updated.
     * @type {Date}
     * @memberof Repository
     */
    updatedAt: Date | null;
    /**
     * The VCS unique identifier for the Repository.
     * @type {string}
     * @memberof Repository
     */
    externalId: string | null;
    /**
     * The ID associated to the VCS repository in Shortcut.
     * @type {number}
     * @memberof Repository
     */
    id: number | null;
    /**
     * The URL of the Repository.
     * @type {string}
     * @memberof Repository
     */
    url: string | null;
    /**
     * The full name of the VCS repository.
     * @type {string}
     * @memberof Repository
     */
    fullName: string | null;
    /**
     * The time/date the Repository was created.
     * @type {Date}
     * @memberof Repository
     */
    createdAt: Date | null;
}

/**
 * Check if a given object implements the Repository interface.
 */
export function instanceOfRepository(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "fullName" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function RepositoryFromJSON(json: any): Repository {
    return RepositoryFromJSONTyped(json, false);
}

export function RepositoryFromJSONTyped(json: any, ignoreDiscriminator: boolean): Repository {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityType': json['entity_type'],
        'name': json['name'],
        'type': json['type'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'externalId': json['external_id'],
        'id': json['id'],
        'url': json['url'],
        'fullName': json['full_name'],
        'createdAt': (json['created_at'] === null ? null : new Date(json['created_at'])),
    };
}

export function RepositoryToJSON(value?: Repository | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': value.entityType,
        'name': value.name,
        'type': value.type,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'external_id': value.externalId,
        'id': value.id,
        'url': value.url,
        'full_name': value.fullName,
        'created_at': (value.createdAt === null ? null : value.createdAt.toISOString()),
    };
}
