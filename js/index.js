'use strict';
import pubsub from './pubsub';
import sectionSwitcher from './section-switcher';
import scrollController from './scroll-controller';

(function dgnin() {
  let config = {
    section: 'home',
    ps: pubsub()
  };
  sectionSwitcher(config);
  scrollController(config);
})();
