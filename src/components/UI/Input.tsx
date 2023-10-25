import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { COLORS } from "../../constants/colors";
import { useState } from "react";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../../constants/dimensions";

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
    paddingVertical: HEIGHT_SCREEN / 100 * 1,
    paddingHorizontal: WIDTH_SCREEN / 100 * 2,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: HEIGHT_SCREEN / 100 * 2.5,
    backgroundColor: "#eee",
  },
  inputFocus: {
    borderColor: COLORS.primary50,
  },
});
