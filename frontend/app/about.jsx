import { Image, Text, View } from "react-native";

export default function About() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text style={{ color: "white", fontSize: 40 }}>About Here</Text>

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1768005419000-d53e45851b50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        }}
        style={{ width: 300, height: 400, borderRadius: 10 }}
      />
    </View>
  );
}