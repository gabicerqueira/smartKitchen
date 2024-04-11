import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = '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';


export default function TreinoScreen() {

  const [load, defLoad] = useState(false);
  const [treino, defTreino] = useState("");

  const [genero, defGenero] = useState("");
  const [nivel, defNivel] = useState("");
  const [objetivo, defObjetivo] = useState("");
  const [peso, defPeso] = useState("");

  async function gerarTreino() {
    if (genero === "" || nivel === "" || objetivo === "" || peso === "") {
      Alert.alert("Atenção", "Informe todos os requisitos!", [{ text: "Beleza!" }])
      return;
    }
    defTreino("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira um treino personalizado para o ${nivel} da pessoa: iniciante, intermediário ou avançado e usando os requisitos: ${genero}, ${objetivo} e ${peso} e pesquise o treino no Youtube. Caso encontre, informe o link.`;

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
        const treinoCompleto = data.choices[0].message.content;
        defTreino(treinoCompleto);
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
      <Text style={ESTILOS.header}>Treino Personalizado</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira os requisitos abaixo:</Text>
        <TextInput
          placeholder="Gênero"
          style={ESTILOS.input}
          value={genero}
          onChangeText={(texto) => defGenero(texto)}
        />
        <TextInput
          placeholder="Nível: Iniciante, Intermediário e Avançado"
          style={ESTILOS.input}
          value={nivel}
          onChangeText={(texto) => defNivel(texto)}
        />
        <TextInput
          placeholder="Objetivo"
          style={ESTILOS.input}
          value={objetivo}
          onChangeText={(texto) => defObjetivo(texto)}
        />
        <TextInput
          placeholder="Peso"
          style={ESTILOS.input}
          value={peso}
          onChangeText={(texto) => defPeso(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarTreino}>
        <Text style={ESTILOS.buttonText}>Gerar treino</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Selecionando filme...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {treino && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Seu treino 👇</Text>
            <Text style={{ lineHeight: 24 }}>{treino} </Text>
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