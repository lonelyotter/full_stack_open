import { View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";
import Button from "./Button";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_ME, variables: { includeReviews: true } }],
  });

  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
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
          <Text
            style={{ textAlign: "center" }}
            color="primary"
            fontWeight="bold"
          >
            {review.rating}
          </Text>
        </View>
        <View>
          <View>
            <Text fontWeight="bold">{review.repository.fullName}</Text>
          </View>
          <View>
            <Text color="textSecondary">
              {review.createdAt.substring(0, 10)}
            </Text>
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: 10,
        }}
      >
        <Button
          label={"View repository"}
          onPress={() => {
            navigate(`/${review.repository.id}`);
          }}
        />
        <Button
          error
          label={"Delete review"}
          onPress={() => {
            Alert.alert(
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    deleteReview({ variables: { id: review.id } });
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <View>
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;
