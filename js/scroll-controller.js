'use strict';

let scrollController = function scrollController(config) {
  let sections = [{
    el: document.getElementById('home'),
    name: 'home'
  }, {
    el: document.getElementById('skills'),
    name: 'skills'
  }, {
    el: document.getElementById('portfolio'),
    name: 'portfolio'
  }, {
    el: document.getElementById('curriculum'),
    name: 'curriculum'
  }, {
    el: document.getElementById('contact'),
    name: 'contact'
  }];
  let range, scrollTimeout, scrollMode = false;

  let checkPosition = function checkPosition() {
    if (scrollMode) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        scrollMode = false;
        checkPosition();
      }, 100);
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].el.getBoundingClientRect().top <= range) {
          if (config.section !== sections[i].name) {
            config.ps.trigger('section-changed', sections[i].name);
          }
          break;
        }
      }
    }
  };

  let calcVars = function calcVars() {
    range = Math.round(Math.max(document.documentElement.clientHeight,
      window.innerHeight || 0)/2);
    checkPosition();
  };

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', calcVars);
  calcVars();

  config.ps.on('scroll-mode', function () {
    scrollMode = true;
  });
};

export default scrollController;
