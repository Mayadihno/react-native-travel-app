import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Colors from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import CategoriesButtons from "@/components/CategoriesButtons";
import Listing from "@/components/Listing";
import listing from "@/constant/destinations.json";
import GroupListing from "@/components/GroupListing";
import groupData from "@/constant/listing.json";

const Page = () => {
  const headerHeight = useHeaderHeight();
  const [category, setCategory] = useState("All");

  const onCategoryChange = (category: string) => {
    setCategory(category);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 20 }}>
              <Image
                source={{
                  uri: "https://picsum.photos/200/300",
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowRadius: 3,
                shadowOpacity: 0.3,
                shadowOffset: {
                  width: 2,
                  height: 4,
                },
              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headerText}>Explore the beautiful world!</Text>
          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBar}>
              <Ionicons size={20} name="search" style={{ paddingRight: 20 }} />
              <TextInput placeholder="Search..." />
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: Colors.primaryColor,
                padding: 10,
                borderRadius: 10,
                shadowColor: "#171717",
                shadowRadius: 3,
                shadowOpacity: 0.3,
                shadowOffset: {
                  width: 2,
                  height: 4,
                },
              }}
            >
              <Ionicons name="options" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <CategoriesButtons onCategoryChange={onCategoryChange} />
          <Listing listing={listing} category={category} />
          <GroupListing listing={groupData} />
        </ScrollView>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerText: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 5,
    textAlign: "center",
  },
  searchSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#171717",
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    flex: 1,
  },
});
