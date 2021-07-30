/*
  MIT License

  Copyright (c) 2021 Hadi Alqattan <alqattanhadizaki@gmail.com>

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

(function () {
  // Fake html meta tag to disable darkreader.
  const fakeMetaTag = document.createElement("meta");
  fakeMetaTag.name = "darkreader";
  fakeMetaTag.content = "NO-DARKREADER-PLUGIN";

  // Alter the real metatag with the fake one.
  const alterMetaTag = function () {
    let correctTag = document.querySelector(
      'meta[content="' + fakeMetaTag.content + '"]'
    );
    if (!correctTag) {
      document.head.appendChild(fakeMetaTag);
    }
    let realTag = document.querySelector(
      'meta[name="' + fakeMetaTag.name + '"]'
    );
    if (realTag && realTag.content != fakeMetaTag.content) {
      realTag.remove();
    }
  };

  // Remove all DarkReader style tags form `document.head`.
  const removeDarkreader = function () {
    // NOTE: use traditional 'for loops' for IE 11
    for (const style of document.head.getElementsByClassName("darkreader")) {
      style.remove();
    }
  };

  // Observing callback function.
  const callback = function () {
    alterMetaTag();
    removeDarkreader();
  };

  // Options for the observer (which mutations to observe).
  const config = { attributes: false, childList: true, subtree: false };

  // Create an observer instance linked to the callback function.
  const observer = new MutationObserver(callback);

  if (
    !document.querySelector('meta[content="' + fakeMetaTag.content + '"]') &&
    document.querySelector('meta[name="' + fakeMetaTag.name + '"]')
  ) {
    console.error(
      "Please add the line bellow to your index.html:\n",
      '<meta name="darkreader" content="NO-DARKREADER-PLUGIN">\n',
      "or you may encounter a performance issue!\n",
      "\nplease take a look at: https://github.com/hadialqattan/no-darkreader#usage"
    );
  } else {
    // Start observing the target node for configured mutations.
    observer.observe(document.head, config);

    // Execute for the fist time to take effect.
    callback();
  }
})();
