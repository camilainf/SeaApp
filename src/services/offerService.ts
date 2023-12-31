import { Alert } from "react-native";
import { Oferta } from "../resources/offer";
import { BASE_URL } from "@env";

const URL = "http://10.0.2.2:9000/api" + '/offers';

export const getOffersByServiceId = async (serviceId: string): Promise<Oferta[]> => {
  const response = await fetch(URL + "/getOfferOfService/" + serviceId);
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
export const getOfferAcceptedByServiceId = async (serviceId: string): Promise<Oferta> => {
  const response = await fetch(URL + '/getOfferAceptedOfService/' + serviceId);
  if (!response.ok) {
    console.log("Servicio sin oferta aceptada o no la encuentra");
  }
  const offer = await response.json();
  return offer;
}

export const postOffer = async (offer: any) => {
  try {
    const response = await fetch(URL + '/createOffer', {
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

export const handleAceptarOferta = async (Offerta: Oferta | null) => {
  if (Offerta === null) {
    throw new Error("Id de oferta inválido");
  }
  try {
    const response = await fetch(URL + '/acceptAnOffer/' + Offerta.id, {
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


export const handlePublicarOfertas = async (
  idServicio: string | null, 
  ofertaValue: string, 
  userToken: string | null,
  showAlert: (title: string, message: string) => void
) => {

  if (idServicio && ofertaValue && userToken) {
    try {
      const postOferta = {
        idCreadorOferta: userToken,
        idServicio: idServicio,
        montoOfertado: parseInt(ofertaValue),
      };

      const response = await postOffer(postOferta);
      showAlert("Oferta creada ✅", "Tu oferta ha sido creada con éxito!");

    } catch (error) {
      if (error instanceof Error) {
        console.error("Hubo un error al crear la oferta:", error.message);
        showAlert("Error", error.message || "Hubo un problema al crear la oferta. Por favor intenta nuevamente.");

      } else {
        console.error("Hubo un error al crear la oferta:", error);
        showAlert("Error", "Hubo un problema al crear la oferta. Por favor intenta nuevamente.");
      }
    }
  } else {
    showAlert("Error", "Asegúrate de haber ingresado todos los datos necesarios.");
  }
};
