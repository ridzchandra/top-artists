import { API } from 'aws-amplify';

export function createFavourite(favourite) {
  return API.post('favourites', '/favourites', {
    body: favourite,
  });
}
