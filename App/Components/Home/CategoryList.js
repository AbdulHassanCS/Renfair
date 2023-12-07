// Importing necessary components from React and React Native
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

// Importing the CategoryItem component
import CategoryItem from "./CategoryItem";

// Functional component for rendering a list of categories
export default function CategoryList({ setSelectedCategory }) {
  // Array of category objects with id, name, value, and icon
  const categoryList = [
    {
      id: 1,
      name: "Activities",
      value: "store",
      icon: require("./../../../assets/activities.png"),
    },
    {
      id: 2,
      name: "Restaurants",
      value: "bar",
      icon: require("./../../../assets/food.png"),
    },
  ];

  return (
    // Container View styling with top margin
    <View style={{ marginTop: 15 }}>
      {/* Heading for the category list */}
      <Text
        style={{
          fontSize: 20,
        }}
      >
        Welcome To The Fair!
      </Text>

      {/* FlatList component to render the category items horizontally */}
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
        renderItem={({ item }) => (
          // TouchableOpacity to make each category item tappable
          <TouchableOpacity onPress={() => setSelectedCategory(item.value)}>
            {/* Rendering the CategoryItem component for each category */}
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
