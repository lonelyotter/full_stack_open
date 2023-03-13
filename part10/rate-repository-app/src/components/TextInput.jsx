import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ ...props }) => {
  const textInputStyle = [styles.textInputStyle, props.error && styles.error];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
