
# Backpack SDK Documentation

## Installing the SDK

1. Configuring the SDK

Link to the relevant script files in your HTML files 

`<script src=”https://admin.yourBackpack.com/sdk.js”></script>`

2. Call the `createSdk` method from your JavaScript code with the Backpack’s unique URL and API key. 

`const sdk = createSdk('https://mySweetApp.myDomain.com/', 'aLong&RandomApiKey');`

The object returned by `createSdk` exposes Backpack’s functionality through modules that each represent a core Backpack component: collection management, data persistence, user authentication, file storage, realtime communication over websockets. 

## SDK Methods


### Authentication:

For security purposes, the Users collection that contains the email and encrypted password for each user is not accessible from the API. 

#### register(email, password)
`email` and `password` should be strings. The user will be registered using their email as their username. Returns a JSON object with the user's ID.

```
sdk.auth.register('user@users.com', 'my_password123')

=> { "id": "5e9f2eee0fb8891a90d642a2" }
```

#### login(email, password)
`email` and `password` should be strings. The user will be logged in. Returns a JSON object with the user's ID.

```
sdk.auth.login('user@users.com', 'my_password123')

=> { "id": "5e9f2eee0fb8891a90d642a2" }
```

  
#### logout()
Current user will be logged out. 

```
sdk.auth.logout()

=> { message: OK }
```
  
### Database interactions 


#### getCollectionsList()
Returns a JSON object containing an array of collection names.

```
sdk.db.getCollectionList()

=> ['messages', 'comments']
```

  
#### createNewCollection(collectionName)
`collectionName` should be a string. Creates a new set of routes for the collection. Returns the name of the collection.The actual collection will be created when a record is added to it. It will not appear in the list of collections until the first record has been added.

```
sdk.db.createNewCollection('messages')

=> messages
```

#### getCollection(collection)
`collection` should be a string. Returns a JSON object containing an array of database records for the collection.

```
sdk.db.getCollection('messages')

=> [
    {
        "_id": "5e9f2fc00fb8899611d642a4",
        "text": "I am a message!",
        "createdAt": "2020-04-21T17:39:12.829Z",
        "updatedAt": "2020-04-21T17:39:12.829Z",
        "__v": 0
    },
    {
        "_id": "5e9f31220fb8898538d642a5",
        "text": "I am another message!",
        "createdAt": "2020-04-21T17:45:06.722Z",
        "updatedAt": "2020-04-21T17:45:06.722Z",
        "__v": 0
    }
]
``` 
  

#### getResource(collection, id)
`collection` and `id` should be strings. Returns a JSON object containing a database record.

```
sdk.db.getResource('messages', '5e9f2eee0fb8891a90d642a2')
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "I am a message!",
    "createdAt": "2020-04-21T17:39:12.829Z",
    "updatedAt": "2020-04-21T17:39:12.829Z",
    "__v": 0
}
```
  

#### createResource(collection, data)
`collection` should be a string. `data` should be an object. The data argument can contain any key-value pairs. It is up to the frontend developer to ensure data integrity by placing constraints on the arguments that can be passed to this method. Timestamps and unique ID will be added automatically.

```
sdk.db.createResource('messages', { "text": "I am a message!" })
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "I am a message!",
    "createdAt": "2020-04-21T17:39:12.829Z",
    "updatedAt": "2020-04-21T17:39:12.829Z",
    "__v": 0
}
```

#### updateResource(collection, id, data)
`collection` and `id` should be strings. `data` should be an object containing the key-value pairs to be updated. This method will update the existing record by modifying existing fields and/or adding new ones. Existing key-value pairs not included in the `data` argument will remain in the document.

```
sdk.db.updateResource('messages', '5e9f2fc00fb8899611d642a4', {"text": "updated message"})
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "updated message",
    "__v": 0,
    "updatedAt": "2020-04-21T18:08:35.297Z",
    "createdAt": "2020-04-21T18:08:35.297Z"
}
sdk.db.createResource('messages', { "new_field": "some other information" })
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "updated message",
    "new_field": "some other information",
    "createdAt": "2020-04-21T17:39:12.829Z",
    "updatedAt": "2020-04-21T17:39:12.829Z",
    "__v": 0
}
```
  
