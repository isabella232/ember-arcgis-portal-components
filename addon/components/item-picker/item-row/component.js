import Ember from 'ember';
import singleTemplate from './single/template';
import multipleTemplate from './multiple/template';

export default Ember.Component.extend({

  session: Ember.inject.service(),

  layout: Ember.computed('selectMultiple', function () {
    let layout = singleTemplate;
    if (this.get('selectMultiple')) {
      layout = multipleTemplate;
    }
    return layout;
  }),

  tagName: 'li',

  classNames: [ 'item-picker-item-results-item' ],

  classNameBindings: [ 'isSelected', 'selectMultiple' ],

  didInsertElement () {
    const el = this.$('[data-toggle="tooltip"]');
    if (el.tooltip) {
      el.tooltip();
    }
  },

  willDestroyElement () {
    const el = this.$('[data-toggle="tooltip"]');
    if (el.tooltip) {
      el.tooltip('destroy');
    }
  },

  isSelected: Ember.computed('currentItemId', 'model.id', function () {
    return this.get('currentItemId') === this.get('model.id');
  }),

  checked: Ember.computed('model.id', 'itemsToAdd.[]', function () {
    const itemsToAdd = this.get('itemsToAdd');
    return !!itemsToAdd.findBy('id', this.get('model.id'));
  }),

  url: Ember.computed('model.id', 'session.portalHostname', function () {
    return `https://${this.get('session.portalHostname')}/home/item.html?id=${this.get('model.id')}`;
  }),

  actions: {
    selectItem (item) {
      // this is annoying... but necessary
      Ember.run.next(this, () => {
        this.get('onClick')(item);
      });
    },
  }

});