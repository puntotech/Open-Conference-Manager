/* import { Component, ComponentRef, Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { filter, map } from "rxjs/operators";

import { Observable } from "rxjs";
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  dialogRef: any;

  public open<T>(component: ComponentRef<T>) {
    this.dialogRef = this.dialog.open(component);
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(filter(Boolean));
  }
} */
