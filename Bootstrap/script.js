var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > 100) {
    document.getElementById("navbar").style.top = "0";
    const nav = document.getElementById("main-header");
    nav.classList.remove("hidden")
  } else {
    document.getElementById("navbar").style.top = "-70px";
    const nav = document.getElementById("main-header");
  }
  prevScrollpos = currentScrollPos;
}