export type RootStackParamList = {
    Auth: undefined;
    Register: undefined;
    Buscador: {
        keyword: string;
    };
    Main: { screen: keyof MainTabParamList };
};

export type MainTabParamList = {
    Home: undefined;
    Crear: undefined;
    Perfil: undefined;
    Mas: undefined;
};