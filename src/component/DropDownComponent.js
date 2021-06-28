import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from "react-native";
import color from '../constants/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default function DropDownComponent({ dropDownWidth, customStyle, isCustomStyle, onChangeValue, placeholderTxt, textSize, upperContainerHeight, open, value, items, setOpen, setItems, setValue, otherPops}) {

    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    // ]);
    // useEffect(() => {
    //     setItems(listItems)
    //   }, []); 
    return (
        <View style={{marginHorizontal: 10}}>
          <DropDownPicker
            // {...otherPops}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={onChangeValue}
            closeAfterSelecting={true}
            placeholder={placeholderTxt}
            ArrowUpIconComponent={({style}) => <Image
            source={require("../assets/arrow-orange-up.png")}
            style={{ height: textSize + 10 , width: textSize + 10 , marginHorizontal: 5, tintColor: color.THEME_ORANGE }}
            resizeMode="contain"
          />}
            ArrowDownIconComponent={({style}) => <Image
            source={require("../assets/arrow-orange-down.png")}
            style={{ height: textSize + 10 , width: textSize + 10 , marginHorizontal: 5, tintColor: color.THEME_ORANGE }}
            resizeMode="contain"
          />}
            TickIconComponent={({style}) =><Icon
            name={'radiobox-marked'}
            size={20}
            color={color.THEME_ORANGE}
            />}
            placeholderStyle={{
              color: color.TEXT_SECONDARY,
              fontSize: textSize
            }}
            dropDownContainerStyle={{
              backgroundColor: color.BACKGROUND,
              marginTop: 10,
              borderRadius: 0,
              borderWidth: 0.5,
              borderColor: color.BORDER,
              elevation: 7
            }}
            selectedItemLabelStyle={{
                fontSize: textSize
            }}
            listItemLabelStyle={{
                fontSize: textSize
            }}
            textStyle={{
                fontSize: textSize,
                color: color.TEXT_PRIMARY
            }}
            style={isCustomStyle ? customStyle : {
              backgroundColor: color.BACKGROUND,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: color.BORDER,
              elevation: 7,
              height: upperContainerHeight 
              
            }}
            containerStyle={{
              width: dropDownWidth ,
            }}
          />
      </View>
    )
}