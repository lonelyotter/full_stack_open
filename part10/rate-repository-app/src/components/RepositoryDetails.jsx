import { View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Button from "./Button";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import { StyleSheet } from "react-native-web";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

const RepositoryDetails = () => {
  const id = useParams().id;

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : undefined;

  if (!repository) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} />
      <Button
        label="Open in GitHub"
        onPress={() => {
          Linking.openURL(repository.url);
        }}
      />
    </View>
  );
};

export default RepositoryDetails;
