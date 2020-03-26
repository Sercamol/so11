import React ,{ useState }from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft} from 'react-icons/fi';

import './styles.css'
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident(){

    const[inc_title, setInc_title] = useState('');
    const[inc_description  , setInc_description] = useState('');
    const[inc_value, setInc_value] = useState('');

    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        
        const data = {
            inc_title,
            inc_description,
            inc_value,
        };
        
        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ong_id,
                }
            })

            history.push('/profile');
            
        }
        catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }
    return(
        <div className="new-incident-container">

           <div className="content">
               <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041"/>
                            Voltar para home
                    </Link>
               </section>
               <form onSubmit={handleNewIncident} >
                <input 
                    placeholder="Titulo do caso"
                    value={inc_title}
                    onChange = {e => setInc_title(e.target.value)} 
                />
                 <textarea 
                    placeholder="Descrição"   
                    value={inc_description}
                    onChange = {e => setInc_description(e.target.value)}
                />
                 <input 
                    placeholder="Valor em reais"
                    value={inc_value}
                    onChange = {e => setInc_value(e.target.value)}
                />
                 <button className="button" type="submit" >Cadastrar</button>
               </form>
           </div>
       </div>
    );
}