import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export default class Login extends React.Component {
  render() {
    return (
      <View style={this.style.container}>
        <Text>Usuário</Text>
        <TextInput />
        <Text>Senha</Text>
        <TextInput />
      </View>
    );
  }

  style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#999"
    },
  });
}
