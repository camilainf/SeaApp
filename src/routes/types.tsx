export type RootStackParamList = {
    Auth: undefined;
    Register: undefined;
    Main: { screen: keyof MainTabParamList };
};

export type MainTabParamList = {
    Home: undefined;
    Explorar: undefined;
    Perfil: undefined;
    Registro: undefined;
    Salir: undefined;
};