import { Text, StyleSheet, View, Pressable } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    padding: 20,
  },
});

const AppBarEventTab = ({ text, onPress }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarEventTab;
