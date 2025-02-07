/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import Constants from '../constants.js';

export default class PathUtils {
  static getParentFromPath = (path) => path.substring(0, path.lastIndexOf('/'));

  static getCurrentPathName = (path) => path.substring(path.lastIndexOf('/') + 1);

  static getParentHierarchy = (path) => {
    const hierarchy = [];
    let currentParent = PathUtils.getParentFromPath(path);
    while (currentParent !== '/content' && currentParent !== '') {
      const entry = {};
      entry.title = PathUtils.getCurrentPathName(currentParent);
      entry.path = currentParent;
      hierarchy.push(entry);
      currentParent = PathUtils.getParentFromPath(currentParent);
    }
    hierarchy.reverse();
    return hierarchy;
  };

  /**
   * Checks if the given resource path represents a media (image/video) hosted in Franklin.
   *
   * @param {string} resourcePath - The path of the resource to be checked.
   * @returns {boolean} - True if the resource path represents a media hosted in Franklin, otherwise false.
   */
  static isMedia = (resourcePath) => resourcePath.trim().includes(Constants.MEDIA_PREFIX);

  static isVideoUrl = (url) => url.trim().includes(Constants.VIDEOS_IDENTIFIER);

  /**
   * Returns the hash value of the media resource.
   * For images hosted in Franklin, hash values are appended to the resource name.
   *
   * @param {string} resourcePath - The path of the media resource.
   * @returns {string} - The hash value extracted from the media resource path.
   */
  static getHashFromMedia = (resourcePath) => {
    const trimmedResourcePath = resourcePath.trim();
    return trimmedResourcePath.substring(Constants.MEDIA_PREFIX.length, trimmedResourcePath.indexOf('.'));
  };

  /**
   * Extracts the media path from the given resource path by removing the media prefix.
   *
   * @param {string} resourcePath - The path of the media resource.
   * @returns {string} - The resource path after removing the media prefix.
   */
  static extractMediaFromPath = (resourcePath) => {
    const trimmedResourcePath = resourcePath.trim();
    return trimmedResourcePath.substring(trimmedResourcePath.indexOf(Constants.MEDIA_PREFIX));
  };
}
