import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Text, View, Image } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

let images = [];

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  /* background-color: #00a8ff; */
`;
const Card = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 300px;
  height: 450px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
  margin-top: 80px;
`;

const CardContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [data, setData] = useState();

  const getNFTMetaDatas = async () => {
    const url =
      "https://port-0-swf-account-gen-server-ac2nlkqytzhi.sel4.cloudtype.app/getNftMetadata/accountAddress/nftContractAddress";
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      // for (let i = 0; i < responseData.length; i++) {
      //   console.log("responseData", responseData[i].image);
      // }
      images = responseData.map(
        (item) => "https://ipfs.io/ipfs/" + item.image.substring(7)
      );
      console.log("images", images);
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNFTMetaDatas();
  }, []);

  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;

  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });
  // Animations
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restDisplacementThreshold: 100,
    restSpeedThreshold: 100,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        console.log(dx);
        position.setValue(dx);
      },
      onPanResponderGrant: () => onPressIn.start(),
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -250) {
          goLeft.start(onDismiss);
        } else if (dx > 250) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  // State
  const [index, setIndex] = useState(0);
  const onDismiss = () => {
    scale.setValue(1);
    setIndex((prev) => (prev + 1) % images.length); // 이미지 배열의 길이를 이용해서 인덱스를 업데이트합니다.
    position.setValue(0);
    // scale.setValue(1);
    // setIndex((prev) => prev + 1);
    // position.setValue(0);
    // Animated.timing(position, { toValue: 0, useNativeDriver: true }).start();
  };
  const closePress = () => {
    goLeft.start(onDismiss);
  };
  const checkPress = () => {
    goRight.start(onDismiss);
  };
  return (
    <Container>
      <CardContainer>
        <Card style={{ transform: [{ scale: secondScale }] }}>
          <Image
            source={{ uri: images[(index + 1) % images.length] }}
            style={{ width: 350, height: 500 }}
          />
        </Card>
        <Card
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { translateX: position },
              { rotateZ: rotation },
            ],
          }}
        >
          <Image
            source={{ uri: images[index] }}
            style={{ width: 350, height: 500 }}
          />
        </Card>
      </CardContainer>
      <BtnContainer>
        <Btn onPress={closePress}>
          <Ionicons name="close-circle" color="white" size={58} />
        </Btn>
        <Btn onPress={checkPress}>
          <Ionicons name="checkmark-circle" color="white" size={58} />
        </Btn>
      </BtnContainer>
    </Container>
  );
}
