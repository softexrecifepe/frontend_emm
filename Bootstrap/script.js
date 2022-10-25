$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 1) { // 140 é a distancia que vc rola antes da logo sumir
      $("#main-header").removeClass("et-fixed-header");
    } else {
      $("#main-header").addClass("et-fixed-header");
    }
  });