/** @format */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen({ route }) {
  const { user } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Your Details:</Text>
        <Text style={styles.detailText}>Email: {user.email}</Text>
        <Text style={styles.detailText}>Country: {user.country}</Text>
        <Text style={styles.detailText}>State: {user.state}</Text>
        <Text style={styles.detailText}>City: {user.city}</Text>
        <Text style={styles.detailText}>Gender: {user.gender}</Text>
        <Text style={styles.detailText}>Date of Birth: {user.dob}</Text>
        <Text style={styles.detailText}>Phone: {user.phone}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  detailsContainer: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 10
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5
  }
});
