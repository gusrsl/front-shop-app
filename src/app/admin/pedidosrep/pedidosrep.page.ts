import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PedidoService } from 'src/app/services/pedidos.service';
import { ColDef, ColGroupDef, RowGroupingDisplayType } from 'ag-grid-community';
import { ButtonStateRendererComponent } from 'src/app/components/render/button-state.component';
import { LoadingController } from '@ionic/angular';
import { AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';

@Component({
  selector: 'app-pedidosrep',
  templateUrl: './pedidosrep.page.html',
  styleUrls: ['./pedidosrep.page.scss'],
})
export class PedidosrepPage implements OnInit {
  @ViewChild('agGridTable', { static: false }) agGridTable!: ElementRef;

  localeText = AG_GRID_LOCALE_ES;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: "ID",
    minWidth: 220,
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
    },
  };
  public groupDisplayType: RowGroupingDisplayType = "singleColumn";

  gridOptions = {
    defaultColDef: {
      sortable: true,
      //flex: 1,
      minWidth: 100,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }, rowHeight: 35,
    // Añade estas dos líneas para la configuración de agrupación
      autoGroupColumnDef: this.autoGroupColumnDef,
  };




  columnDefs: (ColDef | ColGroupDef)[] = [
      { headerName: 'Acciones', width: 100, cellRenderer: 'buttonRenderer',
        cellRendererParams: { onClick: this.ChangeState.bind(this)}, pinned: "left" },
      { field: 'id', headerName: 'ID', filter: true },
      { field: 'nombre_completo', headerName: 'Nombre Completo', filter: true },
      { field: 'fecha_pedido', headerName: 'Fecha de Pedido', filter: true },
      { field: 'estado', headerName: 'Estado', filter: true,
        cellStyle: params => params.value === 'Entregado' ? { backgroundColor: 'green', color: 'white' } : null },
      { field: 'ciudad', headerName: 'Ciudad', filter: true },
      { field: 'correo', headerName: 'Correo Electrónico', filter: true },
      { field: 'codigopostal', headerName: 'Código Postal', filter: true },
      { field: 'direccion', headerName: 'Dirección', filter: true },
      { field: 'subtotal', headerName: 'Subtotal', filter: true },
      { field: 'total', headerName: 'Total', filter: true }
  ];




  rowClassRules: any;


  rowData: any[] = [];
  listaRegistro: any;
  frameworkComponents: { buttonRenderer: typeof ButtonStateRendererComponent; };

  constructor(private pedidoService: PedidoService, private loadingController: LoadingController) {
    this.rowClassRules = {
      'sick-days-warning': function (params: any) {
        return params.data.cantpendiente > 0;
      },
      'sick-days-breach': 'data.cantpendiente==0',
    };

    this.frameworkComponents = {
      buttonRenderer: ButtonStateRendererComponent,
    }

    this.rowClassRules = {
      'sick-days-warning': function (params: any) {
        return params.data.cantpendiente > 0;
      },
      'sick-days-breach': 'data.cantpendiente==0',
    };
  }

  ngOnInit() {
    this.pedidoService.getPedidosReport().subscribe(data => {
      this.rowData = data;
      this.listaRegistro = data;
    });
  }

  updateFilter(filtro : any){
    const val = filtro.target.value.toLowerCase();
    const temp = this.listaRegistro.filter(function(d: any) {
      return !val || d.id.toLowerCase().indexOf(val) !== -1;
    });
    this.rowData = temp;
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Pedidos');

    /* Guarda el archivo */
    XLSX.writeFile(wb, 'ReporteDePedidos.xlsx');
  }

  async ChangeState(data: any) {
    const loading = await this.loadingController.create({
      message: 'Cambiando estado del pedido...',
    });
    await loading.present();

    this.pedidoService.togglePedidoEstado(data.rowData.id).subscribe({
      next: async (response) => {
        await loading.dismiss();
        console.log('Estado del pedido cambiado con éxito', response);
        this.pedidoService.getPedidosReport().subscribe(data => {
          this.rowData = data;
          this.listaRegistro = data;
        });
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Error al cambiar el estado del pedido', error);
      }
    });
  }
}
