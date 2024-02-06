/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6kih4z4zv8oma1")

  collection.listRule = "@request.auth.id != '' && @collection.goals.owner.id = @request.auth.id && @collection.goals.share_record.id = id"
  collection.viewRule = "@request.auth.id != '' && @collection.goals.owner.id = @request.auth.id && @collection.goals.share_record.id = id"
  collection.createRule = "@request.auth.id != '' && @collection.goals.owner.id = @request.auth.id && @collection.goals.share_record.id = id"
  collection.updateRule = "@request.auth.id != '' && @collection.goals.owner.id = @request.auth.id && @collection.goals.share_record.id = id"
  collection.deleteRule = "@request.auth.id != '' && @collection.goals.owner.id = @request.auth.id && @collection.goals.share_record.id = id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x6kih4z4zv8oma1")

  collection.listRule = "@request.auth.id != '' && @collection.calendars.owner.id = @request.auth.id && @collection.calendars.share_record.id = id"
  collection.viewRule = "@request.auth.id != '' && @collection.calendars.owner.id = @request.auth.id && @collection.calendars.share_record.id = id"
  collection.createRule = "@request.auth.id != '' && @collection.calendars.owner.id = @request.auth.id && @collection.calendars.share_record.id = id"
  collection.updateRule = "@request.auth.id != '' && @collection.calendars.owner.id = @request.auth.id && @collection.calendars.share_record.id = id"
  collection.deleteRule = "@request.auth.id != '' && @collection.calendars.owner.id = @request.auth.id && @collection.calendars.share_record.id = id"

  return dao.saveCollection(collection)
})
