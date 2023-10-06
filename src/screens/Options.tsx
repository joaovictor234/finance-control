import { View, Text } from "react-native";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";

const Options = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Options</Text>
      <Button title="" onPress={() => navigation.navigate("AddCategories")}>
        Categories
      </Button>
    </View>
  );
};

export default Options;
