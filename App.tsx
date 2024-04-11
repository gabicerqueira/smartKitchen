import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useState } from 'react';
import FilmesScreen from './filmes';
import TreinoScreen from './treino';
import PlaylistScreen from './playlist';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();


const alturaStatusBar = StatusBar.currentHeight;
const KEY_GPT = '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';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Receita" 
          component={AppScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="restaurant" size={24} color="black" />
            )
          }} 
        />
        <Tab.Screen 
          name="Filmes" 
          component={FilmesScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="movie" color={color} size={24} />
            )
          }} 
        />
        <Tab.Screen 
          name="Treino" 
          component={TreinoScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="fitness-center" color={color} size={24} />
            )
          }} 
        />
        <Tab.Screen 
          name="Playlist" 
          component={PlaylistScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="music-note" size={24} color="black" />
            )
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


function AppScreen() {

  const [load, defLoad] = useState(false);
  const [receita, defReceita] = useState("");

  const [ingr1, defIngr1] = useState("");
  const [ingr2, defIngr2] = useState("");
  const [ingr3, defIngr3] = useState("");
  const [ingr4, defIngr4] = useState("");
  const [ocasiao, defOcasiao] = useState("");

  async function gerarReceita() {
    if (ingr1 === "" || ingr2 === "" || ingr3 === "" || ingr4 === "" || ocasiao === "") {
      Alert.alert("Atenção", "Informe todos os ingredientes!", [{ text: "Beleza!" }])
      return;
    }
    defReceita("");
    defLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma receita detalhada para o ${ocasiao} usando os ingredientes: ${ingr1}, ${ingr2}, ${ingr3} e ${ingr4} e pesquise a receita no YouTube. Caso encontre, informe o link.`;

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
        const receitaCompleta = data.choices[0].message.content;
        const tituloReceita = receitaCompleta.split('\n')[0];
        console.log(tituloReceita);
        defReceita(receitaCompleta);
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
      <Text style={ESTILOS.header}>Cozinha fácil</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira os ingredientes abaixo:</Text>
        <TextInput
          placeholder="Ingrediente 1"
          style={ESTILOS.input}
          value={ingr1}
          onChangeText={(texto) => defIngr1(texto)}
        />
        <TextInput
          placeholder="Ingrediente 2"
          style={ESTILOS.input}
          value={ingr2}
          onChangeText={(texto) => defIngr2(texto)}
        />
        <TextInput
          placeholder="Ingrediente 3"
          style={ESTILOS.input}
          value={ingr3}
          onChangeText={(texto) => defIngr3(texto)}
        />
        <TextInput
          placeholder="Ingrediente 4"
          style={ESTILOS.input}
          value={ingr4}
          onChangeText={(texto) => defIngr4(texto)}
        />
        <TextInput
          placeholder="Almoço ou Jantar"
          style={ESTILOS.input}
          value={ocasiao}
          onChangeText={(texto) => defOcasiao(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarReceita}>
        <Text style={ESTILOS.buttonText}>Gerar receita</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Produzindo receita...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Sua receita 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita} </Text>
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