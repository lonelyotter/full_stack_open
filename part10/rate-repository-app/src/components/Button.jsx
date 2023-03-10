import Text from "./Text";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    backgroundColor: theme.colors.error,
  },
});

const Button = ({ label, onPress, error }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, error && styles.error]}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
