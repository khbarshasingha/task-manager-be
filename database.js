import {MongoClient} from 'mongodb'

const url='';
const client = new MongoClient(url)

export async function connectToDatabase(){
    try{
        await client.connect();
        console.log('Connected succesfully to MOngodb');

        return client.db('database-name')
    }
    catch(err){
        console.error('Mongo db connection error : ',err)
        throw err;
    }
}


export async function closeDatabaseConnection(){
    await client.close()
}