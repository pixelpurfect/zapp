import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase/Config"; // Assuming firebase setup is done
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [regNo, setRegNo] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [batch, setBatch] = useState<number>(1);
  const [srmEmail, setSrmEmail] = useState<string>("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      Alert.alert("Verification Email Sent", "Please check your inbox to verify your email.");

      // Add user details to Firestore (in USERS collection)
      await addDoc(collection(db, "USERS"), {
        uid: user.uid,
        email: user.email,
        name,
        regNo,
        phoneNo,
        batch,
        srmEmail,
        createdAt: new Date(),
      });

      navigation.navigate("VerifyEmail"); // Navigate to a screen informing user to verify email
    } catch (error: unknown) {
      // Casting error to 'Error' to access message property
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        value={regNo}
        onChangeText={setRegNo}
        placeholder="Enter Registration Number"
        style={styles.input}
      />
      <TextInput
        value={phoneNo}
        onChangeText={setPhoneNo}
        placeholder="Enter Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        value={srmEmail}
        onChangeText={setSrmEmail}
        placeholder="Enter SRM Email"
        style={styles.input}
      />

      <Button title="Sign Up" onPress={handleSignUp} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.redirectText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  redirectText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;




