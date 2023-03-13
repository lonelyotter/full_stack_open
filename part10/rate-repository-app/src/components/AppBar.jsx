import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries";

import { useAuthStorage } from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

import AppBarLinkTab from "./AppBarLinkTab";
import AppBarEventTab from "./AppBarEventTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    flexDirection: "row",
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarLinkTab text="Repositories" link="/" />
        {data.me && (
          <AppBarLinkTab text="Create a review" link="/createReview" />
        )}
        {!data.me && <AppBarLinkTab text="Sign in" link="/signin" />}
        {data.me && <AppBarEventTab text="Sign out" onPress={signOut} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
