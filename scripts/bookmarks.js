'use strict';
/*global $, STORE, api*/

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){
  function generateHtmlBookmarkElement(bookmark){
    const bookmarkDesc = `<div class="js-description">
                            <p class="js-edit-description">${bookmark.desc}</p>
                            <a href="${bookmark.url}" type="_blank">View Site</a>
                          </div>`;

    const rating = [];
    for (let i = 0; i < 5; i++){
      rating
        .push(i < parseInt(bookmark.rating)?'<span class="fa fa-star checked"></span>':'<span class="fa fa-star"></span>');
    }

    return `
        <li class='js-bookmark' data-item-id="${bookmark.id}">
          <div>
              <p class="js-bookmark-description">${bookmark.title}</p>
              <button type="button" class="js-delete"><i class="fas fa-trash-alt"></i></button>
          </div> 
          ${STORE.bookmarkExpandId === bookmark.id ? bookmarkDesc : ''}
          <div>
              <p>${rating.join('')}</p>
          </div>
        </li>`;
  }

  // generate add bookmark view
  function generateHtmlString(bookmarks){
    const bookmarkString = bookmarks
      .map(bookmark => generateHtmlBookmarkElement(bookmark))
      .join('');

    let formString = '<div id="js-form-select"><button type = "button" id ="js-add-bookmark" > Add Bookmark</button><select id="js-dropdown-rating" class="dropdown-rating"><option value="0">Select minimum rating</option><option value="5">5 Stars</option><option value="4">4 Stars</option><option value="3">3 Stars</option><option value="2">2 Stars</option><option value="1">1 Star</option></select></div>';

    if (STORE.isFormVisible){
      formString = `<form role="search" id="js-add-bookmark-form">
                        <h3 id="bookmark-title">Create a Bookmark:</h3>
                        <input type="text" name="title" id="bookmark-title" placeholder="Title" required>
                        <input type="number" name="rating" id="bookmark-rating" min="1" max="5" placeholder="Rating" required>
                        <input type="url" name="url" id="bookmark-url" placeholder="http://article.com" required>
                        <textarea type="text" name="desc" id="bookmark-description" placeholder="Description..." required></textarea>                   
                        <button type="submit">Submit</button>
                        <button type="button" class="js-close-form">Close</button>
                    </form>`;
    }

    return `<header role="banner">
                <h1 id="title">My Bookmarks</h1>
            </header>
            <div id="js-form-container">${formString}</div>
            <ul id="js-bookmark-list">${bookmarkString}</ul>`;
  }

  // generate details bookmark view
  function render(){
    let bookmarks = [...STORE.bookmarks];
    // filter bookmark list
    if(STORE.searhTerm){
      bookmarks = bookmarks
        .filter(bookmark => bookmark.rating >= STORE.searhTerm);
    }
    const bookmarkString = generateHtmlString(bookmarks);
    console.log(bookmarks);
    // render html elements
    $('.js-container').html(bookmarkString);
  }

  // function setFormVisible(){
  //   STORE.isFormVisible = !STORE.isFormVisible;
  // }

  function handleAddForm(){
    $('.js-container').on('click', '#js-add-bookmark', () => {
      STORE.setFormVisible();
      render();
    });
  }

  function handleCloseButton(){
    $('.js-container').on('click', '.js-close-form', () => {
      STORE.setFormVisible();
      render();
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
    $('.js-container').on('submit', '#js-add-bookmark-form', event => {
      event.preventDefault();
      const bookmarkJson = $(event.currentTarget).serializeJson();
      STORE.setFormVisible();
      api.createBookmark(bookmarkJson)
        .then(bookmark => {
          STORE.addBookmark(bookmark);
          render();
        });
    });
  } 

  

  function handleDescExpand(){
    $('.js-container').on('click', '.js-bookmark-description', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      console.log(id);
      STORE.setDescriptionId(id);
      render();
    });
  }

  // handle dropdown rating
  function handleFilterRating(){
    $('.js-container').on('change', '#js-dropdown-rating', () => {
      var selectedRating = $('#js-dropdown-rating option:selected').val();
      console.log(selectedRating);
      STORE.setSearchTerm(selectedRating);
      render();
    });
  }
  //grab id from a bookmark element  
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark')
      .data('item-id');
  }
  // handle delete bookmark item
  function handleDeleteBookmark(){
    $('.js-container').on('click', '.js-delete', event => {
      console.log('click event triggered on delete button');
      const id = getBookmarkIdFromElement(event.currentTarget);
      STORE.findAndDeleteBookmark(id);
      api.deleteBookmark(id);
      render();
    });
  }

  // function 

  // binding function eventListeners
  function handleBindEventHandlers(){
    handleAddBookmark();
    handleFilterRating();
    handleDeleteBookmark();
    handleAddForm();
    handleDescExpand();
    handleCloseButton();
  }

  // return bookmarks obj
  return {
    render: render,
    handleBindEventHandlers: handleBindEventHandlers
  };
}());
