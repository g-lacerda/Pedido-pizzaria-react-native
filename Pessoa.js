import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Pessoa extends Component {
    render() {
        return (
            <View>

                <Text style={styles.texto}>

                    {this.props.data.nome}, {this.props.data.idade} anos, {"\n"}{this.props.data.email}{"\n"}

                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    texto: {
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 20,
        paddingTop: 50,
        color: '#eee',
        fontWeight: 'bold'
    },
});

export default Pessoa;