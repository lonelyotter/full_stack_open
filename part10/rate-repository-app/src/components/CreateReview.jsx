import FormikTextInput from "./FormikTextInput";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Button from "./Button";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  form: {
    backgroundColor: "white",
    padding: 10,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().required("Rating is required").min(0).max(100),
  text: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Button label="Create a review" onPress={onSubmit} />
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [mutate] = useMutation(CREATE_REVIEW);
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const result = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      const repositoryId = result.data.createReview.repositoryId;
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
