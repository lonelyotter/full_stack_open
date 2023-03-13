import { View, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Button from "./Button";
import { useParams } from "react-router-native";
import { StyleSheet } from "react-native-web";
import * as Linking from "expo-linking";
import Text from "./Text";
import theme from "../theme";
import useRepositoryReviews from "../hooks/useRepositoryReviews";

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

  const { repository, fetchMore } = useRepositoryReviews({
    repositoryId: id,
    first: 3,
  });

  const onEndReach = () => {
    console.log("You have reached the end of the list");
    fetchMore();
  };

  if (!repository) {
    return null;
  }

  console.log(repository);

  const reviews = repository.reviews.edges.map((edge) => edge.node);

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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
