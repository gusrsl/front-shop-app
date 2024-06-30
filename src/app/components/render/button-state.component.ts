
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
  <ion-button fill="clear"  size="small" (click)="onClick($event)" color="success">
    <ion-icon name="reload-outline"></ion-icon>
  </ion-button>
  `,
  styleUrls: ['./button-edit.component.scss']
})

//<ion-button fill="clear"  size="small" (click)="onClick3($event)" color="primary">
  //  <ion-icon slot="icon-only" name="open"></ion-icon>
// </ion-button>


export class ButtonStateRendererComponent implements ICellRendererAngularComp {
//<button type="button" (click)="onClick($event)">{{label}}</button>
  params: any;
  label: string | undefined;

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }

  onClick2($event: any) {
    if (this.params.onClick2 instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick2(params);

    }
  }

  onClick3($event: any) {
    if (this.params.onClick3 instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick3(params);

    }
  }


}
