/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0ha165cbigv0ei")

  collection.listRule = "@request.auth.id != \"\" && goal.owner.id = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && goal.owner.id = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && goal.owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && goal.owner.id = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && goal.owner.id = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rhk5szo9",
    "name": "goal",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g0ha165cbigv0ei")

  collection.listRule = "@request.auth.id != \"\" && calendar.owner.id = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && calendar.owner.id = @request.auth.id"
  collection.createRule = "@request.auth.id != \"\" && calendar.owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != \"\" && calendar.owner.id = @request.auth.id"
  collection.deleteRule = "@request.auth.id != \"\" && calendar.owner.id = @request.auth.id"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rhk5szo9",
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
  }))

  return dao.saveCollection(collection)
})
