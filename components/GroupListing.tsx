import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GroupListProp } from "@/constant/types/types";
import Colors from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";

const GroupListing = ({ listing }: { listing: GroupListProp[] }) => {
  const renderItem = ({ item }: { item: GroupListProp }) => (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.itemtext}>{item.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="star" size={20} color={Colors.primaryColor} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginLeft: 5,
              color: Colors.black,
            }}
          >
            {item.rating}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#999",
              paddingLeft: 2,
            }}
          >
            ({item.reviews})
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ marginVertical: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
        }}
      >
        Top Travel Groups
      </Text>
      <FlatList
        data={listing}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default GroupListing;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
    flexDirection: "row",
    alignItems: "center",
  },
  itemtext: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.black,
  },
});
