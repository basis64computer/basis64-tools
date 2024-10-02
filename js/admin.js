let defaultPassword = "bjLm2JP6YvPiejE4Z6Z+5sX+P2qIEqv9YIZ3fuF15Zw=";

let userCount;
let pages;

async function initializeDatabase() {
    var response = await fetch(databaseURL);
    var jsonResponse = await response.json();
    record = await jsonResponse.record;
    userCount = await record.users;
    pages = await record.pages;
    database = await record.database;
}
