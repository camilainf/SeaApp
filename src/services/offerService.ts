import { Oferta } from "../resources/offer";

const BASE_URL = 'http://10.0.2.2:9000/api/offers';


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
export const getOfferAcceptedByServiceId = (serviceId: string) => {}
  
  