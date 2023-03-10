import db, { getObjectId } from "./db.js";

import {ObjectId} from "mongodb"


let user = db.collection("users");

export async function testDB() {
  const result = await user.findOne({ _id: 1 });
  return result;
}

export async function getUser(creds) {
  const result = await user.findOne({ _id: creds.username });
  return result;
}

export async function findFavorites(listName) {
  const result = await user.find({
    items: { $elemMatch: { important: true } },
  });
  return result;
}

export async function getAllListItemsDB(userInfo) {
  const result = await user.find({_id:userInfo._id}, {"lists":1})
    .toArray();

  return result;
}

export async function getItemsDB(userInfo, listName) {
  const result = await user
    .aggregate([
      // Get just the docs that contain a shapes element where color is 'red'
      { $match: { _id: userInfo._id, "lists.name": listName } },
      {
        $project: {
          lists: {
            $filter: {
              input: "$lists",
              as: "list",
              cond: { $eq: ["$$list.name", listName] },
            },
          },
          _id: 0,
        },
      },
    ])
    .toArray();

  return result;
}

export async function addItemDB(id, listName, item) {
  const result = await user.updateOne(
    { _id: id, "lists.name": listName },
    {
      $push: {
        "lists.$.items": {
          uniqueId: getObjectId(),
          data: item,
          favorite: false,
        },
      },
    }
  );

  return result;
}

export async function changeFavoriteDB(userID, listName, itemID, status) {
  console.log(status);
  if(status==="true"){
    status = true;
  } else {
    status = false;
  }
  console.log(status);

  const result = await user.updateOne(
    {
      _id: userID,
      lists: {
        $elemMatch: {
          name: listName,
          "items.uniqueId": new ObjectId(itemID),
        },
      },
    },

    {
      $set: {
        "lists.$[outer].items.$[inner].favorite": !status,
      },
    },

    { arrayFilters: [{ "outer.name": listName }, { "inner.uniqueId": new ObjectId(itemID) }] }
  );

  return result;
}
