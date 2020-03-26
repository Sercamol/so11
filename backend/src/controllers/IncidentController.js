const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents =  await connection('incidents')
        .join('ongs' , 'ongs.ong_id', "=" , 'incidents.inc_ong_id')
        .limit(5)
        .offset((page-1) * 5)
        .select('incidents.*','ongs.*');
       response.header('X-Total-Count' , count['count(*)']);
        return response.json(incidents); 
    },

    async create (request,response){
        const { inc_title, inc_description, inc_value } = request.body;
        const inc_ong_id  = request.headers.authorization;
    
        const [inc_id] = await connection('incidents').insert({
            inc_title,
            inc_description,
            inc_value,
            inc_ong_id,
        })
        return response.json({inc_id});
    },

    async delete( request,response){
        const {inc_id} = request.params;
        const inc_ong_id  = request.headers.authorization;
        const incident = await connection('incidents').where('inc_id',inc_id).select('inc_ong_id').first();
        if (incident.inc_ong_id !== inc_ong_id)
        {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection('incidents').where('inc_id',inc_id).delete();
        response.status(204).send();
    }
}