#### overwriteResource(collection, id, data)
`collection` and `id` should be strings. `data` should be an object containing the key-value pairs to be updated. This method will overwrite the existing record with the key-value pairs in the `data` argument. Key-value pairs not included in `data` will be lost.

```
sdk.db.updateResource('messages', '5e9f2fc00fb8899611d642a4', {"new_key": "some value"})
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "new_key": "some value",
    "__v": 0,
    "updatedAt": "2020-04-21T18:08:35.297Z",
    "createdAt": "2020-04-21T18:08:35.297Z"
}
```

#### deleteResource(collection, id)
`collection` and `id` should be strings. `id` is the id of the resource to be deleted.

```
sdk.db.deleteResource('messages', '5e9f2fc00fb8899611d642a4')
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "I am a message!",
    "createdAt": "2020-04-21T17:39:12.829Z",
    "updatedAt": "2020-04-21T17:39:12.829Z",
    "__v": 0
}
```  
  
### File storage:

#### getFile(userId, filename)
Returns the file in the body of the response. The file is identified by filename and the userId of the user who uploaded it. `filename` should be a string. 

Can be accessed by calling `.blob()` on the response body, creating a url by calling `URL.createObjectURL()` on the blob file, and using the return value as the value for the `src` attribute in the html. See MDN: https://developer.mozilla.org/en-US/docs/Web/API/Body/blob
```
sdk.storage.getFile("5e9f38f8126233001e2dc194", "my_photo.jpg");
=>      {
            "_id": "5e9f38f8126233001e2dc194",
            "userId": "5e876354eb2b13001ea7097a",
            "filename": "my_photo.jpg",
            "bucket": "none",
            "createdAt": "2020-04-21T18:18:32.365Z",
            "updatedAt": "2020-04-21T18:18:32.365Z",
            "__v": 0
        }
```

#### getListOfUserFiles(userId)
`userId` should be a string. Returns a JSON object containing an array of metadata records for the files associated with a user.

```
sdk.storage.getListOfUserFiles('5e876354eb2b13001ea7097a')

=>  { records: 
      [      
        {
            "_id": "5e9f38f8126233001e2dc194",
            "userId": "5e876354eb2b13001ea7097a",
            "filename": "my_photo.jpg",
            "bucket": "none",
            "createdAt": "2020-04-21T18:18:32.365Z",
            "updatedAt": "2020-04-21T18:18:32.365Z",
            "__v": 0
        },
        {
            "_id": "5e9f3b2c126233001e2dc195",
            "userId": "5e876354eb2b13001ea7097a",
            "filename": "my_other_photo.jpg",
            "bucket": "none",
            "createdAt": "2020-04-21T18:27:56.797Z",
            "updatedAt": "2020-04-21T18:27:56.797Z",
            "__v": 0
        }
      ]
    }
```

#### uploadFile(fileFromFormData, filename, bucket)
File must be multipart/form-data.`filename` and `bucket` should be strings and must not be empty. `filename` should include extension.

In the html, set the form attribute to `enctype="multipart/form-data"`.  File will be saved under `current_user_id/filename`.

```
sdk.storage.uploadFile(file, 'my_photo.jpg', 'photos')
=> {
    "_id": "5e9f38f8126233001e2dc194",
    "userId": "5e876354eb2b13001ea7097a",
    "filename": "my_photo.jpg",
    "bucket": "photos",
    "createdAt": "2020-04-21T18:18:32.365Z",
    "updatedAt": "2020-04-21T18:18:32.365Z",
    "__v": 0
}
```
  
#### updateFile(currentFilename, newFilename, bucket)
Overwrites file metadata. All arguments should be strings. `newFilename` should include extension.
  
```
sdk.storage.updateFil('my_other_photo.jpg', 'new_photo_name.jpg', 'archived_photos')

=> {
    "record": {
        "_id": "5e9f3b2c126233001e2dc195",
        "userId": "5e876354eb2b13001ea7097a",
        "filename": "new_photo_name.jpg",
        "bucket": "archived_photos",
        "createdAt": "2020-04-21T18:27:56.797Z",
        "updatedAt": "2020-04-21T18:31:37.319Z",
        "__v": 0
    }
}
```
#### overwriteFile(fileFromFormData, filename)
Replaces file currently saved under `current_user/filename` with `fileFromFormData`. Metadata will not be updated. `filename` should be a string.

