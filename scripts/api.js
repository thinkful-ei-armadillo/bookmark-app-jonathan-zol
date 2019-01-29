'use strict';

const api = (function(){
  
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

  // get bookmark list items
  function getBookmarks() {
    fetch(`${BASE_URL}/jon-zol/bookmarks`)
      .then(res => res.json())
      .then(res => console.log(res));
  }


  
  return {
    getBookmarks
  };

}());
