import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import listing from "@/constant/destinations.json";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constant/Colors";
import Animated, {
  interpolate,
  SlideInDown,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const Height = 300;
const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const listData = listing.find((item) => item.id === id);
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-Height, 0, Height],
            [Height / 2, 0, -Height * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-Height, 0, Height],
            [2, 1, 1]
          ),
        },
      ],
    };
  });
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: " rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Feather name="arrow-left" size={22} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: " rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="bookmark-outline" size={22} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <Animated.Image
            source={{ uri: listData?.image }}
            style={[styles.image, imageAnimatedStyle]}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listData?.name}</Text>
            <View style={styles.listingLocationWrapper}>
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                color={Colors.primaryColor}
              />
              <Text style={styles.listingLocationText}>
                {listData?.location}
              </Text>
            </View>
            <View style={styles.listDataFooter}>
              <View style={styles.listDataContent}>
                <View style={styles.listIcon}>
                  <Ionicons name="time" size={20} color={Colors.primaryColor} />
                </View>
                <View style={styles.listDataObj}>
                  <Text
                    style={{ fontSize: 18, color: "#999", fontWeight: "300" }}
                  >
                    Duration
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: "600" }}>
                    {listData?.duration} Days
                  </Text>
                </View>
              </View>
              <View style={styles.listDataContent}>
                <View style={styles.listIcon}>
                  <FontAwesome5
                    name="users"
                    size={20}
                    color={Colors.primaryColor}
                  />
                </View>
                <View style={styles.listDataObj}>
                  <Text
                    style={{ fontSize: 18, color: "#999", fontWeight: "300" }}
                  >
                    Person
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: "600" }}>
                    {listData?.rating}
                  </Text>
                </View>
              </View>
              <View style={styles.listDataContent}>
                <View style={styles.listIcon}>
                  <Ionicons name="star" size={20} color={Colors.primaryColor} />
                </View>
                <View style={styles.listDataObj}>
                  <Text
                    style={{ fontSize: 18, color: "#999", fontWeight: "300" }}
                  >
                    Rating
                  </Text>
                  <Text style={{ fontSize: 24, fontWeight: "600" }}>
                    {listData?.rating}
                  </Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                fontSize: 20,
                paddingTop: 10,
                lineHeight: 25,
                letterSpacing: 0.5,
              }}
            >
              {listData?.description}
            </Text>
          </View>
        </Animated.ScrollView>
      </View>

      <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
        <TouchableOpacity
          style={[
            styles.footerBtn,
            {
              backgroundColor: Colors.primaryColor,
              marginRight: 20,
              flex: 2,
            },
          ]}
        >
          <Text style={styles.footerBtnText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerBtn}>
          <Text style={styles.footerBtnText}>${listData?.price}</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: Height,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  listingName: {
    fontSize: 28,
    letterSpacing: 0.5,
    fontWeight: "500",
  },
  listingLocationWrapper: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listingLocationText: {
    fontSize: 20,
    color: Colors.black,
    paddingLeft: 5,
  },
  listDataFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  listDataContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  listDataObj: {
    flexDirection: "column",
    paddingLeft: 5,
  },
  listIcon: {
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderRadius: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
    flexDirection: "row",
  },
  footerBtn: {
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  footerBtnText: {
    color: Colors.white,
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 16,
  },
});
