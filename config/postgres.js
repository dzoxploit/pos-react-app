const pgp = require('pg-promise')(/* initialization options */);

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'myDatabase',
    user: 'myUser',
    password: 'myPassword'
};
