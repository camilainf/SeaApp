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
        <Text style={styles.header}>Creación de solicitud 💼</Text>
        <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              En este apartado podrás crear una solicitud de servicio que necesites, tal como una petición de gasfitería, pasear a tu mascota, una sesión de fotos, entre muchas otras!
            </Text>
        </View>
        <View style={styles.separator} />

        <Text style={styles.label}>Nombre del servicio</Text>
        <TextInput
            placeholder="Ejemplo: Corte de pasto"
            value={nombreServicio}
            onChangeText={setNombreServicio}
            style={styles.input}
        />

        <Text style={styles.label}>Categoría</Text>
        <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue.toString())}
        style={styles.picker}
      >
        <Picker.Item label="Categoria 1" value="cat1" />
        <Picker.Item label="Categoria 2" value="cat2" />
        {/* Agrega más categorías según lo necesites */}
      </Picker>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
        placeholder="Descripción del servicio"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                    placeholder="DD/MM/YY"
                    value={fechaSolicitud}
                    onChangeText={setFechaSolicitud}
                    style={styles.input}
                />
            </View>
            <View style={styles.column}>
                <Text style={styles.label}>Hora</Text>
                <TextInput
                    placeholder="HH:MM"
                    value={horaSolicitud}
                    onChangeText={setHoraSolicitud}
                    style={styles.input}
                />
            </View>
        </View>

        <Text style={styles.label}>Dirección del servicio</Text>
        <TextInput
            placeholder="Ejemplo: Calle Falsa 123"
            value={direccion}
            onChangeText={setDireccion}
            style={styles.input}
        />

        <Text style={styles.label}>Monto del servicio</Text>
        <TextInput
            placeholder="$0.00"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
            style={styles.input}
        />

        <Button title="Agregar Imagen" onPress={() => console.log("Se presionó botón de imagen")} />

        <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={cancelar} color="#FF6B6B" />
            <Button title="Guardar" onPress={guardar} color="#4E479A" />
        </View>

        <Modal isVisible={isModalVisible}>
            // ... [Contenido del Modal]
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
header: {
    fontSize: 24,
    color: '#66638C',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centramos el título
},
infoBox: {
    backgroundColor: '#F3F6FF',
    padding: 15,
    borderRadius: 10,  // Bordes más redondeados para un mejor UX
    marginBottom: 20,
},
infoText: {
    color: '#5A5966',
    fontSize: 16,  // Aumentamos un poco el tamaño para mejorar legibilidad
    textAlign: 'justify',
},
separator: {
    height: 1,
    backgroundColor: '#7D7B8C',
    marginVertical: 20,
},
label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
},
input: {
    height: 45,  // Un poco más alto para mejor sensación al tocar
    borderColor: '#DDD',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,  // Bordes más redondeados para un mejor UX
    marginBottom: 20,
},
picker: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 10,  // Bordes más redondeados para un mejor UX
    marginBottom: 20,
},
row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
},
column: {
    flex: 1,
    marginRight: 10,
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
    borderRadius: 10,  // Bordes más redondeados para un mejor UX
},
});

export default Crear;