'use strict';
/*global bookmarkList */
// eslint-disable-next-line no-unused-vars
const STORE = (function(){
  // add item to store
  const addBookmark = function(bookmark){
    try {
      this.bookmarks.push(bookmark);
    } catch(error) {
      console.log(error.message);
    }
  };


  function setDescriptionId(id){
    this.bookmarkExpandId ? this.bookmarkExpandId = '' : this.bookmarkExpandId = id;
  }

  //========================= Edit description ======================================
  //find bookmark item by id
  //const findBookmarkById = function(id){
  //  return this.bookmarks.find(bookmark => bookmark.id === id);
  //};
  //================================================================================= 
  

  // set search term
  const setSearchTerm = function(rating){
    this.searhTerm = rating;
  };

  // find and delete item by id
  const findAndDeleteBookmark = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  return {
    bookmarks: [],
    searhTerm: '',
    isFormVisible: false,
    bookmarkExpandId: '',
    addBookmark,
    setSearchTerm,
    findAndDeleteBookmark,
    setDescriptionId
  };
}());

