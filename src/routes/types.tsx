export type RootStackParamList = {
    Auth: undefined;
    Register: undefined;
    Main: { screen: keyof MainTabParamList };
};

export type MainTabParamList = {
    Home: undefined;
    Crear: undefined;
    Perfil: undefined;
    Mas: undefined;
    Salir: undefined;
};