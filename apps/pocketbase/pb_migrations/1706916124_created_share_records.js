/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x6kih4z4zv8oma1",
    "created": "2024-02-02 23:22:04.842Z",
    "updated": "2024-02-02 23:22:04.842Z",
    "name": "share_records",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9pvptrni",
        "name": "viewers",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("x6kih4z4zv8oma1");

  return dao.deleteCollection(collection);
})
