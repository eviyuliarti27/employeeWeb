import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'confrim-dialog.component',
  styleUrls: ['./confrim-dialog.component.scss'],
  templateUrl: 'confrim-dialog.component.html',
})
export class ConfrimDialogComponent {
    public title: string = '';
    public message: string = '';
    constructor(
    public dialogRef: MatDialogRef<ConfrimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
    
}