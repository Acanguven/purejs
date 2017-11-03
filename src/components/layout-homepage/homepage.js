(function () {
  /* leftSideBarScroll */
  var leftSideBar = document.getElementById('nav');
  var classActive = false;
  document.addEventListener('scroll', function () {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollPosition >= 70) {
      if (!classActive) {
        classActive = true;
        leftSideBar.style.position = 'fixed';
      }
    } else {
      if (classActive) {
        leftSideBar.style.position = 'static';
        classActive = false;
      }
    }
  });


  /* headerSearchInput */
  var searchInput = document.getElementById('searchInput');
  searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      window.location = '/search/' + searchInput.value;
    }
  });
  document.getElementById('searchTrigger').addEventListener('click', function () {
    if(searchInput.value.length > 0){
      window.location = '/search/' + searchInput.value;
    }
  });
})();