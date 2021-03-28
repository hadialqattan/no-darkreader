/*
  MIT License

  Copyright (c) 2021 Hadi Alqattan

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

/**
 * Runs the initialization and exports the public functions.
 * Only "Public" members will be exported.
 * Initialization is done trough a factory method to allow different module supports.
 */
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Define exports for Asynchronous Module Definition (AMD)
    define('nodarkreader', [], factory)
  } else if (typeof exports === 'object') {
    // Define exports for CommonJS (CJS)
    module.exports = factory()
  } else {
    // Fallback to defining as browser global under 'nodarkreader'.
    root.nodarkreader = factory()
  }
})(this, function () {
  // Remove all Darkreader style tags form `document.head` (Private)
  const removeDarkreader = function () {
    // NOTE: use traditional 'for loops' for IE 11
    for (const style of document.head.getElementsByClassName('darkreader')) {
      style.remove()
    }
  }

  // Fake html meta tag to disable darkreader (Private)
  const fakeMetaTag = document.createElement('meta')
  fakeMetaTag.name = 'darkreader'
  fakeMetaTag.content = 'DISABLE-DARKREADER-WORKAROUND'

  // Check for darkreader meta tag, add if not exists (Private)
  const addMetaTag = function () {
    let correctTag = document.querySelector(
      'meta[content="' + fakeMetaTag.content + '"]'
    )
    if (!correctTag) {
      document.head.appendChild(fakeMetaTag)
    }
    let realTag = document.querySelector(
      'meta[name="' + fakeMetaTag.name + '"]'
    )
    if (realTag && realTag.content != fakeMetaTag.content) {
      realTag.remove()
    }
  }

  // TODO: uncomment when we've `stop` function
  // Remove the fake metatag (Private)
  /* const removeMetaTag = function () {
    let fakeTag = document.querySelector(
      'meta[content="' + fakeMetaTag.content + '"]'
    )
    if (fakeTag) {
      fakeTag.remove()
    }
  } */

  // Init function (Private)
  const init = function () {
    addMetaTag()
    removeDarkreader()
  }

  // Options for the observer (which mutations to observe) (Private)
  const config = { attributes: false, childList: true, subtree: false }

  // Create an observer instance linked to the callback function (Private)
  const observer = new MutationObserver((mutationsList, observer) => init())

  // Start observing the target node for configured mutations
  observer.observe(document.head, config)

  // TODO: move the line above inside this function when we've functional `stop` function
  //const start = function () {}

  // TODO: find way to stop blocking Darkreader!
  // Stop observing the target node (Public)
  /* const stop = function () {
    observer.disconnect()
    removeMetaTag()
  }*/

  // TODO: remove when we've start & stop functions
  init()

  return {
    // related to above todo: start,
    // related to above todo: stop,
  }
})
