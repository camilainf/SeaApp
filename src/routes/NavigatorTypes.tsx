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
    ServiciosPorCategoria: {
        categoria: string;
    };
    PerfilAjeno: {
        id: string;
    };
};

export type MainTabParamList = {
    Home: undefined;
    Crear: undefined;
    Perfil: {
        id?: string;
    };
    Mas: undefined;
};