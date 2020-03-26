import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Profile() {
    const [incidents, setIncidents] =useState([]);
    const ong_name = localStorage.getItem('ong_name');
    const ong_id = localStorage.getItem('ong_id');
    const history = useHistory;
    useEffect(()=>{
        api.get('profile',{
            headers: {
                Authorization: ong_id
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ong_id]);

    async function handleDeleteIncident(inc_id){
        try{
            await api.delete(`incidents/${inc_id}`,{
                    headers: {
                        Authorization: ong_id
                    }
            });

            setIncidents (incidents.filter(incident => incident.inc_id !== inc_id));

        }catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogOut(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo: {ong_name} </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogOut} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                { incidents.map(incident => (
                    <li key={incident.inc_id}>
                        <strong>CASO:</strong>
                        <p>{incident.inc_title}</p>
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.inc_description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR' , {style: 'currency' , currency: 'BRL' }).format(incident.inc_value) }</p>
                        <button onClick={() => handleDeleteIncident(incident.inc_id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>  
                    </li>
                ))}

            </ul>
        </div>
    );
}