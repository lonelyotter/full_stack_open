import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const navigate = useNavigate();

  const queryVariables = [
    { orderBy: "CREATED_AT", orderDirection: "DESC" },
    { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  ];

  const { data } = useQuery(GET_REPOSITORIES, {
    variables: {
      ...queryVariables[selectedSort],
      searchKeyword: debouncedSearchKeyword,
    },
    fetchPolicy: "cache-and-network",
  });

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <View>
          <TextInput
            style={{
              backgroundColor: "white",
              height: 30,
            }}
            placeholder="Search keywords"
            onChangeText={(text) => setSearchKeyword(text)}
          />
          <Picker
            selectedValue={selectedSort}
            onValueChange={(itemValue) => {
              setSelectedSort(itemValue);
              console.log(itemValue);
            }}
          >
            <Picker.Item label="latest" value={0} />
            <Picker.Item label="highest rated" value={1} />
            <Picker.Item label="lowest rated" value={2} />
          </Picker>
        </View>
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigate(`/${item.id}`);
          }}
        >
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
