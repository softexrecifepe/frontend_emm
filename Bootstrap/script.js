document.addEventListener("scroll", function() {
  var posicaoy = window.pageYOffset;
  if (posicaoy <= 100) {
    const nav = document.getElementById("main-header");
    nav.classList.remove("fixed-top");
    nav.classList.add("hidden");
  }
  else{
    const nav = document.getElementById("main-header");
    nav.classList.add("fixed-top");
    nav.classList.remove("hidden")
  }
});