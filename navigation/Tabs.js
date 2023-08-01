import React from "react";
import { Text, View, useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Address from "../screens/Address";
import NFT from "../screens/NFT";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Address"
        component={Address}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name={"film-outline"} color={color} size={size} />
            <FontAwesome name="address-card-o" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="NFT"
        component={NFT}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="tv-outline" color={color} size={size} />
            <MaterialCommunityIcons
              name="certificate-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"search-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
