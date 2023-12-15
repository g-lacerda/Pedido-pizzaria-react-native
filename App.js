import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Pessoa from './Pessoa';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.25;

const pizzaOptions = [
  { id: 1, label: 'Calabresa', price: 'R$ 59,90' },
  { id: 2, label: 'Frango Catupiry', price: 'R$ 63,90' },
  { id: 3, label: 'Portuguesa', price: 'R$ 55,90' },
  { id: 4, label: 'Brigadeiro', price: 'R$ 64,90' },
];


export default class hubcenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pizza: 0,
      pizzas: [
        {key: 0, nome: 'Escolha sua pizza', valor: null},
        {key: 1, nome: 'Pizza Calabresa', valor: 59.90},
        {key: 1, nome: 'Pizza Frango Catupiry', valor: 63.90},
        {key: 3, nome: 'Pizza Portuguesa', valor: 55.90},
        {key: 4, nome: 'Pizza Brigadeiro', valor: 64.99}
      ]
    };
  }

  selected(){
    return this.state.pizza ? 'Você escolheu:' : null;
  }

  render() {
    let pizzasItem = this.state.pizzas.map((v,k) => {
      return <Picker.Item key={k} value={k} label={v.nome}/>
    });
    return (

      <View style={styles.container}>

        <Text style={styles.logo}>Menu Pizza</Text>

        <View style={styles.pickerWrapper}>

        <Picker placeholder="Escolha sua pizza" selectedValue={this.state.pizza} onValueChange={(itemValue, itemIndex) => this.setState({pizza: itemValue})}>
          {pizzasItem}
        </Picker>
        </View>

        <Text style={styles.textoMaior}>{this.selected(this.state.pizza)}</Text>

        <Text style={styles.texto}>{this.state.pizzas[this.state.pizza].nome}{this.state.pizzas[this.state.pizza].valor ? "\nR$ " + this.state.pizzas[this.state.pizza].valor.toFixed(2).toString().replaceAll('.', ',') : null}</Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    /*justifyContent: 'center',
    alignItems: 'center',*/
  },
  img: {
    width: 100,
    height: 100,
    margin: 10,
  },
  input: {
    marginTop: 50,
    height: 45,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 10,
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    color: '#eee', width: screenWidth * 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },

  texto: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 50,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoMaior:{
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 50,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoUltimoTempo: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 2,
    color: '#eee',
    fontWeight: 'bold'
  },
  botao: {
    margin: 30,
    width: buttonWidth,
    height: buttonWidth,
    backgroundColor: 'transparent',
    borderColor: '#eee',
    borderWidth: 1,
    color: '#eee',
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  box1: {
    backgroundColor: 'red',
    height: 250,
    width: 150
  },
  box2: {
    backgroundColor: 'yellow',
    height: 250,
    width: 150
  },
  box3: {
    backgroundColor: 'green',
    height: 250,
    width: 150
  },
  box4: {
    backgroundColor: 'blue',
    height: 250,
    width: 150
  },

  logo: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15
  },
  pizzas: {
    marginTop: 15,
    fontSize: 24,
    textAlign: 'center'
  },

  pickerWrapper: {
    margin: 30,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 12,
  },
});


/*
flexDirection: 'column',
justifyContent:'center'
*/
