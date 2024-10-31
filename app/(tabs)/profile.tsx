import { View, Text, Image, Switch } from "react-native";
import React, { useState } from "react";
import Icon from "@/constants/Icon";


export default function Profile() {
   const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View className="mx-5">
  
      <Text className="text-[24px] font-semibold mt-12 " >Profile</Text>
      <View className="flex flex-row items-center gap-4 mt-4">
        <Image source={require('../../assets/images/profil.png')} className=" w-[80px] h-[72px]" />
        <View>

        <Text className="text-[16px] font-semibold">Fajar B</Text>
        <Text className="text-[14px] text-neutral-200">fajar12@gmail.com</Text>
        </View>
      <View>
      
      </View>
    </View>
    <View className=" bg-neutral-50 px-6 py-2 mt-8 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Notifikasi
       </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
    </View>
     <View className=" bg-neutral-50 px-6 py-5 mt-4 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Language
       </Text>
        <Icon name="left"/>
    </View>
    <View className=" bg-neutral-50 px-6 py-5 mt-4 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Change Pasword
       </Text>
        <Icon name="left"/>
    </View>
    <View className=" bg-neutral-50 px-6 py-5 mt-4 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Privacy
       </Text>
        <Icon name="left"/>
    </View>
    <View className=" bg-neutral-50 px-6 py-5 mt-4 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Terms & Conditions
       </Text>
        <Icon name="left"/>
    </View>
    <View className=" bg-neutral-50 px-6 py-5 mt-4 flex flex-row justify-between items-center rounded-[12px]">
       <Text className="text-base font-semibold text-neutral-300">
         Sign Out
       </Text>
        <Icon name="left"/>
    </View>
    </View>  
  
    
  );
}
