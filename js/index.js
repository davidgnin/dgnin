'use strict';
import smoothscroll from 'smoothscroll-polyfill';

(function dgnin() {
  let nav = document.querySelector('#web-nav ul');
  let title = document.querySelector('#web-header h1');

  let section = 'home';

  smoothscroll.polyfill();
  let changeSection = function changeSection(newSection) {
    if (newSection !== section) {
      section = newSection;
      document.body.className = 'dg-' + newSection;
      document.getElementById(newSection).scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  nav.addEventListener('click', function (ev) {
    let getEl = function (el) {
      let name = el.tagName.toLowerCase();
      if (name === 'li') {
        return el;
      } else if (name === 'ul') {
        return false;
      } else {
        return getEl(el.parentNode);
      }
    };
    let el = getEl(ev.target);
    if (el) {
      changeSection(el.className);
    }
  });

  title.addEventListener('click', function () {
    changeSection('home');
  });
})();
