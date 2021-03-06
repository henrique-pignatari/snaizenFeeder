import React, { 
    useState, 
    useCallback, 
} from "react";

import { 
    View, 
    Text, 
    FlatList, 
} from "react-native";

import { 
    BorderlessButton, 
    GestureHandlerRootView 
} from "react-native-gesture-handler";

import { Avatar } from "../../components/Avatar";
import { Loading } from "../../components/Loading";
import { Schedule } from "../../components/Schedule";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Background } from "../../components/Background";
import { ListHeader } from "../../components/ListHeader";
import { ListDivider } from "../../components/ListDivider";


import { useDevice } from "../../hooks/device";
import { useSchedules } from "../../hooks/schedules";
import { useFocusEffect } from "@react-navigation/native";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";

type Props = {
    navigation: {
        navigate: Function
    };
}

export function Home({navigation: {navigate}}: Props){
    const {schedules,deleteSchedule,loadSchedules} = useSchedules();
    const {isConnected} = useDevice();

    function handleScheduleCreate(){
        navigate("ScheduleCreate");
    };

    function handleScheduleEdit(id: string){
        navigate("ScheduleEdit",{id: id})
    };
    
    function handleScheduleDelete(id : string){
       deleteSchedule(id);
    }    

    const {on, primary} = theme.colors;
    const [loading,setLoading] = useState(true);

    function handleConnection(){
        navigate("ConnectionScreen")
    }

    useFocusEffect(useCallback(()=>{
        loadSchedules();
        setLoading(false);
    },[]))

    return(
        <Background>
            <View style={styles.header}>
                <Avatar urlImage="https://github.com/henrique-pignatari.png"/>
                <GestureHandlerRootView>
                    <BorderlessButton onPress={handleConnection}>
                        <Text style={[styles.status, {color: isConnected? on : primary }]}>
                            {
                                console.log(new Blob([JSON.stringify(schedules)]).size)
                            }
                            {
                                console.log(JSON.stringify(schedules))
                            }
                            {
                                isConnected? "Conectado" : "Desconectado"
                            }
                        </Text>    
                    </BorderlessButton>
                </GestureHandlerRootView>
                <ButtonAdd onPress={handleScheduleCreate}/>
            </View>

            {
                loading ?
                <Loading/>
                :
                <>
                    <ListHeader title="Horarios agendados" subtitle={`Total ${schedules.data.length}`}/>
                    <FlatList
                        data={schedules.data}
                        keyExtractor={item => item.id}
                        renderItem={({item})=> (
                            <Schedule
                                handlers={{handleScheduleEdit,handleScheduleDelete}}
                                data={item}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        style={styles.schedules}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>
    )
}