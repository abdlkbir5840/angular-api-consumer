import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  public louding: boolean = false;
  public contact: IContact = {} as IContact;
  public errors: string |null = null;
  public groups: IGroup[] = [] as IGroup[];
  public constructor(private service: ContactService, private router: Router){}

  ngOnInit(): void {
    this.service.getAllgroups().subscribe(
      (data)=>{
        this.groups = data
      },
      (error)=>{
        this.errors = error;
      }
    )
  }

  createConatct(){
    this.service.createContact(this.contact).subscribe(
      (dat)=>{
        console.log("Contact added successfuly");
        this.router.navigateByUrl("/contact/admin").then();
      },
      (error)=>{
        this.errors = error;
        console.log(error)
      }
    )
  }

}
