(function() {
  var menu;
  setTimeout(function _hackOpenMenu() {
    menu = document.querySelector('.dl-trigger');
    if (menu) menu.click();
  }, 250);

})();
