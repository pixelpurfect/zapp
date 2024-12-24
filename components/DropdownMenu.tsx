// DropdownMenu.tsx
import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

interface DropdownMenuProps {
  options: string[];
  onSelect: (value: string) => void;
}

function DropdownMenu({ options, onSelect }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select Location:</Text>
            <Picker style={styles.picker} onValueChange={onSelect}>
                {options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  // },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default DropdownMenu;
