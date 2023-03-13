import { TextInput as NativeTextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
});

const TextInput = ({ ...props }) => {
  return <NativeTextInput style={styles.textInputStyle} {...props} />;
};

export default TextInput;
