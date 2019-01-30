'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jon-zol';


  function listApiFetch(...args) {
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(data => {
        if (error) throw new Error(data.message);
        return data;
      })
      .catch(err => alert(err.message));
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
      body: JSON.stringify(bookmark)
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
