import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

const alturaStatusBar = StatusBar.currentHeight

export default function App() {


  return (
    <View style={ESTILOS.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={ESTILOS.header}>Cozinha fácil</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira abaixo os ingredientes</Text>
        <TextInput
          placeholder="Ingrediente 1"
          style={ESTILOS.input}
        />
        <TextInput
          placeholder="Ingrediente 2"
          style={ESTILOS.input}
        />
        <TextInput
          placeholder="Ingrediente 3"
          style={ESTILOS.input}
        />
        <TextInput
          placeholder="Ingrediente 4"
          style={ESTILOS.input}
        />
        <TextInput
          placeholder="Almoço ou jantar"
          style={ESTILOS.input}
        />
      </View>
      <TouchableOpacity style={ESTILOS.button}>
        <Text style={ESTILOS.buttonText}>Gerar receita</Text>
        <MaterialIcons name="travel-explore" size={24} color="#FFF" />
      </TouchableOpacity>
      <ScrollView style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }}>

        <View style={ESTILOS.content}>
          <Text style={ESTILOS.title}>Produzindo receita...</Text>
        </View>

        <View style={ESTILOS.content}>
          <Text style={ESTILOS.title}>Sua receita 👇</Text>
        </View>

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