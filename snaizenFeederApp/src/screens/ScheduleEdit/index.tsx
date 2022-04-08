import React from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { GestureHandlerRootView, RectButton, ScrollView } from "react-native-gesture-handler";
import { Header } from "../../components/Header";
import { MediumInput } from "../../components/MediumInputt";
import { ScheduleProps } from "../../components/Schedule";
import { SmallInput } from "../../components/SmallInput";
import { useSchedules } from "../../hooks/schedules";

import { styles } from "./styles";
type Props = {
    route: {
        params: {
            id? : string;
        }
    }
}

export function ScheduleEdit({route:{params:{id}}}: Props){
    const {schedules} = useSchedules();
    const schedule =schedules.data.find(item =>{return item.id === id}) as ScheduleProps;    
    const [hour,minutes] = schedule.hour.split(':')
    const weight = schedule.weight;

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ?  'padding' : 'height'}
        >
            <ScrollView>
                <Header
                    title="Modificar o horario"
                />
                <View style={styles.container}>
                    <View style={styles.field}>
                        <View>
                            <Text style={styles.label}>
                                Hora e minuto
                            </Text>

                            <View style={styles.column}>
                                <SmallInput maxLength={2} value={hour}/>
                                <Text style={styles.divider}>
                                    :
                                </Text>
                                <SmallInput maxLength={2} value={minutes}/>
                            </View>
                        </View>

                        <View style={{alignItems: "center"}}>
                            <Text style={styles.label}>
                                Peso
                            </Text>

                            <View style={styles.column}>
                                <MediumInput maxLength={2} value={weight}/>
                            </View>
                        </View>
                    </View>
                    <GestureHandlerRootView>
                        <RectButton 
                            style={styles.confirmButton}
                        >
                            <Text style={styles.confirmText}>Confirmar</Text>
                        </RectButton>
                    </GestureHandlerRootView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}