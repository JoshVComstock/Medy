export const formatDate = (fechaDesformateada: string) => {
  const fechaObjeto = new Date(fechaDesformateada);
  const año = fechaObjeto.getFullYear();
  const mes = fechaObjeto.getMonth() + 1;
  const día = fechaObjeto.getDate();
  const fechaFormateada = `${año}-${mes < 10 ? "0" : ""}${mes}-${
    día < 10 ? "0" : ""
  }${día}`;
  return fechaFormateada;
};

export const formatDateHour = (fechaDesformateada: string) =>{
  const fechaObjeto = new Date(fechaDesformateada);
  const año = fechaObjeto.getFullYear();
  const mes = String(fechaObjeto.getMonth() + 1).padStart(2, "0");
  const dia = String(fechaObjeto.getDate()).padStart(2, "0");
  const hora = String(fechaObjeto.getHours()).padStart(2, "0");
  const minutos = String(fechaObjeto.getMinutes()).padStart(2, "0");
  const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}`;
  return fechaFormateada;
  
}