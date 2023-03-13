import { View, StyleSheet, Image } from "react-native";
import Text from "./Text";

import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 10,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "90%",
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

const LanguageTag = ({ language }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          padding: 5,
          borderRadius: 5,
          marginTop: 5,
        }}
      >
        <Text style={{ color: "white" }}>{language}</Text>
      </View>
    </View>
  );
};

const Statistics = ({ label, value }) => {
  const formattedValue =
    value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <Text
        fontWeight="bold"
        style={{
          textAlign: "center",
        }}
      >
        {formattedValue}
      </Text>
      <Text
        color="textSecondary"
        style={{
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.textContainer}>
          <Text fontWeight="bold">{repository.fullName}</Text>
          <Text color="textSecondary">{repository.description}</Text>
          <LanguageTag language={repository.language} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Statistics label="Stars" value={repository.stargazersCount} />
        <Statistics label="Forks" value={repository.forksCount} />
        <Statistics label="Reviews" value={repository.reviewCount} />
        <Statistics label="Rating" value={repository.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
