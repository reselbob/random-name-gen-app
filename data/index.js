const {getConnection} = require('./connection');
const {Person} = require('./schemas');

const setPerson = async (objPerson) => {
    // const url = getConnectionUrlSync();
    const conn = await getConnection()
    console.log({message: `Setting person at ${new Date()}`});
    const person = new Person();
    person.firstName = objPerson.firstName;
    person.lastName = objPerson.lastName;
    await person.save();
    console.log({message: `Set person at ${new Date()}`});
    await conn.connections[0].disconnect();
};

const getPersons = async () => {
    const conn = await getConnection()
    console.log({message: `Getting Persons ${new Date}`});
    const items = await Person.find({}).lean({virtuals: true});
    console.log({message: `Got Persons ${JSON.stringify(items)} at ${new Date()}`});
    await conn.connections[0].disconnect();
    return items;
};

const getPerson = async (id) => {
    const conn = await getConnection()
    console.log(`Getting Person by id: ${id}`);
    const item = Person.findById(id).lean({virtuals: true});
    console.log(`Got User by id: ${id} ${JSON.stringify(item)} at ${new Date()}`);
    return item;
};

module.exports = {setPerson, getPersons, getPerson}