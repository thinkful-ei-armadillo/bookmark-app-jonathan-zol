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
          // {bookmark.id === descId ? 
          // '<div class="js-description">
          //     <p class="js-edit-description">${bookmark.description}</p>
          //     <a href="${bookmark.url}" type="_blank">View Site</a> 
          // </div>' : ''}
          <div>
              <p><span class="js-rating">${bookmark.rating}</span> Stars</p>
          </div>
        </li>`;
  }


  // generate add bookmark view
  function generateHtmlString(bookmarks){
    const bookmarkString = bookmarks
      .map(bookmark => generateHtmlBookmarkElement(bookmark))
      .join('');

    const formSting = '';
    if (isFormVisible){
      formSting = `<div id="js-form-select">
                      <button type="button" id="js-add-bookmark">Add Bookmark</button>
                      <select id="js-dropdown-rating" class="dropdown-rating">
                          <option value="" disabled selected hidden>Mininum rating...</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                      </select>
                  </div>`;
    } else {
      formString = `<form id="js-add-bookmark-form" class="hidden">
                        <h3 id="bookmark-title">Create a Bookmark:</h3>
                        <input type="text" name="title" id="bookmark-title" placeholder="Title">
                        <input type="number" name="rating" id="bookmark-rating" min="1" max="5" placeholder="Rating">
                        <input type="url" name="url" id="bookmark-url" placeholder="http://article.com">
                        <textarea type="text" name="description" id="bookmark-description" placeholder="Description..."></textarea>                   
                        <button type="submit">Submit</button>
                    </form>`;
    }

    return `<header>
                <h1 id="title">My Bookmarks</h1>
            </header>
            <div id="js-form-container">${formSting}</div>
            <ul id="js-bookmark-list">${bookmarkString}</ul>`;
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
   
      api.createBookmark(bookmarkJson)
        .then(bookmark => {
          STORE.addBookmark(bookmark);
          render();
        });
    });
  }

  function handleDescExpand(){
    $('.js-container').on('click', '.js-title', event=> {
     const id = getBookmarkIdFromElement();
     STORE.descId = id;
    })
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
