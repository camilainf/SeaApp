export type RootStackParamList = {
    Auth: undefined;
    Registro: undefined;
    Buscador: {
        keyword: string;
    };
    Servicio: {
        id: string
    };
    Main: { screen: keyof MainTabParamList };
    TerminosCondiciones: undefined;
    ServiciosPorCategoria: {
        categoria: string;
    };
    ListaServicios: {
        categoria: string;
    };
    PerfilAjeno: {
        id: string;
    };
    EditarServicio: {
        servicioId: string;
    }
    EditarPerfil: {
        userId: string;
    };

    Categorias: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Crear: undefined;
    Perfil: {
        id?: string;
    };
    Mas: undefined;
};