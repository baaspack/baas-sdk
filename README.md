
# Backpack SDK Documentation

## Installing the SDK

...
## SDK Methods


### Authentication:

For security purposes, the Users collection that contains the email and password for each user is not accessible from the API. 

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
`collectionName` should be a string. Creates a new collection in the database. Returns the name of the collection. The new collection will not actually be created and it will not appear in the list of collections until a record is added to it.

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
`collection` should be a string. `data` should be an object. The data argument can contain any key-value pairs. It is up to the frontend developer to ensure data integrity by placing constraints on the arguments that can be passed to this method.

```
sdk.db.createResource('messages', {})
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "I am a message!",
    "createdAt": "2020-04-21T17:39:12.829Z",
    "updatedAt": "2020-04-21T17:39:12.829Z",
    "__v": 0
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
```
  

#### overwriteResource(collection, id, data)
`collection` and `id` should be strings. `data` should be an object containing the key-value pairs to be updated. This method will overwrite the existing record with the key-value pairs in the `data` argument. Key-value pairs not included in `data` will be lost.

```
sdk.db.updateResource('messages', '5e9f2fc00fb8899611d642a4', {"text": "updated message"})
=> {
    "_id": "5e9f2fc00fb8899611d642a4",
    "text": "updated message",
    "__v": 0,
    "updatedAt": "2020-04-21T18:08:35.297Z",
    "createdAt": "2020-04-21T18:08:35.297Z"
}
```

  
### File storage:

#### getFile(userId, filename)
Returns file from `current_user_id/filename` in the body of the response. `filename` should be a string. 

Can be accessed by calling `.blob()` on the response body, creating a url by calling `URL.createObjectURL()` on the blob file, and using the return value as the value for the `src` attribute in the html. See MDN

```
sdk.storage.getFile()
```

#### getListOfUserFiles(userId)
`userId` should be a string. Returns a JSON object containing an array of metadata records for the files associated with a user.

```
sdk.storage.getListOfUserFiles('5e876354eb2b13001ea7097a')

=>  [
{      
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
