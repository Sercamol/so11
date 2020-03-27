import React from 'react';
import { View, Text, TouchableOpacity, Image ,Linking} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation ,  useRoute} from '@react-navigation/native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.ong_name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.inc_title}" com o valor de ${Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(incident.inc_value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Heroi do caso : ${incident.inc_title}`,
            recipients: [incident.ong_email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.inc_whatsapp}&text=${message}`);
    }

    return(
       <View  style={styles.container}> 
            <View style={styles.header} >
                <Image source={logoImg} />
                
                <TouchableOpacity onPress ={navigateBack}>
                    <Feather name='arrow-left' size={28} color='#e02041' />
                </TouchableOpacity>
           </View>

           <View>
                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, {marginTop: 0 }]} >ONG:</Text>
                    <Text style={styles.incidentValue} >{incident.ong_name} de {incident.ong_city}/{incident.ong_uf}</Text>

                    <Text style={styles.incidentProperty} >CASO:</Text>
                    <Text style={styles.incidentValue} >{incident.inc_description}</Text>

                    <Text style={styles.incidentProperty} >VALOR:</Text>
                    <Text style={styles.incidentValue} >{Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(incident.inc_value)}</Text>
                     
                        
                </View>
                <View  style={styles.contactBox} > 
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>  
                    <Text style={styles.herodescription}>Entre em contato</Text>

                    <View style={styles.actions} >
                        <TouchableOpacity style={styles.action}  onPress ={sendWhatsapp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action}  onPress ={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           </View>
       </View>

    );
}