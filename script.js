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
    const element = document.querySelector('#img');
    element.classList.add('hidden');
}

function menuoff() {
    const element = document.querySelector('#img');
    element.classList.remove('hidden');
}