const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const inc_ong_id = request.headers.authorization;
        const incidents =  await connection('incidents').select('*').where('inc_ong_id',inc_ong_id);
       
        return response.json(incidents); 
    }

}