```
sdk.storage.overwriteFile(file, 'new_photo_name.jpg')
=> { "message": "file overwritten" }
```
  

#### deleteFile(filename)
Deletes file under `current_user/filename`. `filename` should be a string.

```
sdk.storage.deleteFile('new_photo_name, jpg')
=> {
    "deletedRecord": {
        "_id": "5e9f3b2c126233001e2dc195",
        "userId": "5e876354eb2b13001ea7097a",
        "filename": "new_photo_name.jpg",
        "bucket": "archived_photos",
        "createdAt": "2020-04-21T18:27:56.797Z",
        "updatedAt": "2020-04-21T18:31:37.319Z",
        "__v": 0
    }
}
```
  

### Websocket Messages

To create a websocket connection, call the `ws()` method on the `sdk` object:

```
const websocket = sdk.ws();
```

This `websocket` object has an `actions` object that contains a number of convenience methods for sending messages, interacting with the database, and creating and managing channels. These methods are listed below.


The client and the websocket server in Backpack communicate with each other by sending `JSON` messages back and forth.

Access the messages the server sends using the standard Websocket API `message` event:

```
websocket.onmessage = (e) => {
  const message = JSON.parse(e.data);
}
```

Messages always include an `action` property set to a `string` that tells the server how to process the message. Once the message is processed, the server sends a message to the client with the same `action` property value along with additional information corresponding to the action. 

Here are the list of actions:

```
find
getAll
getOne
create
update
patch
delete
sendMessage
joinUsersChannels
createChannel
joinChannel
leaveChannel
changeChannel
deleteChannel
open
close
```

Here is a list of methods to interact with the database. 

Note, you never have include the `userId` of the client that is calling a method--the server logs the `userId` on the initial `get` request when establishing the websocket connection through Backpack's authentication system.

#### sendMessage(message)
`message` should be an object with an `action` property created by the frontend developer.

This method simply broadcasts the given message to active websocket connections.

If the `message` contains a `channelType` and `channelId` property, the message is only broadcast to active websocket connections who are subscribed to that channel. 

If the `message`  DOES NOT contain a `channelType` and `channelId` property, the message is broadcast to ALL active websocket connections.

Please see the <a href="https://github.com/baaspack/baas-sdk/blob/master/README.md#websocket-channels">Websocket Channels</a> section in this documentation for more information on Channels.

```
websocket.actions.sendMessage(message);

=> {
  action: 'userTyping',
  userId: "5e9b9e47a15aa8001eaf635a"
}
```


#### findResource(collection, query)
`collection` should be a string. `query` should be an object. 

Returns a `JSON` object containing an `action` property that is set to 'find' and a `response` property that is set to an array of database records that match the query.

```
websocket.actions.findResource('messages', { userId: '5e9b9e47a15aa8001eaf635a' });

=> {
  action: "find",
  response: [
    {
      _id: "5e9f1ec2387d701181de03af",
      userName: "Sally",
      userId: "5e9b9e47a15aa8001eaf635a",
      text: "Hello?",
      createdAt: "2020-04-21T16:26:42.804Z",
      updatedAt: "2020-04-21T16:26:42.804Z",
      __v: 0,
    },
    {
      _id: "5e9f630c9bda1f125bdcf1a2",
      userName: "Sally",
      userId: "5e9b9e47a15aa8001eaf635a",
      text: "This is amazing!",
      createdAt: "2020-04-21T21:18:04.845Z",
      updatedAt: "2020-04-21T21:18:04.845Z",
      __v: 0,
    },
  ],
}

```

#### getCollection(collection)
`collection` should be a string.

Returns a `JSON` object containing an `action` property that is set to 'getAll', a `collection` property that is set to the database collection name, and a `response` property that is set to an array of all of the database records in the collection.

```
websocket.actions.getCollection('messages');

=> {
  action: "getAll",
  collection: "messages",
  response: [
    {
      _id: "5e9f1ebb387d701181de03ae",
      userName: "George",
      userId: "5e9bf673dbdb350a9c08ebb0",
      text: "Good morning!",
      createdAt: "2020-04-21T16:26:35.021Z",
      updatedAt: "2020-04-21T16:26:35.021Z",
      __v: 0,
    },
    {
      _id: "5e9f1ec2387d701181de03af",
      userName: "Sally",
      userId: "5e9b9e47a15aa8001eaf635a",
      text: "Hi everyone!",
      createdAt: "2020-04-21T16:26:42.804Z",
      updatedAt: "2020-04-21T16:26:42.804Z",
      __v: 0,
    },
}
```

