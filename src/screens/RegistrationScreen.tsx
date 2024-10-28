/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";
import { registerUser } from "../services/auth";
import { RootStackParamList } from "../types/navigation";

type RegistrationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Registration"
>;

type Props = {
  navigation: RegistrationScreenNavigationProp;
};

export default function RegistrationScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const handleRegister = async () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!name) newErrors.name = true;
    if (!email) newErrors.email = true;
    if (!country) newErrors.country = true;
    if (!state) newErrors.state = true;
    if (!city) newErrors.city = true;
    if (!gender) newErrors.gender = true;
    if (!phone) newErrors.phone = true;
    if (!password) newErrors.password = true;
    if (password !== confirmPassword) newErrors.confirmPassword = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert(
        "Registration Error",
        "Please fill in all required fields correctly."
      );
      return;
    }

    try {
      const userData = {
        name,
        email,
        country,
        state,
        city,
        gender,
        dob: format(dob, "MM/dd/yyyy"),
        phone,
        password
      };

      await registerUser(userData);
      setBottomSheetVisible(true);
    } catch (error) {
      Alert.alert(
        "Registration Error",
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={[styles.input, errors.country && styles.inputError]}
        placeholder='Country'
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={[styles.input, errors.state && styles.inputError]}
        placeholder='State'
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={[styles.input, errors.city && styles.inputError]}
        placeholder='City'
        value={city}
        onChangeText={setCity}
      />
      <View
        style={[styles.pickerContainer, errors.gender && styles.inputError]}
      >
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label='Select Gender' value='' />
          <Picker.Item label='Male' value='male' />
          <Picker.Item label='Female' value='female' />
          <Picker.Item label='Other' value='other' />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>{format(dob, "MM/dd/yyyy")}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode='date'
          display='default'
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder='Phone Number'
        value={phone}
        onChangeText={setPhone}
        keyboardType='phone-pad'
      />
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isBottomSheetVisible}
        onBackdropPress={closeBottomSheet}
      >
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetText}>Registration Successful</Text>
          <TouchableOpacity style={styles.button} onPress={closeBottomSheet}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF4500"
  },
  input: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16
  },
  inputError: {
    borderColor: "red"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    marginBottom: 15
  },
  dateButton: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: "center"
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333333"
  },
  button: {
    backgroundColor: "#FF4500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  bottomSheet: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  bottomSheetText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF4500"
  }
});
