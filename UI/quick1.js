// sm-dropdown
function userMenuToggler(x) {
  x.classList.toggle("toggle");
  const menuContainer = document.querySelector('ul.md-dropdown-none');
  menuContainer.classList.toggle('sm-dropdown');
}
