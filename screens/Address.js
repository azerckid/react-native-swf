import React, { useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #007bff;
  padding: 20px;
  border-radius: 5px;
  /* Adjust width and height here */
  width: 50%;
  height: 200%;
  /* Center the button horizontally and vertically */
  align-self: center;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Address = () => {
  const [data, setData] = useState(null);

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

  return (
    <View>
      <Btn onPress={handleGenerateKeys}>
        <Title>Generate Keys</Title>
      </Btn>
      {data && (
        <View>
          <Text>ADDRESS</Text>
          <Text>{JSON.stringify(data.address)}</Text>
          <Text>PRIVATE KEY</Text>
          <Text>{JSON.stringify(data.privateKey)}</Text>
        </View>
      )}
    </View>
  );
};

export default Address;
