import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { WebView } from "react-native-webview";

export default function ScreenMaps() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', { zoomControl: true }).setView([-3.7780652, -38.5178244], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        const pontos = [
          { coords: [-3.835965, -38.5242479], nome: "Posto de Saúde Francisco Melo Jaborandi" },
          { coords: [-3.8122598, -38.5208651], nome: "Posto de Saúde Janival de Almeida Vieira" },
          { coords: [-3.8265405, -38.5172007], nome: "Posto de Saúde Dr. Pompeu Vasconcelos" },
          { coords: [-3.823241, -38.5065091], nome: "Posto de Saúde Waldo Pessoa de Almeida" },
          { coords: [-3.8208251, -38.5051739], nome: "Posto De Saude Santa Rosa De Viterbo" },
          { coords: [-3.8259469, -38.491762], nome: "Posto de Saúde Josafá Gomes da Silva" },
          { coords: [-3.8358231, -38.5162792], nome: "Posto de Saúde Messejana" },
          { coords: [-3.8383615, -38.5110414], nome: "Posto de Saúde Luis Franklin Pereira" },
          { coords: [-3.8779682, -38.5476467], nome: "Posto de Saúde Dr. Marcus Aurélio Lima Verde" },
          { coords: [-3.8383044, -38.5109841], nome: "Posto de Saúde Fausto Freire" },
          { coords: [-3.8404763, -38.5257637], nome: "Posto de Saúde Sítio São João" },
          { coords: [-3.8521922, -38.5263751], nome: "Posto de Saúde Evandro Ayres de Moura" },
          { coords: [-3.8397333, -38.5293153], nome: "Posto de Saúde Osmar Viana" },
          { coords: [-3.8294683, -38.5155435], nome: "Posto de Saúde Padre Alberto Trombini" },
          { coords: [-3.8269548, -38.5543532], nome: "Posto de Saúde Cidade Jardim" }
        ];

        pontos.forEach(p => {
          L.marker(p.coords).addTo(map).bindPopup(p.nome);
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESCOLHA O POSTO</Text>
      <View style={styles.mapContainer}>
        <WebView originWhitelist={["*"]} source={{ html }} />
      </View>
      <ScrollView style={styles.listContainer}>
        {[1, 2, 3,4,5,6,7,8,9,10].map((_, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>NOME DO POSTO</Text>
            <Text style={styles.cardSubtitle}>ENDEREÇO DO POSTO</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#004d40",
    marginBottom: 15,
  },
  mapContainer: {
    width: "90%",
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ccc",
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  listContainer: {
    width: "90%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#555",
  },
});