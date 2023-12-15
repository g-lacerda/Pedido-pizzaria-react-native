import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Dimensions, Image, ScrollView, FlatList, Keyboard, Switch } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Pessoa from './Pessoa';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.25;

export default class hubcenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pizza: 0,
      pizzas: [
        { key: 0, nome: 'Escolha sua pizza', valor: null },
        { key: 1, nome: 'Pizza Calabresa', valor: 59.90 },
        { key: 1, nome: 'Pizza Frango Catupiry', valor: 63.90 },
        { key: 3, nome: 'Pizza Portuguesa', valor: 55.90 },
        { key: 4, nome: 'Pizza Brigadeiro', valor: 64.99 },
        { key: 5, nome: 'Pizza Margherita', valor: 50.00 },
        { key: 6, nome: 'Pizza Quatro Queijos', valor: 60.00 },
        { key: 7, nome: 'Pizza Pepperoni', valor: 65.00 },
        { key: 8, nome: 'Pizza Vegetariana', valor: 57.00 },
        { key: 9, nome: 'Pizza Napolitana', valor: 58.00 },
        { key: 10, nome: 'Pizza Atum', valor: 59.00 },
        { key: 11, nome: 'Pizza Bacon', valor: 61.00 },
        { key: 12, nome: 'Pizza Camarão', valor: 70.00 },
        { key: 13, nome: 'Pizza Carne-seca', valor: 62.00 },
        { key: 14, nome: 'Pizza Frango com Catupiry', valor: 63.50 },
        { key: 15, nome: 'Pizza Palmito', valor: 56.00 },
        { key: 16, nome: 'Pizza Milho', valor: 55.50 },
        { key: 17, nome: 'Pizza Lombo Canadense', valor: 66.00 },
        { key: 18, nome: 'Pizza Toscana', valor: 67.00 },
        { key: 19, nome: 'Pizza Alho e Óleo', valor: 54.00 },
        { key: 20, nome: 'Pizza Siciliana', valor: 68.00 },
        { key: 21, nome: 'Pizza Mexicana', valor: 69.00 },
        { key: 22, nome: 'Pizza Portuguesa Especial', valor: 70.00 },
        { key: 23, nome: 'Pizza Rúcula com Tomate Seco', valor: 71.00 },
        { key: 24, nome: 'Pizza Gorgonzola', valor: 72.00 },
        { key: 25, nome: 'Pizza Doce de Chocolate', valor: 73.00 },
        { key: 26, nome: 'Pizza Banana com Canela', valor: 74.00 },
        { key: 27, nome: 'Pizza Prestígio', valor: 75.00 },
        { key: 28, nome: 'Pizza Romeu e Julieta', valor: 76.00 },
        { key: 29, nome: 'Pizza Morango com Nutella', valor: 77.00 }
      ],
      quantidade: 1,
      isKeyboardVisible: false,
      switchStatus: false
    };
  }

  selected() {
    return this.state.pizza ? 'Você escolheu:' : null;
  }

  onChanged(quantidade) {
    quantidade = quantidade.replace(/[^0-9]/g, '');

    let numQuantidade = parseInt(quantidade, 10);

    if (numQuantidade >= 1 && numQuantidade <= 100) {
      this.setState({
        quantidade: quantidade
      });
    } else if (quantidade === '') {
      this.setState({
        quantidade: ''
      });
    } else {
      this.setState({
        quantidade: '100'
      });
    }
  }

  alerta() {
    alert('OK.');
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isKeyboardVisible: true });
  };

  _keyboardDidHide = () => {
    this.setState({ isKeyboardVisible: false });
  };


  render() {
    let pizzasItem = this.state.pizzas.map((v, k) => {
      if (v.key !== 0) {
        return <Picker.Item key={k} value={k} label={(v.nome + ' - R$ ' + v.valor.toFixed(2))} />
      } else {
        return <Picker.Item key={k} value={k} label={v.nome} />
      }
    });

    return (

      <View style={styles.container}>

        <ScrollView>

          <Text style={styles.logo}>Menu Pizza</Text>

          <View style={styles.pickerWrapper}>

            <Picker placeholder="Escolha sua pizza" selectedValue={this.state.pizza} onValueChange={(itemValue, itemIndex) => this.setState({ pizza: itemValue })}>
              {pizzasItem}
            </Picker>
          </View>

          <Image source={require('./src/pizza.png')} style={styles.img}></Image>

          {this.state.pizzas[this.state.pizza].valor !== null && (
            <>

              <Text style={styles.textoMaior}>{this.selected(this.state.pizza)}</Text>

              <Text style={styles.texto}>{this.state.pizzas[this.state.pizza].nome}{"\n\nR$ " + ((this.state.pizzas[this.state.pizza].valor) * this.state.quantidade).toFixed(2).toString().replaceAll('.', ',')}</Text>

              <TextInput
                style={styles.quantidadeInput}
                underlineColorAndroid="transparent"
                placeholder='Quantidade'
                placeholderTextColor="rgba(238, 238, 238, 0.5)"
                value={this.state.quantidade.toString()}
                onChangeText={(quantidade) => this.onChanged(quantidade)}
              />

              <Slider
                value={parseInt(this.state.quantidade || '0', 10)}
                style={styles.quantidadeInputSlider}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(sliderValue) => this.setState({ quantidade: sliderValue.toFixed(0) })}
                minimumTrackTintColor="#eee"
                thumbTintColor="#eee"
              />

              <View style={styles.switchContainer}>
                <Switch
                  value={this.state.switchStatus}
                  onValueChange={(valueSwitch) => this.setState({ switchStatus: valueSwitch })}
                  thumbColor={this.state.switchStatus ? "#eee" : "#767577"}
                  trackColor={{ false: "rgba(238, 238, 238, 0.2)", true: "rgba(255, 255, 255, 0.4)" }}
                  style={styles.switch}
                />
                <Text style={styles.textoSwitch}>Pagamento pelo APP</Text>
              </View>


            </>
          )}

        </ScrollView>
        {!this.state.isKeyboardVisible && this.state.pizzas[this.state.pizza].valor !== null && (
          <TouchableOpacity
            onPress={this.alerta}
            style={styles.botaoPizza}
          >
            <Text style={styles.botaoTexto}>Realizar pedido</Text>
          </TouchableOpacity>
        )}

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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  img: {
    width: 200,
    height: 200,
    margin: 10,
    alignSelf: 'center',
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
    color: '#eee',
    width: screenWidth * 0.8,
    alignSelf: 'center',
    textAlign: 'center',
  },
  quantidadeInput: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#eee',
    fontSize: 20,
    borderRadius: 12,
    color: '#eee',
    width: screenWidth * 0.4,
    alignSelf: 'center',
    textAlign: 'center',
  },
  quantidadeInputSlider: {
    width: screenWidth * 0.6,
    paddingTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },

  texto: {
    textAlign: 'center',
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    color: '#eee',
    fontWeight: 'bold'
  },
  textoMaior: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 20,
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
  botaoPizza: {
    position: 'absolute',
    bottom: 30,
    width: 200,
    height: 40,
    backgroundColor: 'transparent',
    borderColor: '#eee',
    borderWidth: 1,
    color: '#eee',
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  botaoTexto: {
    color: '#eee',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  switch: {
    alignSelf: 'center',
  },
  textoSwitch: {
    fontSize: 18,
    paddingBottom: 20,
    paddingTop: 20,
    color: '#eee',
    paddingLeft: 10,
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
