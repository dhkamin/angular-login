import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ListtodoService } from '../listtodo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {


  
  id: string;
  
  done:boolean;
  date:Date;
  constructor(public dialog: MatDialog,private listtodoService: ListtodoService,private router: Router) {}
  
  errMessage = "" ;
  openDialog(): void {
       this.id = this.listtodoService.useJwtHelper();
    this.done=false;
    this.date= new Date();
    let dialogRef = this.dialog.open(FormtodoComponent, {
      width: '60%',
      data: { 
       id:this.id,
      
       done:this.done,
       date:this.date
       }
    });

    dialogRef.afterClosed().subscribe(result => {
   
        result={
          id:result.id,
          title:result.title,
          description:result.description,
          done:result.done,
          date:result.date,
         
        };
      console.log('The dialog was closed', result);
      this.listtodoService.addTodo(result)
      .subscribe((res) => {
        if (res === true) {
          this.router.navigateByUrl('');
        } else {
          this.errMessage = res;
        }
      });
    });
  }

  ngOnInit() {
  }

}
@Component({
  selector: 'formtodo',
  templateUrl:'formtodo.html',
  styleUrls: ['formtodo.css']
})
export class FormtodoComponent {
  
 
  constructor(
    public dialogRef: MatDialogRef<FormtodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private _formBuilder: FormBuilder) {
      
     }

  onNoClick(): void {
    this.dialogRef.close();
  
  }


}