'use strict';

// eslint-disable-next-line no-unused-vars
/* global $ */
const api = (function(){
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jon-zol';


  function listApiFetch(...args) {
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.message);
        }
        return res.json();
      })
      .catch(err => {
        $('#js-error-message').text(`Opps, something went wrong: ${err.message}`);
      });
  }
  
  const getBookmarks = function() {
    const url = `${BASE_URL}/bookmarks`;
    return listApiFetch(url);
  };

  const createBookmark = function(bookmark){
    const url = `${BASE_URL}/bookmarks`;
    console.log(bookmark);
    return listApiFetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: bookmark
    });
  };

  // PATCH http method

  // DELETE http method
  const deleteBookmark = function(id){
    const url = `${BASE_URL}/bookmarks/${id}`;
    listApiFetch(url, {
      method: 'DELETE',
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };

}());
