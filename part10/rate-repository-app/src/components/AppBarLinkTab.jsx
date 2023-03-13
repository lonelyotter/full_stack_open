import { Text, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    padding: 20,
  },
});

const AppBarLinkTab = ({ text, link }) => {
  return (
    <View>
      <Link to={link}>
        <Text style={styles.text}>{text}</Text>
      </Link>
    </View>
  );
};

export default AppBarLinkTab;
