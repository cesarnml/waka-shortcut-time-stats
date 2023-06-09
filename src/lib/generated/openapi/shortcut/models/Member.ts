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
import type { Profile } from './Profile';
import {
    ProfileFromJSON,
    ProfileFromJSONTyped,
    ProfileToJSON,
} from './Profile';

/**
 * Details about an individual user within the Workspace.
 * @export
 * @interface Member
 */
export interface Member {
    /**
     * The Member's role in the Workspace.
     * @type {string}
     * @memberof Member
     */
    role: string;
    /**
     * A string description of this resource.
     * @type {string}
     * @memberof Member
     */
    entityType: string;
    /**
     * True/false boolean indicating whether the Member has been disabled within the Workspace.
     * @type {boolean}
     * @memberof Member
     */
    disabled: boolean;
    /**
     * 
     * @type {string}
     * @memberof Member
     */
    globalId: string;
    /**
     * The user state, one of partial, full, disabled, or imported.  A partial user is disabled, has no means to log in, and is not an import user.  A full user is enabled and has a means to log in.  A disabled user is disabled and has a means to log in.  An import user is disabled, has no means to log in, and is marked as an import user.
     * @type {string}
     * @memberof Member
     */
    state: MemberStateEnum;
    /**
     * The time/date the Member was last updated.
     * @type {Date}
     * @memberof Member
     */
    updatedAt: Date | null;
    /**
     * Whether this member was created as a placeholder entity.
     * @type {boolean}
     * @memberof Member
     */
    createdWithoutInvite: boolean;
    /**
     * The Member's group ids
     * @type {Array<string>}
     * @memberof Member
     */
    groupIds: Array<string>;
    /**
     * The Member's ID in Shortcut.
     * @type {string}
     * @memberof Member
     */
    id: string;
    /**
     * 
     * @type {Profile}
     * @memberof Member
     */
    profile: Profile;
    /**
     * The time/date the Member was created.
     * @type {Date}
     * @memberof Member
     */
    createdAt: Date | null;
    /**
     * The id of the member that replaces this one when merged.
     * @type {string}
     * @memberof Member
     */
    replacedBy?: string;
}


/**
 * @export
 */
export const MemberStateEnum = {
    Partial: 'partial',
    Full: 'full',
    Disabled: 'disabled',
    Imported: 'imported'
} as const;
export type MemberStateEnum = typeof MemberStateEnum[keyof typeof MemberStateEnum];


/**
 * Check if a given object implements the Member interface.
 */
export function instanceOfMember(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "role" in value;
    isInstance = isInstance && "entityType" in value;
    isInstance = isInstance && "disabled" in value;
    isInstance = isInstance && "globalId" in value;
    isInstance = isInstance && "state" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "createdWithoutInvite" in value;
    isInstance = isInstance && "groupIds" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "profile" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function MemberFromJSON(json: any): Member {
    return MemberFromJSONTyped(json, false);
}

export function MemberFromJSONTyped(json: any, ignoreDiscriminator: boolean): Member {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'role': json['role'],
        'entityType': json['entity_type'],
        'disabled': json['disabled'],
        'globalId': json['global_id'],
        'state': json['state'],
        'updatedAt': (json['updated_at'] === null ? null : new Date(json['updated_at'])),
        'createdWithoutInvite': json['created_without_invite'],
        'groupIds': json['group_ids'],
        'id': json['id'],
        'profile': ProfileFromJSON(json['profile']),
        'createdAt': (json['created_at'] === null ? null : new Date(json['created_at'])),
        'replacedBy': !exists(json, 'replaced_by') ? undefined : json['replaced_by'],
    };
}

export function MemberToJSON(value?: Member | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'role': value.role,
        'entity_type': value.entityType,
        'disabled': value.disabled,
        'global_id': value.globalId,
        'state': value.state,
        'updated_at': (value.updatedAt === null ? null : value.updatedAt.toISOString()),
        'created_without_invite': value.createdWithoutInvite,
        'group_ids': value.groupIds,
        'id': value.id,
        'profile': ProfileToJSON(value.profile),
        'created_at': (value.createdAt === null ? null : value.createdAt.toISOString()),
        'replaced_by': value.replacedBy,
    };
}

