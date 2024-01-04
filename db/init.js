db = db.getSiblingDB('todolistDB');
db.createUser({
    user: 'jozwiaka',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'todolistDB' }]
});
