import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ButtonProps } from "react-native";
import { COLORS } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface IButton extends ButtonProps {
  children: ReactNode;
}

const Button = ({ children, onPress, disabled, color }: IButton) => {
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: color ? color : COLORS.primary100,
      borderRadius: 5,
      elevation: 10,
    },
    text: {
      color: COLORS.text,
      fontSize: Fonts.text,
      textAlign: "center",
    },
    disabled: {
      backgroundColor: COLORS.disabled,
    },
    pressed: {
      backgroundColor: COLORS.primary200,
      elevation: 0,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;