#### getResource(collection, id)
`collection` and `id` should be strings.

Returns a `JSON` object containing an `action` property that is set to 'getOne', a `collection` property that is set to the database collection name, and a `response` property that is set to the requested database record.

```
websocket.actions.getResource('rooms', '5e9f1c70d84722112da48213');

=> {
  action: "getOne",
  collection: "rooms",
  response: {
    _id: "5e9f1c70d84722112da48213",
    channelType: "rooms",
    name: "Burlington, VT Mountain Bikers",
    userId: "5e9b9e47a15aa8001eaf635a",
    createdAt: "2020-04-21T16:16:48.551Z",
    updatedAt: "2020-04-21T16:16:48.551Z",
    __v: 0,
  }
}
```

#### createResource(collection, data)
`collection` should be a string. `data` should be an object. The data argument can contain any key-value pairs. 

It is up to the frontend developer to ensure data integrity by placing constraints on the arguments that can be passed to this method.

Returns a `JSON` object containing an `action` property that is set to 'create', a `collection` property that is set to the database collection name, and a `response` property that is set to the new database record.

```
websocket.actions.createResource('messages', { userName: 'Sally', text: 'First message!' });

=> {
  action: "create",
  collection: "messages",
  data: {
    userName: "Sally"
    userId: "5e9b9e47a15aa8001eaf635a"
    text: "First message!",
  }
}
```

#### overwriteResource(collection, id, data)
`collection` and `id` should be strings. `data` should be an object containing the key-value pairs to be updated. 

This method will overwrite the existing record with the key-value pairs in the `data` argument. Key-value pairs not included in `data` will be lost.

Returns a `JSON` object containing an `action` property that is set to 'update', a `collection` property that is set to the database collection name, and a `response` property that is set to the overwritten database record.

```
websocket.actions.overwriteResource('messages', '5e9f52b39bda1f125bdcf1a1', { text: '1st comment!' });

=> {
  action: "update",
  collection: "messages",
  response: {
    _id: "5e9f52b39bda1f125bdcf1a1",
    userId: "5e9b9e47a15aa8001eaf635a",
    text: "1st comment!",
    __v: 0,
    updatedAt: "2020-04-21T20:26:00.159Z",
    createdAt: "2020-04-21T20:26:00.159Z",
  }
}
```

#### updateResource(collection, id, data)
`collection` and `id` should be strings. `data` should be an object containing the key-value pairs to be updated.

This method will update the existing record by modifying existing fields and/or adding new ones. Existing key-value pairs not included in the `data` argument will remain in the document.

Returns a `JSON` object containing an `action` property that is set to 'patch', a `collection` property that is set to the database collection name, and a `response` property that is set to the updated database record.

```
websocket.actions.updateResource('messages', '5e9f52b39bda1f125bdcf1a1', { text: '1st message!' });

=> {
  action: "patch",
  collection: "messages",
  response: {
    _id: "5e9f52b39bda1f125bdcf1a1",
    userName: "Sally",
    userId: "5e9b9e47a15aa8001eaf635a",
    text: "1st message!",
    createdAt: "2020-04-21T20:08:19.635Z",
    updatedAt: "2020-04-21T20:17:39.385Z",
    __v: 0,
  }
}
```

#### deleteResource(collection, id)
`collection` and `id` should be strings. `id` is the id of the resource to be deleted.

Returns a `JSON` object containing an `action` property that is set to 'delete', a `collection` property that is set to the database collection name, and a `response` property that is set to the deleted database record.

```
websocket.actions.deleteResource('messages', '5e9f52b39bda1f125bdcf1a1' });

=> {
  action: "delete",
  collection: "messages",
  response: {
    _id: "5e9f52b39bda1f125bdcf1a1",
    userId: "5e9b9e47a15aa8001eaf635a",
    text: "1st comment!",
    __v: 0,
    updatedAt: "2020-04-21T20:26:00.159Z",
    createdAt: "2020-04-21T20:26:00.159Z",
  }
}
```

