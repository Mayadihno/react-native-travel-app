import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "@/constant/Colors";
import { categoriesData } from "@/constant/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CatProp = {
  onCategoryChange: (category: string) => void;
};

const CategoriesButtons = ({ onCategoryChange }: CatProp) => {
  const itemRef = useRef<TouchableOpacity[] | null[]>([]);
  const scrollRef = useRef<ScrollView>(null);
  const [active, setactive] = useState(0);

  const handleSelectCategory = (index: number) => {
    setactive(index);
    const selected = itemRef.current?.[index];
    if (selected) {
      selected.measure((x) => {
        scrollRef.current?.scrollTo({ y: 0, x: x, animated: true });
      });
    }
    onCategoryChange(categoriesData[index].title);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          gap: 20,
          marginBottom: 10,
        }}
      >
        {categoriesData.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => handleSelectCategory(index)}
              ref={(el) => ((itemRef.current as any)[index] = el)}
              style={
                active === index ? styles.categoryActiveBtn : styles.categoryBtn
              }
            >
              <MaterialCommunityIcons
                name={item.iconName as any}
                size={24}
                color={active === index ? Colors.white : Colors.black}
              />
              <Text
                style={
                  active === index
                    ? styles.categoryActBtnText
                    : styles.categoryBtnText
                }
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesButtons;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.black,
  },
  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#333333",
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  categoryActiveBtn: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#333333",
    shadowRadius: 3,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },

  categoryBtnText: {
    marginLeft: 5,
    color: Colors.black,
    fontSize: 18,
  },
  categoryActBtnText: {
    marginLeft: 5,
    color: Colors.white,
    fontSize: 18,
  },
});
