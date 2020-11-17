import React, {Component, useState} from 'react';
import {
  Platform,
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';

import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const inicialState = {desc: '', date: new Date(), showDatePicker: false};

export default class AddTask extends Component {
  state = {
    ...inicialState,
  };

  save = () => {
        const newTask ={
            desc: this.state.desc,
            date: this.state.date
        }
        
        this.props.onSave && this.props.onSave(newTask)
        this.setState({...inicialState})
  }

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format(
      'ddd, D [de] MMMM [de] YYYY',
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <Text style={styles.headerModal}>NovaTarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Informe a Descrição"
              onChangeText={(text) => this.setState({desc: text})}
              value={this.state.desc}
            />
            {this.getDatePicker()}
            <View style={styles.buttons}>
              <TouchableOpacity onPress={this.props.onCancel}>
                <Text style={styles.button}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.save}>
                <Text style={styles.button}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this.props.onCancel}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '95%',
  },
  headerModal: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.color.today,
    color: commonStyles.color.secondary,
    fontSize: 15,
    textAlign: 'center',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    marginTop: 10,
    margin: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