#### open(message)
`message` should be an object.

Broadcasts the given message as a `JSON` object to all active websocket connections. A `userId` property is added to the message.

```
websocket.actions.open(message);

=> {
  action: "open",
  userId: "5e9b9e47a15aa8001eaf635a"
}
```

#### close(message)
`message` should be an object.

Broadcasts the given message as a `JSON` object to all active websocket connections. A `userId` property is added to the message.

```
websocket.actions.close(message);

=> {
  action: "close",
  userId: "5e9b9e47a15aa8001eaf635a"
}
```

### Websocket Channels
Channels functionality allows you to route websocket messages to the connections that should receive them. For example, a Chat app with different Chat Rooms should only send messages from a room to the websocket connections that are subscribed to that room. It doesn't make sense to send those messages to all active websocket connections.

To implement a basic app with channels functionality, two collection types are needed:

1. `channelCollection` - like chatrooms, chessgames, etc.,
2. `channelMessagesCollection` - like messages, chessmoves, etc.

Channels are referenced by an object with a `channelType` property and a `channelId` property:

1. `channelType` is set to the name of the `channelCollection` collection
2. `channelId` is set to the `_id` of a document in the collection that represents the channel.

Example channel object:
```
{ channelType: "rooms", channelId: "5e9f1c70d84722112da48213" }
```

If you want to store the channels your users have subscribed to and the channel they were last engaged with, create a 'usersInformationCollection' collection (name it whatever you a like) and include a field called `currentChannel` and a field called `channels`.

`currentChannel` takes a channel object. Two examples:

1. If the user is a new user and has not engaged with any channels yet, or if the last channel the user engaged with was deleted and the user's `channels` field is an empty array:

```
channels: { channelType: null, channelId: null },
```

2. The last channel a user engaged with:
```
channels: { channelType: "rooms", channelId: "5e9f1c70d84722112da48213" }
```

`channels` takes an array of channel objects. Example:

```
channels: [
  {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
  {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
],
```

#### createChannel(usersInformationCollection, channelType, name)
`usersInformationCollection`, `channelType`, and `name` should be a string.

This method creates a new channel document.

For this method to work, the `usersInformationCollection` collection must contain a field called `currentChannel` and a field called `channels` as described above.

Example method call:
```
websocket.actions.createChannel('usersmeta', 'rooms', 'Burlington, VT Mountain Bikers');
```

Two different messages are sent:

1. All active websocket connections receive the following message except for the client that called this method:
```
=> {
  action: "createChannel",
  response: {
    _id: "5ea06e249bda1f125bdcf1a3",
    channelType: "rooms",
    name: "Burlington, VT Mountain Bikers",
    userId: "5e9b9e47a15aa8001eaf635a",
    createdAt: "2020-04-22T16:17:40.100Z",
    updatedAt: "2020-04-22T16:17:40.100Z",
    __v: 0,
  },
}
```

2. Only the client that called this method is sent the following response message. Please note that the user's `channels` and `currentChannel` fields have been updated.
```
=> {
  action: "createChannel",
  response: {
    _id: "5ea06e249bda1f125bdcf1a3",
    channelType: "rooms",
    name: "Burlington, VT Mountain Bikers",
    userId: "5e9b9e47a15aa8001eaf635a",
    createdAt: "2020-04-22T16:17:40.100Z",
    updatedAt: "2020-04-22T16:17:40.100Z",
    __v: 0,
  },
  usersChannels: [
    {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"},
    {channelType: "rooms", channelId: "5ea06e249bda1f125bdcf1a3"},
  ],
  usersCurrentChannel: {
    channelType: "rooms",
    channelId: "5ea06e249bda1f125bdcf1a3",
  },
}
```

#### joinUsersChannels(usersInformationCollection)
`usersInformationCollection` should be a string.

This method returns a list of channels the user is subscribed to.

For this method to work, the `usersInformationCollection` collection must contain a field called `channels` as described above.

Example method call:
```
websocket.actions.joinUsersChannels('usersmeta');
```

