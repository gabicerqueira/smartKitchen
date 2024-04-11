import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = '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';


export default function PlaylistScreen() {

  const [load, defLoad] = useState(false);
  const [playlist, defPlaylist] = useState("");

  const [genero, defGenero] = useState("");
  const [artista1, defArtista1] = useState("");
  const [artista2, defArtista2] = useState("");
  const [atmosfera, defAtmosfera] = useState("");

  async function gerarPlaylist() {
    if (genero === "" || artista1 === "" || artista2 === "" || atmosfera === "") {
      Alert.alert("Atenção", "Informe todos os requisitos!", [{ text: "Beleza!" }])
      return;
    }
    defPlaylist("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma playlist personalizada para o ${atmosfera} da música: animada, relaxante, triste e usando os requisitos: ${genero}, ${artista1} e ${artista2} e pesquise a playlist no Spotify. Caso encontre, informe o link.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
        top_p: 1,
      })
    })

      .then(response => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        const playlistCompleto = data.choices[0].message.content;
        defPlaylist(playlistCompleto);
      })   
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        defLoad(false);
      })
  }


  return (
    <View style={ESTILOS.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={ESTILOS.header}>Playlist Personalizada</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira os requisitos abaixo:</Text>
        <TextInput
          placeholder="Gênero"
          style={ESTILOS.input}
          value={genero}
          onChangeText={(texto) => defGenero(texto)}
        />
        <TextInput
          placeholder="Atmosfera: animada, relaxante, triste..."
          style={ESTILOS.input}
          value={atmosfera}
          onChangeText={(texto) => defAtmosfera(texto)}
        />
        <TextInput
          placeholder="Artista 1"
          style={ESTILOS.input}
          value={artista1}
          onChangeText={(texto) => defArtista1(texto)}
        />
        <TextInput
          placeholder="Artista 2"
          style={ESTILOS.input}
          value={artista2}
          onChangeText={(texto) => defArtista2(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarPlaylist}>
        <Text style={ESTILOS.buttonText}>Gerar playlist</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Selecionando filme...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {playlist && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Sua playlist 👇</Text>
            <Text style={{ lineHeight: 24 }}>{playlist} </Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  }

})