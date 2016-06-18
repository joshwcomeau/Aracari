import chai from 'chai';
import equalJSX from 'chai-equal-jsx';
import sinonChai from 'sinon-chai';
import { jsdom } from 'jsdom';

chai.use(equalJSX);
chai.use(sinonChai);

console.info('---- Tests Starting -----');


const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
