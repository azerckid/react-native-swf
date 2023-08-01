import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/FontAwesome";

const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #007bff;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  align-self: center;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const AddressTitle = styled.Text`
  margin-top: 20px;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const KeyTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
  margin-top: 20px;
`;

const KeyText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: red;
`;

const Address = () => {
  const [data, setData] = useState(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);

  const handleGenerateKeys = async () => {
    const url =
      "https://port-0-swf-account-gen-server-ac2nlkqytzhi.sel4.cloudtype.app/generateKeys";
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      console.log("responseData", responseData);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Btn onPress={handleGenerateKeys}>
        <Title>Generate Keys</Title>
      </Btn>
      {data && (
        <View style={{ alignItems: "center" }}>
          <AddressTitle>ADDRESS</AddressTitle>
          <Text>{JSON.stringify(data.address)}</Text>
          <QRCode value={JSON.stringify(data.address)} size={200} />
          <KeyTitle>
            <KeyText>PRIVATE KEY</KeyText>
            <TouchableOpacity onPress={toggleKeyVisibility}>
              <Icon name="eye" size={20} color="red" />
            </TouchableOpacity>
          </KeyTitle>
          {isKeyVisible && <Text>{JSON.stringify(data.privateKey)}</Text>}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Address;
