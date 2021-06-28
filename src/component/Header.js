import React from 'react'
import { View, Text, Image, TouchableOpacity,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import colors from '../constants/colors';

export default function Header({headerText, showBackBtn}) {

    const navigation = useNavigation()
    const theme = colors
    return (
        <View style={{flexDirection: 'row', backgroundColor: theme.WHITE, paddingHorizontal: 15, alignItems: 'center', paddingVertical: 8, marginBottom: 10}}>
            {
                showBackBtn && 
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome
                    name={'arrow-left'}
                    size={20}
                    color={theme.TEXT_PRIMARY}
                    />
                </TouchableOpacity>
            }
            <View style={{marginLeft: showBackBtn ? 10 : 5}}>
                <Text style={{fontSize: showBackBtn ? 22 : 25, fontWeight: 'bold', color: theme.TEXT_PRIMARY}}>{headerText}</Text>
            </View>
        </View>
    )
}
