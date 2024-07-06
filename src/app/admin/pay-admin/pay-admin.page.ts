import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/paymentdata.service';
import { 	AG_GRID_LOCALE_ES } from '@ag-grid-community/locale';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pay-admin',
  templateUrl: './pay-admin.page.html',
  styleUrls: ['./pay-admin.page.scss'],
})
export class PayAdminPage implements OnInit {
  paymentIntents: any;
  charges: any;
  localeText = AG_GRID_LOCALE_ES;



  paymentIntentsColumnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Amount', field: 'amount', valueFormatter: this.currencyFormatter, sortable: true, filter: true },
    { headerName: 'Currency', field: 'currency', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', cellRenderer: this.statusRenderer, sortable: true, filter: true },
    { headerName: 'Created', field: 'created', valueFormatter: this.dateFormatter, sortable: true, filter: true }
  ];

  chargesColumnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Amount', field: 'amount', valueFormatter: this.currencyFormatter, sortable: true, filter: true },
    { headerName: 'Currency', field: 'currency', sortable: true, filter: true },
    { headerName: 'Status', field: 'status', cellRenderer: this.statusRenderer, sortable: true, filter: true },
    { headerName: 'Created', field: 'created', valueFormatter: this.dateFormatter, sortable: true, filter: true },
    { headerName: 'Receipt URL', field: 'receipt_url', cellRenderer: this.receiptUrlRenderer, sortable: true, filter: true }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,

  };


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getAllPaymentIntents().subscribe(data => {
      this.paymentIntents = data;
      console.log('paymentIntents', this.paymentIntents.data);
    });

    this.cartService.getAllCharges().subscribe(data => {
      this.charges = data;
      console.log('charges', this.charges.data);
    });
  }

  currencyFormatter(params: any) {
    return `$${(params.value / 100).toFixed(2)}`;
  }

  dateFormatter(params: any) {
    const date = new Date(params.value * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  statusRenderer(params: any) {
    const status = params.value;
    const color = status === 'succeeded' ? 'green' : 'red';
    return `<span style="color: ${color}; font-weight: bold;">${status}</span>`;
  }

  receiptUrlRenderer(params: any) {
    return `<a href="${params.value}" target="_blank">View Receipt</a>`;
  }

  exportToExcelCharges() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.charges.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Pedidos');

    /* Guarda el archivo */
    XLSX.writeFile(wb, 'ReporteDePedidos.xlsx');
  }

  exportToExcelIntents() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.paymentIntents.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Pedidos');

    /* Guarda el archivo */
    XLSX.writeFile(wb, 'ReporteDePedidos.xlsx');
  }
}
