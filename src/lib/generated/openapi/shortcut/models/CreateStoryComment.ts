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

import { exists, mapValues } from '../runtime'
/**
 *
 * @export
 * @interface CreateStoryComment
 */
export interface CreateStoryComment {
  /**
   * The Member ID of the Comment's author. Defaults to the user identified by the API token.
   * @type {string}
   * @memberof CreateStoryComment
   */
  authorId?: string
  /**
   * Marks the comment as a blocker that can be surfaced to permissions or teams mentioned in the comment. Can only be used on a top-level comment.
   * @type {boolean}
   * @memberof CreateStoryComment
   */
  blocker?: boolean
  /**
   * Defaults to the time/date the comment is last updated, but can be set to reflect another date.
   * @type {Date}
   * @memberof CreateStoryComment
   */
  updatedAt?: Date
  /**
   * This field can be set to another unique ID. In the case that the comment has been imported from another tool, the ID in the other tool can be indicated here.
   * @type {string}
   * @memberof CreateStoryComment
   */
  externalId?: string
  /**
   * The ID of the Comment that this comment is threaded under.
   * @type {number}
   * @memberof CreateStoryComment
   */
  parentId?: number | null
  /**
   * Marks the comment as an unblocker to its  blocker parent. Can only be set on a threaded comment who has a parent with `blocker` set.
   * @type {boolean}
   * @memberof CreateStoryComment
   */
  unblocksParent?: boolean
  /**
   * Defaults to the time/date the comment is created, but can be set to reflect another date.
   * @type {Date}
   * @memberof CreateStoryComment
   */
  createdAt?: Date
  /**
   * The comment text.
   * @type {string}
   * @memberof CreateStoryComment
   */
  text: string
}

/**
 * Check if a given object implements the CreateStoryComment interface.
 */
export function instanceOfCreateStoryComment(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'text' in value

  return isInstance
}

export function CreateStoryCommentFromJSON(json: any): CreateStoryComment {
  return CreateStoryCommentFromJSONTyped(json, false)
}

export function CreateStoryCommentFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): CreateStoryComment {
  if (json === undefined || json === null) {
    return json
  }
  return {
    authorId: !exists(json, 'author_id') ? undefined : json['author_id'],
    blocker: !exists(json, 'blocker') ? undefined : json['blocker'],
    updatedAt: !exists(json, 'updated_at') ? undefined : new Date(json['updated_at']),
    externalId: !exists(json, 'external_id') ? undefined : json['external_id'],
    parentId: !exists(json, 'parent_id') ? undefined : json['parent_id'],
    unblocksParent: !exists(json, 'unblocks_parent') ? undefined : json['unblocks_parent'],
    createdAt: !exists(json, 'created_at') ? undefined : new Date(json['created_at']),
    text: json['text'],
  }
}

export function CreateStoryCommentToJSON(value?: CreateStoryComment | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    author_id: value.authorId,
    blocker: value.blocker,
    updated_at: value.updatedAt === undefined ? undefined : value.updatedAt.toISOString(),
    external_id: value.externalId,
    parent_id: value.parentId,
    unblocks_parent: value.unblocksParent,
    created_at: value.createdAt === undefined ? undefined : value.createdAt.toISOString(),
    text: value.text,
  }
}
