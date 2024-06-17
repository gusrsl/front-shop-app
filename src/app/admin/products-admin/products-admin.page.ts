/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Injector, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { ButtonEditRendererComponent } from 'src/app/components/render/button-edit.component';
import { ProductosService } from 'src/app/services/productos.service';
import { CrudProductsAdminPage } from '../crud-products-admin/crud-products-admin.page';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.page.html',
  styleUrls: ['./products-admin.page.scss'],
})
export class ProductsAdminPage implements OnInit {

  frameworkComponents: any;
  gridOptions = {
    defaultColDef: {
      sortable: true,
      //flex: 1,
      minWidth: 100,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }, rowHeight: 35
  };
  rowData:any;
  listaRegistro:any;
  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Acciones', width: 100, cellRenderer: 'buttonRenderer',
      cellRendererParams: { onClick: this.editar.bind(this), onClick2: this.eliminar.bind(this) }, pinned: "left" },
    {headerName: 'ID', field: 'uu_id', sortable: true, filter: 'agTextColumnFilter', width: 250},
    {headerName: 'Código Alfa', field: 'codigo_alfa', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Descripción', field: 'descripcion', sortable: true, filter: 'agTextColumnFilter', width: 200},
    {headerName: 'Precio', field: 'precio', sortable: true, filter: 'agNumberColumnFilter', width: 100},
    {headerName: 'Graba IVA', field: 'graba_iva', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Marca', field: 'marca', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Color 1', field: 'color_1', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Color 2', field: 'color_2', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Válido', field: 'valido', sortable: true, filter: 'agTextColumnFilter', width: 100},
    {headerName: 'Días de Entrega', field: 'dias_entrega', sortable: true, filter: 'agNumberColumnFilter', width: 150},
    {headerName: 'ID de Envío', field: 'id_envio', sortable: true, filter: 'agNumberColumnFilter', width: 100},
    {headerName: 'ID de Categoría', field: 'id_cat_niv3', sortable: true, filter: 'agNumberColumnFilter', width: 150},
    {headerName: 'Fecha de Creación', field: 'fecha_creacion', sortable: true, filter: 'agDateColumnFilter', width: 200},
    {headerName: 'Producto Destacado', field: 'producto_destacado', sortable: true, filter: 'agTextColumnFilter', width: 150},
    {headerName: 'Estado', field: 'idestado', sortable: true, filter: 'agNumberColumnFilter', width: 100}
  ];
  rowClassRules;

  constructor(
    private injector:Injector,
    public modalCtrl: ModalController,
     public productosService: ProductosService,
      private loadingController: LoadingController,
      private toastController: ToastController
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonEditRendererComponent,
    }

    this.rowClassRules = {
      'sick-days-warning': function (params: any) {
        return params.data.cantpendiente > 0;
      },
      'sick-days-breach': 'data.cantpendiente==0',
    };

    this.obtenerRegistros()
  }

  ngOnInit() {
  }

  async showMessage(messagex: any , positionx: any = "bottom", colorx = undefined, durationx = 2000) {
    const toast = await this.toastController.create({
      message: messagex,
      position: positionx,
      duration: durationx,
      color: colorx,
      // showCloseButton:durationx == 0
    })
    await toast.present();
  }

  async obtenerRegistros(){
    try {
      const loading = await this.loadingController.create({
        duration: 5000,
        message: 'Por favor espera...',
        cssClass: 'my-custom-class'
      });
      await loading.present();

      this.productosService.getAllProducts().subscribe(
        (resp: any[]) => {
          console.log('Produtos', resp);
          this.rowData = resp;
          this.listaRegistro = resp
          loading.dismiss(); // Oculta el indicador de carga
        },
        error => {
          // this.showMessage(error.error == undefined ? error.message : error.error, "middle", "danger")
          loading.dismiss(); // Asegúrate de ocultar el indicador de carga incluso si ocurre un error
        }
      );
    } catch (error) {
      // maneja cualquier otro error aquí
    }
  }

  editar(data: any){
    this.mostrarCrud(data.rowData.idcontramuestras)
  }

  async eliminar(data: any){

  }

  async mostrarCrud(id : any){
    const modal = await this.modalCtrl.create({
      component: CrudProductsAdminPage, backdropDismiss:false, cssClass:'modal-90',
      componentProps: { idregistro: id }
    });
    modal.onDidDismiss().then(data => {
      this.obtenerRegistros();
    })
    return await modal.present();
  }

  updateFilter(filtro : any){
    const val = filtro.target.value.toLowerCase();
    const temp = this.listaRegistro.filter(function(d: any) {
      return !val || d.fecha.toLowerCase().indexOf(val) !== -1 || d.estado.toLowerCase().indexOf(val) !== -1
      || d.fentrega.toLowerCase().indexOf(val) !== -1 || d.frevision.toLowerCase().indexOf(val) !== -1
      || d.fecha_produccion.toLowerCase().indexOf(val) !== -1 || d.inspector.toLowerCase().indexOf(val) !== -1 ;
    });
    this.rowData = temp;
  }
}
