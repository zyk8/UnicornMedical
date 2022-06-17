import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FhirUtilService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-master-item-view',
  templateUrl: './master-item-view.component.html',
  styleUrls: ['./master-item-view.component.scss'],
})
export class MasterItemViewComponent implements OnInit {
  constructor(
    private readonly fhirUtilService: FhirUtilService,
    public dialogRef: MatDialogRef<MasterItemViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    this.data.masterItemData = this.fhirUtilService.prepareData(this.data.masterItemData);
  }
}
