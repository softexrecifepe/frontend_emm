var cont = 0;
function clickimg() {  
    if(cont == 0)
      {
     menuon();
      cont += 1;
      }
  else
      {
      menuoff();
      cont = 0;
      }
};

function menuon() {
    document.getElementById("img").src = "list-b.svg"
}

function menuoff() {
    document.getElementById("img").src = "list.svg"
}