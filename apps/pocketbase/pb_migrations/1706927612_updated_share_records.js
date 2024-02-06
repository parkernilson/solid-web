/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6kih4z4zv8oma1")

  collection.viewRule = "@request.auth.id != '' && @collection.calendars.share_record.id = @request.auth.id && @collection.calendars.owner.id = @request.auth.id"
  collection.createRule = "@request.auth.id != '' && @collection.calendars.share_record.id = @request.auth.id && @collection.calendars.owner.id = @request.auth.id"
  collection.updateRule = "@request.auth.id != '' && @collection.calendars.share_record.id = @request.auth.id && @collection.calendars.owner.id = @request.auth.id"
  collection.deleteRule = "@request.auth.id != '' && @collection.calendars.share_record.id = @request.auth.id && @collection.calendars.owner.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6kih4z4zv8oma1")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
