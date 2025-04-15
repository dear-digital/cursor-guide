import {defineField} from 'sanity';

export function iconPartial(name = 'icon') {
  return defineField({
    name,
    type: 'string',
    options: {
      list: [
        {title: 'Arrow Right', value: 'arrow-right'},
        {title: 'Arrow Left', value: 'arrow-left'},
        {title: 'Arrow Up', value: 'arrow-up'},
        {title: 'Arrow Down', value: 'arrow-down'},
        {title: 'Bluetooth', value: 'bluetooth'},
        {title: 'Wifi', value: 'wifi'},
        {title: 'Display Settings', value: 'display-settings'},
        {title: 'Sous Vide', value: 'sous-vide'},
        {title: 'Slow Cooking', value: 'slow-cooking'},
        {title: 'Temperature High', value: 'temperature-high'},
        {title: 'Ferment Mode', value: 'ferment-mode'},
        {title: 'Blend', value: 'blend'},
        {title: 'Advisor', value: 'advisor'},
        {title: 'Bookmark', value: 'bookmark'},
        {title: 'Bookmark Added', value: 'bookmark-added'},
        {title: 'Caret Down', value: 'caret-down'},
        {title: 'Caret Left', value: 'caret-left'},
        {title: 'Caret Up', value: 'caret-up'},
        {title: 'Caret Right', value: 'caret-right'},
        {title: 'Checkmark', value: 'checkmark'},
        {title: 'Close', value: 'close'},
        {title: 'Comment', value: 'comment'},
        {title: 'Delivery', value: 'delivery'},
        {title: 'Delete', value: 'delete'},
        {title: 'Favorite', value: 'favorite'},
        {title: 'Favorite Filled', value: 'favorite-filled'},
        {title: 'Info', value: 'info'},
        {title: 'Home', value: 'home'},
        {title: 'Tutorial', value: 'tutorial'},
        {title: 'Time', value: 'time'},
        {title: 'Timer', value: 'timer'},
      ],
      layout: 'dropdown',
    },
  });
}