Only the websocket client that called this method is sent the response message.
```
=> {
  action: "joinUsersChannels",
  usersChannels: [
    {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
    {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
    {channelType: "rooms", channelId: "5e9f1d9d387d701181de03a7"},
    {channelType: "rooms", channelId: "5e9f1dde387d701181de03a8"},
    {channelType: "rooms", channelId: "5e9f1efe9be921119dbfa714"},
    {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"},
  ],
}
```

#### joinChannel(usersInformationCollection, channelType, channelId)
`usersInformationCollection`, `channelType`, and `channelId` should be strings.

This method subscribes a user to the channel referenced by the `channelType` and `channelId` arguments and updates the following fields in the user's `usersInformationCollection` document:

1. `channels`: A new channel object is added to the `channels` field array
2. `currentChannel`: The `currentChannel` field is set to this new channel object.

For this method to work, the `usersInformationCollection` collection must contain a field called `currentChannel` and a field called `channels` as described above.

Example method call:
```
websocket.actions.joinChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');
```

Two different messages are sent:

1. All active websocket connections subscribed to the channel defined by the `channelType` and `channelId` in the message body receive the following message except for the client that called this method:
```
=> {
  action: "joinChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1e5c387d701181de03a9",
}
```

2. Only the client that called this method is sent the following response message. Please note that the user's `channels` and `currentChannel` fields have been updated.
```
websocket.actions.joinChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');

=> {
  action: "joinChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1e5c387d701181de03a9",
  response: {
    _id: "5e9b9e47a15aa8001eaf635b",
    username: "Sally",
    userId: "5e9b9e47a15aa8001eaf635a",
    usersChannels: [
      {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
      {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
      {channelType: "rooms", channelId: "5e9f1d9d387d701181de03a7"},
      {channelType: "rooms", channelId: "5e9f1dde387d701181de03a8"},
      {channelType: "rooms", channelId: "5e9f1efe9be921119dbfa714"},
      {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"},
    ],
    currentChannel: {channelType: "rooms", channelId: "5e9f1e5c387d701181de03a9"},
    broadcast: false,
    createdAt: "2020-04-19T00:41:43.446Z",
    updatedAt: "2020-04-21T20:33:36.131Z",
    __v: 0,
  }
}
```

#### leaveChannel(usersInformationCollection, channelType, channelId)
`usersInformationCollection`, `channelType`, and `channelId` should be strings.

This method unsubscribes a user from the channel referenced by the `channelType` and `channelId` arguments and updates the following fields in the user's `usersInformationCollection` document:

1. `channels`: The object in the `channels` field array that contains the `channelType` and `channelId` is deleted
2. `currentChannel`: The `currentChannel` field is set to the first channel in the the user's `channels` field array if the array  isn't empty (e.g. `{ channelType: "rooms", channelId: "5e9f1c70d84722112da48213" }`), otherwise it is set to no channel (e.g. `{ channelType: null, channelId: null }`). 

For this method to work, the `usersInformationCollection` collection must contain a field called `currentChannel` and a field called `channels` as described above.

Example method call:
```
websocket.actions.leaveChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');
```

Two different messages are sent:

1. All active websocket connections subscribed to the channel defined by the `channelType` and `channelId` in the message body receive the following message except for the client that called this method:

```
websocket.actions.leaveChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');

=> {
  action: "leaveChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1e5c387d701181de03a9",
}
```

2. Only the client that called this method is sent the following response message. Please note that the user's `channels` and `currentChannel` fields have been upated.

```
websocket.actions.leaveChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');

=> {
  action: "leaveChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1e5c387d701181de03a9",
  response: {
    _id: "5e9b9e47a15aa8001eaf635b",
    username: "Sally",
    userId: "5e9b9e47a15aa8001eaf635a",
    channels: [
      {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"}
      {channelType: "rooms", channelId: "5e9f1d9d387d701181de03a7"}
      {channelType: "rooms", channelId: "5e9f1dde387d701181de03a8"}
      {channelType: "rooms", channelId: "5e9f1efe9be921119dbfa714"}
      {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"}
    ],
    currentChannel: {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
    broadcast: false,
    createdAt: "2020-04-19T00:41:43.446Z",
    updatedAt: "2020-04-21T20:37:33.331Z",
    __v: 0,
  },
}
```

#### changeChannel(usersInformationCollection, channelType, channelId)
`usersInformationCollection`, `channelType`, and `channelId` should be strings.

