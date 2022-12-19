import { RequestLogicHandlers } from '@twoday/msw-openapi-backend-integration';
import type { Components } from '../client';

export const definition = require('../TodoMVC-API.json');

let id = 0;

const items: Components.Schemas.Items =
  definition.paths['/items'].get.responses['200'].content['application/json']
    .examples['example-1'].value;

const requestLogicHandlers: RequestLogicHandlers = {
  postItem(request) {
    items.push({
      ...(request.requestBody as object),
      timestamp: Date.now(),
      _id: String(id++),
    });
  },
  putItem(request) {
    const item = request.requestBody as Components.Schemas.Item;
    const index = items.findIndex((item) => item._id === request.params.itemId);
    items[index] = item;
  },
  putItems(request) {
    const itemUpdates = request.requestBody as Components.Schemas.Items;
    for (const itemUpdate of itemUpdates) {
      const index = items.findIndex((item) => item._id === itemUpdate._id);
      items[index] = itemUpdate;
    }
  },
  deleteItem(request) {
    const index = items.findIndex((item) => item._id === request.params.itemId);
    items.splice(index, 1);
  },
  deleteItems(request) {
    for (const id of request.requestBody) {
      const index = items.findIndex((item) => item._id === id);
      items.splice(index, 1);
    }
  },
};
export default requestLogicHandlers;
