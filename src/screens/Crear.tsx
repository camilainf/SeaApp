import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

const Crear: React.FC = () => {
  const [nombreServicio, setNombreServicio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaSolicitud, setFechaSolicitud] = useState('');
  const [horaSolicitud, setHoraSolicitud] = useState('');
  const [direccion, setDireccion] = useState('');
  const [monto, setMonto] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = (message: string) => {
    Alert.alert(message);
    setModalVisible(!isModalVisible);
  };

  const guardar = () => {
    const servicio = {
      nombreServicio,
      categoria,
      descripcion,
      fechaSolicitud: `${fechaSolicitud} ${horaSolicitud}`,
      direccion,
      monto,
      // La imagen será agregada posteriormente
    };
    console.log(servicio);
    toggleModal('Servicio creado con éxito');
  };

  const cancelar = () => {
    toggleModal('Creación del servicio cancelada');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre del servicio"
        value={nombreServicio}
        onChangeText={setNombreServicio}
        style={styles.input}
      />
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue.toString())}
        style={styles.picker}
      >
        <Picker.Item label="Categoria 1" value="cat1" />
        <Picker.Item label="Categoria 2" value="cat2" />
        {/* Agrega más categorías según lo necesites */}
      </Picker>
      <TextInput
        placeholder="Descripción del servicio"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <TextInput
        placeholder="Fecha de solicitud (DD/MM/YY)"
        value={fechaSolicitud}
        onChangeText={setFechaSolicitud}
        style={styles.input}
      />
      <TextInput
        placeholder="Hora de la solicitud (HH:MM)"
        value={horaSolicitud}
        onChangeText={setHoraSolicitud}
        style={styles.input}
      />
      <TextInput
        placeholder="Dirección del servicio"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />
      <TextInput
        placeholder="Monto del servicio"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Agregar Imagen" onPress={() => {}} />
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={guardar} color="#4E479A" />
        <Button title="Cancelar" onPress={cancelar} color="#FF6B6B" />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Operación exitosa</Text>
          <Button title="Ok" onPress={() => toggleModal('')} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Crear;
