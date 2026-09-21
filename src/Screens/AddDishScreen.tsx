// AddDishScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const headerImage = require("../../assets/images/Appbar.png");

interface Dish {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
}

type Course = "Starter" | "Main Meal" | "Dessert";
const COURSES: Course[] = ["Starter", "Main Meal", "Dessert"];

const AddDishScreen: React.FC = () => {
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | "">("");
  const [price, setPrice] = useState<string>("");
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

  const [dishes, setDishes] = useState<Dish[]>([]);

  const handleAddDish = (): void => {
    if (
      !dishName.trim() ||
      !description.trim() ||
      !selectedCourse ||
      !price.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields before adding a dish.",
      );
      return;
    }

    if (isNaN(parseFloat(price))) {
      Alert.alert(
        "Invalid Price",
        "Please enter a valid number for the price.",
      );
      return;
    }

    const newDish: Dish = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course: selectedCourse,
      price: parseFloat(price).toFixed(2),
    };

    setDishes([...dishes, newDish]);

    Alert.alert(
      "Dish Added",
      `Name: ${newDish.dishName}\n` +
        `Description: ${newDish.description}\n` +
        `Course: ${newDish.course}\n` +
        `Price: R${newDish.price}`,
    );

    setDishName("");
    setDescription("");
    setSelectedCourse("");
    setPrice("");
    setCategoryOpen(false);
  };

  const handleBackToMenu = (): void => {
    // Wire this up to your navigation (e.g. Expo Router's router.back())
    Alert.alert("Back to Menu", "Navigate back to the menu list here.");
  };

  return (
    <View style={styles.screen}>
      {/* Appbar / header photo */}
      <ImageBackground
        source={headerImage}
        style={styles.header}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay} />
        <Text style={styles.headerTitle}>Menu Management</Text>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.screenTitle}>Add Menu Item</Text>
        <View style={styles.divider} />

        {/* Item Name */}
        <View style={styles.field}>
          <Text style={styles.label}>Item Name:</Text>
          <TextInput
            style={styles.underlineInput}
            placeholder="Enter Item Name"
            placeholderTextColor="#8A8FA3"
            value={dishName}
            onChangeText={setDishName}
          />
        </View>
        <View style={styles.divider} />

        {/* Course (accordion-style selector) */}
        <View style={styles.field}>
          <Text style={styles.label}>Course:</Text>
          <TouchableOpacity
            style={styles.categorySelector}
            onPress={() => setCategoryOpen(!categoryOpen)}
          >
            <Text style={styles.categorySelectorText}>
              {selectedCourse || "Select a Category"}
            </Text>
            <Ionicons
              name={categoryOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color="#3E2C23"
            />
          </TouchableOpacity>

          {categoryOpen && (
            <View style={styles.categoryList}>
              {COURSES.map((course) => (
                <TouchableOpacity
                  key={course}
                  style={styles.categoryOption}
                  onPress={() => {
                    setSelectedCourse(course);
                    setCategoryOpen(false);
                  }}
                >
                  <Text style={styles.categoryOptionText}>{course}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.divider} />

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.underlineInput}
            placeholder="Description of Item"
            placeholderTextColor="#8A8FA3"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.divider} />

        {/* Price */}
        <View style={styles.field}>
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.underlineInput}
            placeholder="Price of Item"
            placeholderTextColor="#8A8FA3"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.divider} />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.subtleButton} onPress={handleAddDish}>
            <Text style={styles.subtleButtonText}>Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleBackToMenu}
          >
            <Text style={styles.primaryButtonText}>Back To Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.counter}>
          Dishes added this session: {dishes.length}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#E4EAFF",
  },
  header: {
    height: 235,
    justifyContent: "flex-end",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20, 10, 30, 0.25)",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "600",
    padding: 14,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: "600",
    color: "#2B2440",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#B8BFE0",
    marginVertical: 14,
  },
  field: {
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "600",
    color: "#2B2440",
    marginBottom: 10,
  },
  underlineInput: {
    width: "80%",
    textAlign: "center",
    fontSize: 14,
    color: "#2B2440",
    borderBottomWidth: 1,
    borderBottomColor: "#8A8FA3",
    paddingVertical: 4,
  },
  categorySelector: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F2F7",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  categorySelectorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3E2C23",
  },
  categoryList: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  categoryOption: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEDF2",
  },
  categoryOptionText: {
    fontSize: 14,
    color: "#3E2C23",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  subtleButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  subtleButtonText: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#2B2440",
  },
  primaryButton: {
    backgroundColor: "#1F1B2E",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  counter: {
    marginTop: 20,
    textAlign: "center",
    color: "#5C5A72",
    fontSize: 12,
  },
});

export default AddDishScreen;
