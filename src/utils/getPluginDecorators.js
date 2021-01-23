// import { getPlugins } from 'draft-js-plugins-editor';
import { CompositeDecorator } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';

let mentionPlugin = createMentionPlugin();
let linkifyPlugin = createLinkifyPlugin();

function getPluginDecoratorArray() {
  let decorators = [];
  let plugin;
  let myPlugins = [mentionPlugin, linkifyPlugin];

  for (plugin of myPlugins) {
    if (plugin.decorators !== null && plugin.decorators !== undefined) {
      decorators = decorators.concat(plugin.decorators);
    }
  }
  return decorators;
}

export default function getAllPluginDecorators() {
  return new MultiDecorator([
    new CompositeDecorator(getPluginDecoratorArray()),
  ]);
}
