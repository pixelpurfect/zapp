import React, { useState } from 'react';
import { auth, db } from '../../firebase/Config'; // Import Firebase auth
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Import useRouter for programmatic navigation
import { Alert } from 'react-native'; // Use Alert for error messages in React Native

const FormComponent: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regNo, setRegNo] = useState('');
  const [department, setDepartment] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const router = useRouter();

  // Send OTP to user's phone number
  const sendOtp = async () => {
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(phone);
    setVerificationId(verificationId);
    setIsOtpSent(true);
  };

  // Verify OTP and sign up user
  const verifyOtpAndSignUp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
      phone,
      regNo,
      department,
      createdAt: new Date(),
    });

    console.log('User signed up successfully');
    router.push('/form'); // Navigate to the /form route in the app
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', border: '1px solid white', borderRadius: '8px', backgroundColor: '#333' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Registration</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (isOtpSent) {
            verifyOtpAndSignUp();
          } else {
            sendOtp();
          }
        }}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <label htmlFor="regno">Registration Number:</label>
          <input type="text" id="regno" value={regNo} onChange={(e) => setRegNo(e.target.value)} required />

          <label htmlFor="department">Department:</label>
          <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} required />

          {isOtpSent ? (
            <>
              <label htmlFor="otp">Enter OTP:</label>
              <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <button type="submit">Verify OTP and Submit</button>
            </>
          ) : (
            <button type="submit">Send OTP</button>
          )}
        </form>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FormComponent;
