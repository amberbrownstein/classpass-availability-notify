import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function updateOpenClasses(dbFileName, newClassList) {
    let newClasses;

    try {
        const db = await openDataBase(dbFileName);
        await deleteUnavailableClasses(db, newClassList);
        newClasses = await addNewClasses(db, newClassList);

        const updatedTable = await db.exec('SELECT * FROM OpenClasses');
        console.print(updatedTable.toString());
    } finally {
        await closeDatabase(db);
    }

    return newClasses;
}

async function openDatabase(fileName) {
    // open the database
    const db = await open({
        filename: fileName,
        driver: sqlite3.Database
    })

    return db;
}

async function closeDatabase(db) {
    await db.close();
}

async function deleteUnavailableClasses(db, newClassList) {
    await db.exec(`DELETE FROM OpenClasses WHERE ClassID NOT IN (${newClassList.keys.join(', ')});`);
}

async function addNewClasses(db, newClassList) {
    const oldClassList = await db.exec(`SELECT ClassID FROM OpenClasses`);
    const classesToAdd = newClassList.reduce((newClass) => !oldClassList.includes(newClass.id));
    await db.exec(`INSERT INTO OpenClasses VALUES (${classesToAdd.join(', ')});`);
    return classesToAdd;
}
async function createTable(db, tableName, columns) {
    await db.exec(`CREATE TABLE ${tableName} (\n${columns.join(`,\n`)}\nPRIMARY KEY (${columns[0].split(' ')[0]}));`);
}

function createNewDatabase(fileName) {
    new sqlite3.Database(fileName);
}

const db = await openDatabase('./openClasses.db')


const columns = {
    ClassID: 'INT',
    StartTime: 'DATETIME',
    Teacher: 'VARCHAR(255)',
    Credits: 'INT',
    Location: 'VARCHAR(255)'
};