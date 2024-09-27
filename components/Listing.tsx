import {
  StyleSheet,
  Text,
  View,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";

type Props = {
  listing: ListItemProp[];
  category: string;
};

export type ListItemProp = {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: number;
  duration: number;
  category: string;
  location: string;
};

const Listing = ({ listing, category }: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const ListItemsData: ListRenderItem<ListItemProp> = ({ item }) => (
    <Link href={`/listings/${item.id}` as Href<string>} asChild>
      <TouchableOpacity>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
          <View style={styles.bookmark}>
            <Ionicons name="bookmark-outline" size={20} color={Colors.white} />
          </View>
          <Text style={styles.itemtext} ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.cardLocation}>
              <Ionicons name="location" size={20} color={Colors.primaryColor} />
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: 2,
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {item.location}
              </Text>
            </View>
            <Text style={{ color: Colors.primaryColor }}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [] : listing}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ListItemsData}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Listing;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 30,
  },
  bookmark: {
    position: "absolute",
    right: 30,
    top: 185,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemtext: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
});
