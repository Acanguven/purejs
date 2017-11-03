(function() {
  var leftSideBar = document.getElementById('nav');
  var classActive = false;
  document.addEventListener('scroll', function (){
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if(scrollPosition >= 70){
      if(!classActive){
        classActive = true;
        leftSideBar.style.position = 'fixed';
      }
    }else{
      if(classActive){
        leftSideBar.style.position = 'static';
        classActive = false;
      }
    }
  });
})();