import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { COLORS } from "../../constants/colors";
import { useState } from "react";

const Input = (props: TextInputProps) => {
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      style={[styles.input, focus && styles.inputFocus]}
      {...props}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 18,
    backgroundColor: "#eee",
  },
  inputFocus: {
    borderColor: COLORS.primary50,
  },
});
