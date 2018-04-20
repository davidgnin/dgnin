'use strict';
import smoothscroll from 'smoothscroll-polyfill';

let sectionSwitcher = function sectionSwitcher(config) {
  let nav = document.querySelector('#web-nav ul');
  let title = document.querySelector('#web-header h1');

  smoothscroll.polyfill();
  let changeSection = function changeSection(newSection, scroll = false) {
    if (newSection !== config.section) {
      config.section = newSection;
      document.body.className = 'dg-' + newSection;
      if (scroll) {
        config.ps.trigger('scroll-mode');
        document.getElementById(newSection).scrollIntoView({
          behavior: 'smooth'
        });
      }
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
      changeSection(el.className, true);
    }
  });

  title.addEventListener('click', function () {
    changeSection('home', true);
  });
  config.ps.on('section-changed', changeSection);
};

export default sectionSwitcher;
