import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  // Servicio que se encarga de mostrar un mensaje de confirmación antes de eliminar un elemento usando la biblioteca SweetAlert2
  confirmAndDelete(
    id: number,
    entityName: string,
    deleteFn: (id: number) => Observable<void>,
    successCallback: () => void,
    errorCallback?: (error: any) => void,
  ): void {
    Swal.fire({
      title: `Are you sure you want to delete ${entityName} with ID #${id}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFn(id).subscribe({
          next: () => {
            successCallback();
            Swal.fire({
              title: 'Deleted!',
              text: `${entityName} with ID #${id} has been deleted.`,
              icon: 'success',
            });
          },
          error: (err) => {
            console.log('ERROR', err);
            if (errorCallback) {
              errorCallback(err);
            }
            Swal.fire({
              title: 'Error!',
              text: `An error occurred while deleting ${entityName}.`,
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
