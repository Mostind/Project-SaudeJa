import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { vacinas } from "../screenVacinas/data/vacinas";

export default function ScreenVacinas_detalhes({ route }) {
  const { vacina } = route.params; // pega o objeto da vacina enviada

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{vacina.nome.toUpperCase()}</Text>
        <Text style={styles.idade}>Idade: {vacina.idade || "x - y"}</Text>

        <Text style={styles.subtitulo}>INFORMAÇÕES</Text>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>O QUE É ESSA VACINA:</Text>
          <Text style={styles.text}>
            {vacina.descricao ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s."}
          </Text>

          <Text style={styles.sectionTitle}>DOENÇAS EVITADAS:</Text>
          <Text style={styles.text}>
            {vacina.doencas ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "100%",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  idade: {
    fontSize: 14,
    color: "#444",
    marginBottom: 16,
  },
  subtitulo: {
    fontWeight: "bold",
    color: "#6E6E6E",
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 6,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
});