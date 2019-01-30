'use strict';
/*global $, STORE, api*/

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  // generate landing view
  // generate li bookmark element
  function generateHtmlBookmarkElement(bookmark){
    return `
        <li class='js-bookmark' data-item-id="${bookmark.id}">
          <div>
              <p class="js-toggle-info">${bookmark.title}</p>
              <button type="button" class="js-delete"><span class="icon">X</span></button>
          </div>
          <div class="js-description hidden">
              <p class="js-edit-description">${bookmark.description}</p>
              <a href="${bookmark.url}" type="_blank">View Site</a> 
          </div>
          <div>
              <p><span class="js-rating">${bookmark.rating}</span> Stars</p>
          </div>
        </li>`;
  }

  // generate add bookmark view
  function generateHtmlString(bookmarks){
    return bookmarks
      .map(bookmark => generateHtmlBookmarkElement(bookmark))
      .join('');
  }

  // generate details bookmark view
  function render(){
    const bookmarks = [...STORE.bookmarks];
    // filter bookmark list
    if (STORE.searhTerm){
      bookmarks = STORE.bookmarks
        .filter(bookmark => parseInt(bookmark.rating) >= parseInt(STORE.searhTerm));
    }
    const bookmarkSting = generateHtmlString(bookmarks);
    // render html elements
    $('#js-bookmark-list').html(bookmarkSting);
  }

  function handleAddForm(){
    $('#js-add-bookmark').click(event => {
      $(event.currentTarget).closest('#js-form-select').addClass('hidden');
      $(event.currentTarget).closest('#js-form-container').find('#js-add-bookmark-form').removeClass('hidden'); 
    });
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  // handle add bookmark item
  function handleAddBookmark(){
    $('#js-add-bookmark-form').submit(event => {
      event.preventDefault();
      const bookmarkJson = $(event.currentTarget).serializeJson();
      $(event.currentTarget).closest('#js-form-container').find('#js-form-select').removeClass('hidden');
      $(event.currentTarget).addClass('hidden');
      api.createBookmark(bookmarkJson)
        .then(bookmark => {
          STORE.addBookmark(bookmark);
          render();
        });
    });
  }

  // handle dropdown rating
  function handleFilterRating(){
    var selectedRating = $('#js-dropdown-rating option:selected').val();
    $('#js-dropdown-rating option').val('');
    STORE.setSearchTerm(selectedRating);
    render();
  }
  //grab id from a bookmark element  
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark')
      .data('item-id');
  }
  // handle delete bookmark item
  function handleDeleteBookmark(){
    debugger;
    $('#js-bookmark-list').on('click', 'js-delete', event => {
      console.log('click event triggered on delete button')
      const id = getBookmarkIdFromElement(event.currentTarget);
      STORE.findAndDeleteBookmark(id);
      api.deleteBookmark(id);
      render();
    });
  }

  // binding function eventListeners
  function handleBindEventHandlers(){
    handleAddBookmark();
    handleFilterRating();
    handleDeleteBookmark();
    handleAddForm();
  }

  // return bookmarks obj
  return {
    render: render,
    handleBindEventHandlers: handleBindEventHandlers
  };
}());
