import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import AppBar from "./AppBar";
import theme from "../theme";
import RepositoryDetails from "./RepositoryDetails";
import CreateReview from "./CreateReview";
import SignUp from "./SignUp";
import UserReviews from "./UserReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/:id" element={<RepositoryDetails />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/myReviews" element={<UserReviews />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
