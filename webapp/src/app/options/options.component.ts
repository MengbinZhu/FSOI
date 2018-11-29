import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit
{
  constructor(public dialogRef: MatDialogRef<OptionsComponent>, @Inject(MAT_DIALOG_DATA) public data: object)
  {
  }

  ngOnInit()
  {
  }

  selectAll(): void
  {
    for (let i = 0; i < this.data['options'].length; i++)
    {
      this.data['options'][i].selected = true;
    }
  }

  unselectAll(): void
  {
    for (let i = 0; i < this.data['options'].length; i++)
    {
      this.data['options'][i].selected = false;
    }
  }

  invertSelection(): void
  {
    for (let i = 0; i < this.data['options'].length; i++)
    {
      this.data['options'][i].selected = !this.data['options'][i].selected;
    }
  }

  closeDialog(): void
  {
    this.dialogRef.close();
  }
}
