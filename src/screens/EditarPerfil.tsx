import React, { useState, useEffect, Fragment } from "react";
import { useFormik, FormikProps, FormikProvider } from 'formik';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Button, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/NavigatorTypes";
import { selectImage } from "../utils/imageUtils";
import CountryPicker from "react-native-country-picker-modal";
import { RouteProp, useRoute } from "@react-navigation/native";
import { editarPerfilSchema } from "../utils/validations/editarPerfilValidations";
import { getUserById, updateUserProfile } from "../services/userService";
import { UsuarioCasted } from "../resources/user";
import { ActivityIndicator } from "react-native-paper";

type Props = { navigation: StackNavigationProp<RootStackParamList>; };
type CountryCode = "CL";
type EditarPerfilProp = RouteProp<RootStackParamList, "EditarPerfil">;

const EditarPerfil: React.FC<Props> = ({ navigation }) => {
    const route = useRoute<EditarPerfilProp>();
    const userId = route.params?.userId;

    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState<CountryCode>("CL");
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [initialValues, setInitialValues] = useState<UsuarioCasted>({
        _id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        descripcion: '',
        email: '',
        telefono: '',
        imagenDePerfil: "",
        calificacion: [],
    });

    const formik = useFormik({
        initialValues,
        validationSchema: editarPerfilSchema,
        onSubmit: async (values) => {
            await handleGuardarCambios(values);
            navigation.navigate("Main", { screen: "Mas" });
        },
        enableReinitialize: true,
    });

    // Función para eliminar el código del país del número de teléfono
    const procesarNumeroTelefono = (numeroCompleto: string) => {
        const codigoPais = '+56'; // Código de país para Chile
        if (numeroCompleto.startsWith(codigoPais)) {
            return numeroCompleto.substring(codigoPais.length); // Elimina el código del país
        }
        return numeroCompleto; // Retorna el número original si no comienza con el código del país
    };

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await getUserById(userId);
                const telefonoProcesado = procesarNumeroTelefono(userData.telefono);

                setInitialValues({
                    _id: userData._id,
                    nombre: userData.nombre,
                    apellidoPaterno: userData.apellidoPaterno,
                    apellidoMaterno: userData.apellidoMaterno,
                    descripcion: userData.descripcion,
                    telefono: telefonoProcesado,
                    email: userData.email,
                    imagenDePerfil: userData.imagenDePerfil,
                    calificacion: userData.calificacion,
                });
                if (userData.imagenDePerfil) {
                    setProfilePic(userData.imagenDePerfil);
                }
                setIsUserDataLoaded(true);
            } catch (error) {
                console.error("Error al cargar el usuario:", error);
            }
        };

        loadUserData();
    }, [userId]);

    const handleAddProfilePic = async () => {
        const { uri } = await selectImage();
        if (uri) {
            setProfilePic(uri);
        }
    };

    const handleGuardarCambios = async (values: UsuarioCasted) => {
        try {
            const profileData = {
                ...values,
                telefono: `+56${values.telefono}`,
                imagenDePerfil: profilePic,
            };
            await updateUserProfile(userId, profileData);
            Alert.alert("Perfil actualizado", "Tus cambios han sido guardados exitosamente.");
        } catch (error) {
            console.error("Hubo un error al actualizar el perfil del usuario:", error);
            Alert.alert("Error al actualizar", "No se pudieron guardar los cambios.");
        }
    };

    if (!isUserDataLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <FormikProvider value={formik}>
            <ScrollView style={styles.container}>
                <Text style={styles.headerText}>Editar perfil</Text>

                <View style={styles.profilePicContainer}>
                    <Image
                        source={profilePic ? { uri: profilePic } : require("../../assets/iconos/UserProfileRegistro.png")}
                        style={styles.profilePic}
                    />
                    <TouchableOpacity
                        style={styles.editPicTextContainer}
                        onPress={handleAddProfilePic}
                    >
                        <Text style={styles.editPicText}>Editar foto</Text>
                    </TouchableOpacity>
                </View>

                <Text>Nombre:</Text>
                <TextInput
                    placeholder="Nombree"
                    style={styles.input}
                    value={formik.values.nombre}
                    onChangeText={formik.handleChange('nombre')}
                    onBlur={formik.handleBlur('nombre')}
                />

                <Text>Apellido paterno:</Text>
                <TextInput
                    placeholder="Apellido paterno"
                    style={styles.input}
                    value={formik.values.apellidoPaterno} // vinculado al valor de Formik
                    onChangeText={formik.handleChange('apellidoPaterno')}
                    onBlur={formik.handleBlur('apellidoPaterno')}
                />

                <Text>Apellido materno:</Text>
                <TextInput
                    placeholder="Apellido materno"
                    style={styles.input}
                    value={formik.values.apellidoMaterno} // vinculado al valor de Formik
                    onChangeText={formik.handleChange('apellidoMaterno')}
                    onBlur={formik.handleBlur('apellidoMaterno')}
                />

                <Text>Descripción:</Text>
                <TextInput
                    placeholder="Descripción"
                    style={styles.input}
                    multiline
                    value={formik.values.descripcion} // vinculado al valor de Formik
                    onChangeText={formik.handleChange('descripcion')}
                    onBlur={formik.handleBlur('descripcion')}
                />

                <Text>Número telefónico:</Text>
                <View style={styles.telefonoContainer}>
                    <View pointerEvents="none">
                        <CountryPicker
                            withFilter
                            withFlag
                            withCountryNameButton
                            withCallingCode
                            withCallingCodeButton
                            countryCode={countryCode}
                            onSelect={(country) => {
                                setCountryCode(country.cca2 as CountryCode);
                            }}
                        />
                    </View>
                    <TextInput
                        maxLength={9}
                        keyboardType="number-pad"
                        style={styles.inputTelefono}
                        value={formik.values.telefono} // vinculado al valor de Formik
                        onChangeText={formik.handleChange('telefono')}
                        onBlur={formik.handleBlur('telefono')}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <View style={[styles.button, styles.roundedButton]}>
                        <Button
                            title="Cancelar"
                            color="#FF5C5C"
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={[styles.button, styles.roundedButton]}>
                        <Button
                            title="Guardar cambios"
                            color="#5CB1FF"
                            onPress={formik.submitForm}
                        />
                    </View>
                </View>
            </ScrollView>
        </FormikProvider>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editPicTextContainer: {
        marginTop: 10,
    },
    editPicText: {
        fontSize: 18,
        color: "#2476D3",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#F3F6FF",
        maxWidth: "100%",
        flexShrink: 1,
    },
    telefonoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputTelefono: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        backgroundColor: "#F3F6FF",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15
    },
    button: {
        flex: 1,
        borderRadius: 50,
        marginHorizontal: 5,
    },
    roundedButton: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        overflow: "hidden",
    },
});

export default EditarPerfil;
