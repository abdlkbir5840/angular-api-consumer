import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent {
  public louding: boolean = false;
  public contacts: IContact[] = [];
  public errors!: Error;
  public search: string = "";
  public constructor(private service : ContactService, private router: Router){}

  ngOnInit(): void {
    this.gettAllContact();
  }
  public gettAllContact(){
    this.louding  =true;
    this.service.getAllContacts().subscribe(
      (data)=>{
        this.contacts = data;
        this.louding = false;
      },
      (error)=>{
        this.errors = error;
        this.louding = false;
      }
      )
  }
  public hundleDelete(contactId: string |undefined){
    if(contactId!=null){
      let contact: IContact;
      this.service.getcontact(contactId).subscribe(
        (data)=>{
          let contact = data;
        }
      ) 
        this.service.deleteContact(contactId).subscribe(
        (data)=>{
          console.log("contact deleted successfuly");
          let index = this.contacts.indexOf(contact);
          this.contacts.splice(index,1);
        },
        (error)=>{
          this.errors = error;
        }
      )
    }
    
  }

  public hundleSearch(){
    console.log(this.search);
    if(this.search!=""){
      console.log("on input")
      let results = this.contacts.filter(contact=>contact.name.includes(this.search));
      this.contacts = results;
    }else{
      this.gettAllContact();
    }
  }
}
