export enum CrudMessage {
  UpdateSuccess = 'Se ha actualizado el registro correctamente',
  PostSuccess = 'Se ha creado el registro correctamete',
  DeleteSucces = 'Se ha eliminado el registro correctamene',
  GetSuccess = 'Se ha encontrado el registro correctamente',
  UpdateError = 'No se ha podido actualizar el registro',
  PostError = 'Ya existe el registro',
  GetError = 'No se ha podido encontrar el registro',
  DeleteError = 'No se ha podido elimar el registro',
  ErrorServer = 'Error del registro',
}
