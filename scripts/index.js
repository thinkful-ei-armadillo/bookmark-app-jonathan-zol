'use strict';
/* global api, $, STORE, bookmarkList */

$(document).ready(function() {
  bookmarkList.handleBindEventHandlers();

  api.getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((item) => STORE.addBookmark(item));
      bookmarkList.render();
    });

});


