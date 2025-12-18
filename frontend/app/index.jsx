import { Link } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Sambhav Here</Text>
      <Link style={styles.text} href="/about" >About</Link>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.image}
      />
      <Button title="Click Me" onPress={() => { }}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
    fontSize: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
});