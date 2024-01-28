/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "l6itntxwsf4126a",
    "created": "2024-01-27 21:29:54.327Z",
    "updated": "2024-01-27 21:29:54.327Z",
    "name": "share_requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vhhcsqxh",
        "name": "calendar",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "vj0h29poq2k6tbj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "lmtyynvg",
        "name": "share_with_email",
        "type": "email",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "9c6edkun",
        "name": "secret_key",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": "@request.auth.email = share_with_email",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.email = share_with_email",
    "deleteRule": "@request.auth.email = share_with_email",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("l6itntxwsf4126a");

  return dao.deleteCollection(collection);
})
