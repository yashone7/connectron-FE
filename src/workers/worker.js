import client from '../feathers/feathersClient';

const feedService = client.service('feeds');

feedService.on('created', (data) => {
  console.log('message recieved');
  postMessage(data);
});
