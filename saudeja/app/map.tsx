import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native';
import { router } from 'expo-router';
import { HealthPost } from '../src/types';
import { getHealthPosts } from '../src/services/dataService';
import { logout } from '../src/services/storage';

const MapScreen: React.FC = () => {
  const [healthPosts, setHealthPosts] = useState<HealthPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<HealthPost | null>(null);

  useEffect(() => {
    loadHealthPosts();
  }, []);

  const loadHealthPosts = async () => {
    const posts = await getHealthPosts();
    setHealthPosts(posts);
  };

  const handlePostSelect = (post: HealthPost) => {
    setSelectedPost(post);
  };

  const handleContinue = () => {
    if (selectedPost) {
      router.navigate('/vaccines');
    }
  };

const userlogout= async() =>{
  const sucesslogout=await logout();
  if(sucesslogout){
    router.replace('/(auth)/login');
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={userlogout}>
        <Image
          source={require('../assets/brasao.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Prefeitura de Fortaleza</Text>
          <Text style={styles.headerSubtitle}>Secretaria Municipal de Saúde</Text>
        </View>
      </View>

      <Text style={styles.title}>ESCOLHA O POSTO</Text>

      <View style={styles.mapContainer}>
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=Fortaleza,CE&zoom=11&size=600x400&maptype=roadmap&markers=color:red%7C-3.7319,-38.5267&key=YOUR_API_KEY' }}
          style={styles.mapPlaceholder}
          defaultSource={require('../assets/icon.png')}
        />
        <View style={styles.mapOverlay}>
          <Text style={styles.mapText}>Mapa de Fortaleza</Text>
          <Text style={styles.mapSubtext}>Postos de Saúde</Text>
        </View>
      </View>

      <ScrollView style={styles.postsList}>
        {healthPosts.map((post) => (
          <TouchableOpacity
            key={post.id}
            style={[
              styles.postItem,
              selectedPost?.id === post.id && styles.postItemSelected,
            ]}
            onPress={() => handlePostSelect(post)}
          >
            <View style={styles.postItemContent}>
              <Text style={styles.postName}>{post.name}</Text>
              <Text style={styles.postAddress}>{post.address}</Text>
            </View>
            {selectedPost?.id === post.id && (
              <View style={styles.checkmark}>
                
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedPost && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
    marginVertical: 20,
  },
  mapContainer: {
    height: 250,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#B2DFDB',
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 121, 107, 0.7)',
  },
  mapText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mapSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 5,
  },
  postsList: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  postItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  postItemSelected: {
    borderColor: '#00A896',
    backgroundColor: '#E0F2F1',
  },
  postItemContent: {
    flex: 1,
  },
  postName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postAddress: {
    fontSize: 12,
    color: '#666',
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00A896',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#00A896',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
