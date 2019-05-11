// sm-dropdown
function userMenuToggler(x) {
  // toggle icon to show cross and turn back harmburger
  x.classList.toggle('toggle');
  // toggle document
  const menuContainer = document.querySelector('ul.dropdown-none');
  menuContainer.classList.toggle('show-dropdown');
}

function handleAsideToggle(x) {
  x.classList.toggle('toggle');
  const menuContainer = document.querySelector('.side-drawer-none');
  menuContainer.classList.toggle('show-side-drawer');
}
