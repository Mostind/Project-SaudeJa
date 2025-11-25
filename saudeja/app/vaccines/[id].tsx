import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Vaccine } from '../../src/types';
import { getVaccineById } from '../../src/services/database';

const VaccineDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [vaccine, setVaccine] = useState<Vaccine | null>(null);

  useEffect(() => {
    if (id) {
      loadVaccine(Number(id));
    }
  }, [id]);

  const loadVaccine = async (vaccineId: number) => {
    const data = await getVaccineById(vaccineId);
    setVaccine(data || null);
  };

  if (!vaccine) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{vaccine.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idade</Text>
          <Text style={styles.sectionContent}>{vaccine.ageRange}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O QUE É ESSA VACINA:</Text>
          <Text style={styles.sectionContent}>{vaccine.description}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMAÇÕES</Text>
          <Text style={styles.sectionContent}>{vaccine.details}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DOENÇAS EVITADAS:</Text>
          <Text style={styles.sectionContent}>{vaccine.preventedDiseases}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PÚBLICO-ALVO:</Text>
          <Text style={styles.sectionContent}>{vaccine.targetAudience}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#00796B',
    paddingVertical: 15,
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
});




export default VaccineDetailScreen;
