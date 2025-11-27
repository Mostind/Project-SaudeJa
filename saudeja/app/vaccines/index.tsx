import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Vaccine } from '../../src/types';
import { getVaccines } from '../../src/services/dataService';

const VaccinesScreen: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  useEffect(() => {
    loadVaccines();
  }, []);

  const loadVaccines = async () => {
    const vaccinesData = await getVaccines();
    setVaccines(vaccinesData);
  };

  const handleVaccinePress = (vaccine: Vaccine) => {
    router.push(`/vaccines/${vaccine.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/sus-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>VACINAS DISPONÍVEIS</Text>

      <ScrollView style={styles.vaccinesList}>
        {vaccines.map((vaccine) => (
          <TouchableOpacity
            key={vaccine.id}
            style={styles.vaccineItem}
            onPress={() => handleVaccinePress(vaccine)}
          >
            <View style={styles.vaccineContent}>
              <Text style={styles.vaccineName}>{vaccine.name}</Text>
              <Text style={styles.vaccineDescription}>{vaccine.description}</Text>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingTop: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logo: {
    width: 150,
    height: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
    marginVertical: 20,
  },
  vaccinesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  vaccineItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  vaccineContent: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  vaccineDescription: {
    fontSize: 12,
    color: '#666',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    fontSize: 20,
  },
});

export default VaccinesScreen;
