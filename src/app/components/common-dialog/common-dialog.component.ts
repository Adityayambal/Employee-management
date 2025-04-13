import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialog',
  standalone: false,
  templateUrl: './common-dialog.component.html',
  styleUrl: './common-dialog.component.css'
})
export class CommonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.type !== 'pending') {
      this.close()
    } 
  }

  close(): void {
    setTimeout(() => {
    this.dialogRef.close();
  }, 1500);
  }
  closedialog(data:any){
    if (data == 0) {
      this.dialogRef.close(true);
    }else{
      this.dialogRef.close(false);
    }

  }
}
