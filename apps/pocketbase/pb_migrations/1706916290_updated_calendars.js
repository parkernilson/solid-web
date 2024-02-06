/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vj0h29poq2k6tbj")

  collection.listRule = "@request.auth.id != \"\" && (owner.id = @request.auth.id || @request.auth.id ?= share_record.viewers)"
  collection.viewRule = "@request.auth.id != \"\" && (owner.id = @request.auth.id || @request.auth.id ?= share_record.viewers)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vj0h29poq2k6tbj")

  collection.listRule = "@request.auth.id != \"\" && owner.id = @request.auth.id"
  collection.viewRule = "@request.auth.id != \"\" && owner.id = @request.auth.id"

  return dao.saveCollection(collection)
})
