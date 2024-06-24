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
import type { PullRequestLabel } from './PullRequestLabel'
import {
  PullRequestLabelFromJSON,
  PullRequestLabelFromJSONTyped,
  PullRequestLabelToJSON,
} from './PullRequestLabel'

/**
 * Corresponds to a VCS Pull Request attached to a Shortcut story.
 * @export
 * @interface PullRequest
 */
export interface PullRequest {
  /**
   * A string description of this resource.
   * @type {string}
   * @memberof PullRequest
   */
  entityType: string
  /**
   * True/False boolean indicating whether the VCS pull request has been closed.
   * @type {boolean}
   * @memberof PullRequest
   */
  closed: boolean
  /**
   * True/False boolean indicating whether the VCS pull request has been merged.
   * @type {boolean}
   * @memberof PullRequest
   */
  merged: boolean
  /**
   * Number of lines added in the pull request, according to VCS.
   * @type {number}
   * @memberof PullRequest
   */
  numAdded: number
  /**
   * The ID of the branch for the particular pull request.
   * @type {number}
   * @memberof PullRequest
   */
  branchId: number
  /**
   * An array of Story ids that have Pull Requests that change at least one of the same lines this Pull Request changes.
   * @type {Array<number>}
   * @memberof PullRequest
   */
  overlappingStories?: Array<number>
  /**
   * The pull request's unique number ID in VCS.
   * @type {number}
   * @memberof PullRequest
   */
  number: number
  /**
   * The name of the branch for the particular pull request.
   * @type {string}
   * @memberof PullRequest
   */
  branchName: string
  /**
   * The name of the target branch for the particular pull request.
   * @type {string}
   * @memberof PullRequest
   */
  targetBranchName: string
  /**
   * The number of commits on the pull request.
   * @type {number}
   * @memberof PullRequest
   */
  numCommits: number | null
  /**
   * The title of the pull request.
   * @type {string}
   * @memberof PullRequest
   */
  title: string
  /**
   * The time/date the pull request was created.
   * @type {Date}
   * @memberof PullRequest
   */
  updatedAt: Date
  /**
   * True/False boolean indicating whether the VCS pull request is in the draft state.
   * @type {boolean}
   * @memberof PullRequest
   */
  draft: boolean
  /**
   * The unique ID associated with the pull request in Shortcut.
   * @type {number}
   * @memberof PullRequest
   */
  id: number
  /**
   * An array of PullRequestLabels attached to the PullRequest.
   * @type {Array<PullRequestLabel>}
   * @memberof PullRequest
   */
  vcsLabels?: Array<PullRequestLabel> | null
  /**
   * The URL for the pull request.
   * @type {string}
   * @memberof PullRequest
   */
  url: string
  /**
   * Number of lines removed in the pull request, according to VCS.
   * @type {number}
   * @memberof PullRequest
   */
  numRemoved: number
  /**
   * The status of the review for the pull request.
   * @type {string}
   * @memberof PullRequest
   */
  reviewStatus?: string
  /**
   * Number of lines modified in the pull request, according to VCS.
   * @type {number}
   * @memberof PullRequest
   */
  numModified: number | null
  /**
   * The status of the Continuous Integration workflow for the pull request.
   * @type {string}
   * @memberof PullRequest
   */
  buildStatus?: string
  /**
   * The ID of the target branch for the particular pull request.
   * @type {number}
   * @memberof PullRequest
   */
  targetBranchId: number
  /**
   * The ID of the repository for the particular pull request.
   * @type {number}
   * @memberof PullRequest
   */
  repositoryId: number
  /**
   * The time/date the pull request was created.
   * @type {Date}
   * @memberof PullRequest
   */
  createdAt: Date
}

/**
 * Check if a given object implements the PullRequest interface.
 */
export function instanceOfPullRequest(value: object): boolean {
  let isInstance = true
  isInstance = isInstance && 'entityType' in value
  isInstance = isInstance && 'closed' in value
  isInstance = isInstance && 'merged' in value
  isInstance = isInstance && 'numAdded' in value
  isInstance = isInstance && 'branchId' in value
  isInstance = isInstance && 'number' in value
  isInstance = isInstance && 'branchName' in value
  isInstance = isInstance && 'targetBranchName' in value
  isInstance = isInstance && 'numCommits' in value
  isInstance = isInstance && 'title' in value
  isInstance = isInstance && 'updatedAt' in value
  isInstance = isInstance && 'draft' in value
  isInstance = isInstance && 'id' in value
  isInstance = isInstance && 'url' in value
  isInstance = isInstance && 'numRemoved' in value
  isInstance = isInstance && 'numModified' in value
  isInstance = isInstance && 'targetBranchId' in value
  isInstance = isInstance && 'repositoryId' in value
  isInstance = isInstance && 'createdAt' in value

  return isInstance
}

export function PullRequestFromJSON(json: any): PullRequest {
  return PullRequestFromJSONTyped(json, false)
}

export function PullRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PullRequest {
  if (json === undefined || json === null) {
    return json
  }
  return {
    entityType: json['entity_type'],
    closed: json['closed'],
    merged: json['merged'],
    numAdded: json['num_added'],
    branchId: json['branch_id'],
    overlappingStories: !exists(json, 'overlapping_stories')
      ? undefined
      : json['overlapping_stories'],
    number: json['number'],
    branchName: json['branch_name'],
    targetBranchName: json['target_branch_name'],
    numCommits: json['num_commits'],
    title: json['title'],
    updatedAt: new Date(json['updated_at']),
    draft: json['draft'],
    id: json['id'],
    vcsLabels: !exists(json, 'vcs_labels')
      ? undefined
      : json['vcs_labels'] === null
      ? null
      : (json['vcs_labels'] as Array<any>).map(PullRequestLabelFromJSON),
    url: json['url'],
    numRemoved: json['num_removed'],
    reviewStatus: !exists(json, 'review_status') ? undefined : json['review_status'],
    numModified: json['num_modified'],
    buildStatus: !exists(json, 'build_status') ? undefined : json['build_status'],
    targetBranchId: json['target_branch_id'],
    repositoryId: json['repository_id'],
    createdAt: new Date(json['created_at']),
  }
}

export function PullRequestToJSON(value?: PullRequest | null): any {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  return {
    entity_type: value.entityType,
    closed: value.closed,
    merged: value.merged,
    num_added: value.numAdded,
    branch_id: value.branchId,
    overlapping_stories: value.overlappingStories,
    number: value.number,
    branch_name: value.branchName,
    target_branch_name: value.targetBranchName,
    num_commits: value.numCommits,
    title: value.title,
    updated_at: value.updatedAt.toISOString(),
    draft: value.draft,
    id: value.id,
    vcs_labels:
      value.vcsLabels === undefined
        ? undefined
        : value.vcsLabels === null
        ? null
        : (value.vcsLabels as Array<any>).map(PullRequestLabelToJSON),
    url: value.url,
    num_removed: value.numRemoved,
    review_status: value.reviewStatus,
    num_modified: value.numModified,
    build_status: value.buildStatus,
    target_branch_id: value.targetBranchId,
    repository_id: value.repositoryId,
    created_at: value.createdAt.toISOString(),
  }
}
