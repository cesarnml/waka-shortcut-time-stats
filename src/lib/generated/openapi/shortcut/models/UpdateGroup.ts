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
 * @interface UpdateGroup
 */
export interface UpdateGroup {
    /**
     * The description of this Group.
     * @type {string}
     * @memberof UpdateGroup
     */
    description?: string;
    /**
     * Whether or not this Group is archived.
     * @type {boolean}
     * @memberof UpdateGroup
     */
    archived?: boolean | null;
    /**
     * The color you wish to use for the Group in the system.
     * @type {string}
     * @memberof UpdateGroup
     */
    color?: string | null;
    /**
     * The Icon id for the avatar of this Group.
     * @type {string}
     * @memberof UpdateGroup
     */
    displayIconId?: string | null;
    /**
     * The mention name of this Group.
     * @type {string}
     * @memberof UpdateGroup
     */
    mentionName?: string;
    /**
     * The name of this Group.
     * @type {string}
     * @memberof UpdateGroup
     */
    name?: string;
    /**
     * The color key you wish to use for the Group in the system.
     * @type {string}
     * @memberof UpdateGroup
     */
    colorKey?: UpdateGroupColorKeyEnum;
    /**
     * The Member ids to add to this Group.
     * @type {Set<string>}
     * @memberof UpdateGroup
     */
    memberIds?: Set<string>;
    /**
     * The Workflow ids to add to the Group.
     * @type {Array<number>}
     * @memberof UpdateGroup
     */
    workflowIds?: Array<number>;
}


/**
 * @export
 */
export const UpdateGroupColorKeyEnum = {
    Blue: 'blue',
    Purple: 'purple',
    MidnightBlue: 'midnight-blue',
    Orange: 'orange',
    YellowGreen: 'yellow-green',
    Brass: 'brass',
    Gray: 'gray',
    Fuchsia: 'fuchsia',
    Yellow: 'yellow',
    Pink: 'pink',
    SkyBlue: 'sky-blue',
    Green: 'green',
    Red: 'red',
    Black: 'black',
    Slate: 'slate',
    Turquoise: 'turquoise'
} as const;
export type UpdateGroupColorKeyEnum = typeof UpdateGroupColorKeyEnum[keyof typeof UpdateGroupColorKeyEnum];


/**
 * Check if a given object implements the UpdateGroup interface.
 */
export function instanceOfUpdateGroup(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UpdateGroupFromJSON(json: any): UpdateGroup {
    return UpdateGroupFromJSONTyped(json, false);
}

export function UpdateGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateGroup {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': !exists(json, 'description') ? undefined : json['description'],
        'archived': !exists(json, 'archived') ? undefined : json['archived'],
        'color': !exists(json, 'color') ? undefined : json['color'],
        'displayIconId': !exists(json, 'display_icon_id') ? undefined : json['display_icon_id'],
        'mentionName': !exists(json, 'mention_name') ? undefined : json['mention_name'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'colorKey': !exists(json, 'color_key') ? undefined : json['color_key'],
        'memberIds': !exists(json, 'member_ids') ? undefined : json['member_ids'],
        'workflowIds': !exists(json, 'workflow_ids') ? undefined : json['workflow_ids'],
    };
}

export function UpdateGroupToJSON(value?: UpdateGroup | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'archived': value.archived,
        'color': value.color,
        'display_icon_id': value.displayIconId,
        'mention_name': value.mentionName,
        'name': value.name,
        'color_key': value.colorKey,
        'member_ids': value.memberIds === undefined ? undefined : Array.from(value.memberIds as Set<any>),
        'workflow_ids': value.workflowIds,
    };
}
