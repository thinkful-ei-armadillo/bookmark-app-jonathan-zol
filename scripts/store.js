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

  const setFormVisible = function() {
    STORE.isFormVisible = !STORE.isFormVisible;
  };

  // find and delete item by id
  const findAndDeleteBookmark = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const setDescriptionId = function(id) {
    STORE.bookmarkExpandId ? STORE.bookmarkExpandId = '' : STORE.bookmarkExpandId = id;
  };

  return {
    bookmarks: [],
    searhTerm: '',
    isFormVisible: false,
    bookmarkExpandId: '',
    addBookmark,
    setSearchTerm,
    findAndDeleteBookmark,
    setDescriptionId,
    setFormVisible,
  };
}());

