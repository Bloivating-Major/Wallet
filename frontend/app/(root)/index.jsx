import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import { useEffect } from 'react'
import PageLoader from '../../components/PageLoader'
import { styles } from '../../assets/styles/home.styles'
import { Ionicons } from '@expo/vector-icons'
import { BalanceCard } from '../../components/BalanceCard'

export default function Page() {
  const { user } = useUser()
  console.log(user?.id);

  const { transactions, summary, isLoading, loadData, deleteTransaction } = useTransactions(user?.id)

  useEffect(() => {
    loadData()
  }, [loadData])

  console.log("Transactions", transactions);
  console.log("Summary", summary);

  if (isLoading) return <PageLoader />

  const email = user?.emailAddresses[0]?.emailAddress;

  const displayName = email
    ?.split("@")[0]
    .split(/\d/)[0]
    .replace(/(^\w|\s\w)/g, m => m.toUpperCase());

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {/* Header Left */}
      
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
      
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {displayName}
              </Text>
            </View>
          
          </View>
          {/* Header Right */}
      
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <SignOutButton />
      
          </View>
      
        </View>
       
        <BalanceCard summary={summary} />
      </View>

      {/* Content */}
    </View>
  )
}