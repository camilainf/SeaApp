type Valoracion = {
  id: string;
  idServicio: string;
  idDueñoServicio: string;
  idTrabajadorServicio: string;
  dueñoValoro: boolean;
  trabajadorValoro: boolean;
};
type ValoracionCreacion = { idServicio: string; idDueñoServicio: string; idTrabajadorServicio: string };

export { Valoracion, ValoracionCreacion };
