import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useAuthStorage } from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    console.log(data.authenticate.accessToken);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