This method changes the user's current channel to the channel referenced by the `channelType` and `channelId` arguments by updating the `currentChannel` field in the user's `usersInformationCollection` document.

For this method to work, the `usersInformationCollection` collection must contain a field called `currentChannel` and a field called `channels` as described above.

Example method call:
```
websocket.actions.changeChannel('usersmeta', 'rooms', '5e9f1e5c387d701181de03a9');
```

Only the client that called this method is sent the following response message. Please note that the user's `currentChannel` field has been updated.
```
=> {
  action: "changeChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1efe9be921119dbfa714",
  response: {
    _id: "5e9b9e47a15aa8001eaf635b",
    username: "Sally",
    userId: "5e9b9e47a15aa8001eaf635a",
    channels: [
      {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
      {channelType: "rooms", channelId: "5e9f1d9d387d701181de03a7"},
      {channelType: "rooms", channelId: "5e9f1dde387d701181de03a8"},
      {channelType: "rooms", channelId: "5e9f1efe9be921119dbfa714"},
      {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"},
    ],
    currentChannel: {channelType: "rooms", channelId: "5e9f1efe9be921119dbfa714"},
    broadcast: false,
    createdAt: "2020-04-19T00:41:43.446Z",
    updatedAt: "2020-04-21T20:40:06.384Z",
    __v: 0,
  },
}
```

#### deleteChannel(usersInformationCollection, channelMessagesCollection, channelType, channelId)
`usersInformationCollection`, `channelMessagesCollection`, `channelType`, and `channelId` should be strings.

This method deletes the channel referenced by the `channelType` and `channelId` arguments:
- The message documents associated with the channel are deleted from the `channelMessagesCollection` collection
- The channel document is deleted from the `channelType` collection

The `currentChannel` and `channels` fields are then updated in the `usersInformationCollection` document for each user that is subscribed to the channel.

The channel referenced by the `channelType` and `channelId` arguments is deleted from the `channels` array.

The `currentChannel` field is set to the first channel in the the user's `channels` field array if the array isn't empty (e.g. `{ channelType: "rooms", channelId: "5e9f1c70d84722112da48213" }`), otherwise it is set to no channel (e.g. `{ channelType: null, channelId: null }`).

Each active websocket connection that was subscribed to the deleted channel is sent a message with updated `channels` and `currentChannel` values for that user.

For this method to work, the `usersInformationCollection` collection must contain a field called `currentChannel` and a field called `channels` as described above.

```
websocket.actions.deleteChannel('usersmeta', 'rooms', '5e9f1efe9be921119dbfa714');

=> {
  action: "deleteChannel",
  userId: "5e9b9e47a15aa8001eaf635a",
  channelType: "rooms",
  channelId: "5e9f1efe9be921119dbfa714",
  response: {
    _id: "5e9b9e47a15aa8001eaf635b",
    username: "Sally",
    userId: "5e9b9e47a15aa8001eaf635a",
    channels: [
      {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
      {channelType: "rooms", channelId: "5e9f1d9d387d701181de03a7"},
      {channelType: "rooms", channelId: "5e9f1dde387d701181de03a8"},
      {channelType: "rooms", channelId: "5e9f1f749be921119dbfa716"},
    ],
    currentChannel: {channelType: "rooms", channelId: "5e9f1c70d84722112da48213"},
    broadcast: false,
    createdAt: "2020-04-19T00:41:43.446Z",
    updatedAt: "2020-04-21T20:42:08.111Z",
    __v: 0,
  },
}
```

### Websocket & HTTP Responses
When you make HTTP requests by calling the methods on the `db` object of the SDK (see the list below), the response from the database interaction is broadcast to active websocket connections.

If the response contains a `channelType` and `channelId` property, the message is only broadcast to active websocket connections who are subscribed to that channel.

If the response does not contain a `channelType` and `channelId` property, the message is broadcast to all active websocket connections.

If you don't want the response broadcast to any websocket connections, include a property in the document called `broadcast` and set it to `false`. It is recommended that you do this on your `usersInformationCollection` collection.

Methods that will broadcast the response from interacting with the database:

- `db.createResource(collection, data)`
- `db.updateResource(collection, id, data)`
- `db.overwriteResource(collection, id, data)`
- `db.deleteResource(collection, id)`
