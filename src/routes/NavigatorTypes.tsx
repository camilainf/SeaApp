import {ServicioData} from '../resources/service'
export type RootStackParamList = {
    Auth: undefined;
    Register: undefined;
    Buscador: {
        keyword: string;
    };
    Servicio: ServicioData;
    Main: { screen: keyof MainTabParamList };
    TerminosCondiciones: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Crear: undefined;
    Perfil: undefined;
    Mas: undefined;
};