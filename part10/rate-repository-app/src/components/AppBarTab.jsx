import { Text, StyleSheet, Pressable, View } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <View>
      <Pressable onPress={() => console.log("Pressed!")}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
