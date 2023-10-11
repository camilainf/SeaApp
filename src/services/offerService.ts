import { Oferta, Postoferta } from "../resources/offer";

const BASE_URL = 'http://10.0.2.2:9000/api/offers';
export interface OfferResponse {
    success?: boolean;
    message?: string;
    // Otros campos que pueda devolver tu back-end
  }
  

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al obtener la oferta aceptada de este servicio");
    }
    const offer = await response.json();
    return offer;
}

export const postOffer = async (offer: any): Promise<OfferResponse> => {
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


  
  