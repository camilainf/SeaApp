import { Alert } from "react-native";
import { Oferta, Postoferta } from "../resources/offer";
import { updateServiceStatus } from "./serviceService";

// const BASE_URL = 'http://10.0.2.2:9000/api/offers';
// const BASE_URL = 'http://192.168.0.112:9000/api/offers';
const BASE_URL = 'https://seajob-2a7634f714d7.herokuapp.com/api/offers';

export const getOffersByServiceId = async (serviceId: string) : Promise<Oferta[]>=> {
    const response = await fetch(BASE_URL+"/getOfferOfService/"+serviceId);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener las ofertas de este servicio");
      }
    const offersData = await response.json();
    const offers: Oferta[] = offersData.map((offer: any) => ({
        id: offer._id,
        idServicio: offer.idServicio,
        idCreadorOferta: offer.idCreadorOferta,
        montoOfertado: offer.montoOfertado,
        estaEscogida: offer.estaEscogida
    }));
    return offers;
}
export const getOfferAcceptedByServiceId = async (serviceId: string): Promise<Oferta>=> {
    const response = await fetch(BASE_URL + '/getOfferAceptedOfService/' + serviceId);
    if (!response.ok){
        console.log("Servicio sin oferta aceptada o no la encuentra");
    }
    const offer = await response.json();
    return offer;
}

export const postOffer = async (offer: any) => {
    try {
        const response = await fetch(BASE_URL + '/createOffer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${YOUR_USER_TOKEN}` Si necesitas autenticación.
            },
            body: JSON.stringify(offer),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al crear la oferta.');
        }

        return data;
    } catch (error) {
        throw error;
    }
}



export const handleAceptarOferta = async (Offerta : Oferta | null) => {
    if (Offerta === null) {
        throw new Error("Id de oferta inválido");
    }
    try {
        const response = await fetch(BASE_URL + '/acceptAnOffer/'+Offerta.id , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${YOUR_USER_TOKEN}` Si necesitas autenticación.
            },
            body: JSON.stringify(Offerta),
            
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al aceptar la oferta.');
        }
        return data;
    } catch (error) {
        throw error;
    }
};


export const handlePublicarOfertas = async (idServicio: string |null,ofertaValue:string,userToken :string|null) => {
    if (idServicio && ofertaValue && userToken) {
      try {
        const postOferta = {
          idCreadorOferta: userToken,
          idServicio: idServicio,
          montoOfertado: parseInt(ofertaValue),
        };

        const response = await postOffer(postOferta);

        // Si llegas aquí, la oferta se ha creado correctamente
        Alert.alert("Oferta creada", "Tu oferta ha sido creada con éxito!", [
          {
            text: "Ok",
            onPress: () => console.log("Oferta creada con éxito"),
          },
        ]);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Hubo un error al crear la oferta:", error.message);
          Alert.alert(
            "Error",
            error.message ||
              "Hubo un problema al crear la oferta. Por favor intenta nuevamente.",
            [
              {
                text: "Ok",
                onPress: () => console.log("Error al crear oferta"),
              },
            ]
          );
        } else {
          console.error("Hubo un error al crear la oferta:", error);
          Alert.alert(
            "Error",
            "Hubo un problema al crear la oferta. Por favor intenta nuevamente.",
            [
              {
                text: "Ok",
                onPress: () => console.log("Error al crear oferta"),
              },
            ]
          );
        }
      }
    } else {
      Alert.alert(
        "Error",
        "Asegúrate de haber ingresado todos los datos necesarios.",
        [
          {
            text: "Ok",
            onPress: () => console.log("Datos incompletos"),
          },
        ]
      );
    }
  };
  