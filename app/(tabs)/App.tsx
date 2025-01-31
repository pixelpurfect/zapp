import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { auth, db } from "../../firebase/Config";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [regNo, setRegNo] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [batch, setBatch] = useState<number>(1);
  const [srmEmail, setSrmEmail] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<string>("login");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      Alert.alert("Verification Email Sent", "Please check your inbox to verify your email.");

      // Add user details to Firestore
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

      setCurrentPage("verifyEmail");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert("Error", "Please verify your email first.");
        return;
      }

      // Navigate to HomeScreen on successful login
      router.push("/HomeScreen");
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Check your email to reset your password.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  const LoginScreen = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => setCurrentPage("signUp")}>
        <Text style={styles.redirectText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentPage("passwordReset")}>
        <Text style={styles.redirectText}>Forgot Password?</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const SignUpScreen = () => (
    <ScrollView contentContainerStyle={styles.container}>
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
      <TouchableOpacity onPress={() => setCurrentPage("login")}>
        <Text style={styles.redirectText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const VerifyEmailScreen = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Please Verify Your Email</Text>
      <Text style={styles.text}>
        A verification email has been sent to your email address. 
        Please check your inbox to verify your account.
      </Text>
      <TouchableOpacity onPress={() => setCurrentPage("login")}>
        <Text style={styles.redirectText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );

  const PasswordResetScreen = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Reset Password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        keyboardType="email-address"
        style={styles.input}
      />
      <Button title="Send Password Reset Email" onPress={handlePasswordReset} />
      <TouchableOpacity onPress={() => setCurrentPage("login")}>
        <Text style={styles.redirectText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {currentPage === "login" && <LoginScreen />}
      {currentPage === "signUp" && <SignUpScreen />}
      {currentPage === "verifyEmail" && <VerifyEmailScreen />}
      {currentPage === "passwordReset" && <PasswordResetScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "100%",
  },
  redirectText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default App;