import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const tweets = [
  { id: '1', text: 'Building a Twitter profile UI in React Native 🚀' },
  { id: '2', text: 'Expo makes prototyping insanely fast.' },
  { id: '3', text: 'Dark mode UI always wins.' },
];

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <FlatList
        data={tweets}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileHeader />}
        renderItem={({ item }) => (
          <View style={styles.tweet}>
            <Text style={styles.tweetText}>{item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function ProfileHeader() {
  return (
    <View>
      <View style={styles.banner} />

      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/102620496?v=4' }}
        style={styles.avatar}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>Sambhav</Text>
        <Text style={styles.username}>@sambhav</Text>

        <Text style={styles.bio}>
          Software Engineer • React Native • UI Enthusiast
        </Text>

        <View style={styles.stats}>
          <Text style={styles.stat}>
            <Text style={styles.statNumber}>420</Text> Following
          </Text>
          <Text style={styles.stat}>
            <Text style={styles.statNumber}>12.5K</Text> Followers
          </Text>
        </View>

        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Posts</Text>
          <Text style={styles.tab}>Replies</Text>
          <Text style={styles.tab}>Media</Text>
          <Text style={styles.tab}>Likes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  banner: {
    height: 140,
    backgroundColor: '#1DA1F2',
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#000',
    position: 'absolute',
    left: 16,
    top: 95,
  },

  profileInfo: {
    marginTop: 60,
    paddingHorizontal: 16,
  },

  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  username: {
    color: '#8899A6',
    marginTop: 2,
  },

  bio: {
    color: '#fff',
    marginTop: 8,
    lineHeight: 18,
  },

  stats: {
    flexDirection: 'row',
    marginTop: 12,
  },

  stat: {
    color: '#8899A6',
    marginRight: 20,
  },

  statNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },

  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },

  tab: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
    color: '#8899A6',
    fontWeight: '500',
  },

  activeTab: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#1DA1F2',
  },

  tweet: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },

  tweetText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },
});
