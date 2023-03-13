import { View, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Button from "./Button";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { useParams } from "react-router-native";
import { StyleSheet } from "react-native-web";
import * as Linking from "expo-linking";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
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

const ReviewItem = ({ review }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          borderColor: theme.colors.primary,
          borderWidth: 2,
          justifyContent: "center",
          marginRight: 10,
        }}
      >
        <Text style={{ textAlign: "center" }} color="primary" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View>
        <View>
          <Text fontWeight="bold">{review.user.username}</Text>
        </View>
        <View>
          <Text color="textSecondary">{review.createdAt.substring(0, 10)}</Text>
        </View>
        <View
          style={{
            maxWidth: "95%",
          }}
        >
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;

  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : undefined;

  if (!repository) {
    return null;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  console.log(reviews);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
