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
import type { BasicWorkspaceInfo } from './BasicWorkspaceInfo';
import {
    BasicWorkspaceInfoFromJSON,
    BasicWorkspaceInfoFromJSONTyped,
    BasicWorkspaceInfoToJSON,
} from './BasicWorkspaceInfo';

/**
 * 
 * @export
 * @interface MemberInfo
 */
export interface MemberInfo {
    /**
     * 
     * @type {string}
     * @memberof MemberInfo
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof MemberInfo
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof MemberInfo
     */
    mentionName: string;
    /**
     * 
     * @type {BasicWorkspaceInfo}
     * @memberof MemberInfo
     */
    workspace2: BasicWorkspaceInfo;
}

/**
 * Check if a given object implements the MemberInfo interface.
 */
export function instanceOfMemberInfo(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "mentionName" in value;
    isInstance = isInstance && "workspace2" in value;

    return isInstance;
}

export function MemberInfoFromJSON(json: any): MemberInfo {
    return MemberInfoFromJSONTyped(json, false);
}

export function MemberInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MemberInfo {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'mentionName': json['mention_name'],
        'workspace2': BasicWorkspaceInfoFromJSON(json['workspace2']),
    };
}

export function MemberInfoToJSON(value?: MemberInfo | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'mention_name': value.mentionName,
        'workspace2': BasicWorkspaceInfoToJSON(value.workspace2),
    };
}

