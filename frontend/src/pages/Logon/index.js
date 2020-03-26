import React , { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api'


export default function Logon(){
    const [ong_id,setOng_id] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions',{ong_id})

            localStorage.setItem('ong_id',ong_id);
            localStorage.setItem('ong_name',response.data.ong_name);
            history.push('/profile');
          
        }catch (err) {
            alert('Falha no login tente novamente');
        }
    }


    return(
        <div className="Logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>
                <form onSubmit={handleLogin} >
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID" 
                        value={ong_id}
                        onChange={e=>setOng_id(e.target.value)}
                    />
                    <button className="button" type="submit" >Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                    
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
        
    );
}