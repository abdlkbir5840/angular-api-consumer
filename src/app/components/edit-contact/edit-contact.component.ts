import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  public contact: IContact = {} as IContact;
  public groups : IGroup[] = [] as IGroup[];
  public group : IGroup = {} as IGroup;
  public errors : string | null = null;
  public idContact!: string |null;
  public constructor(private service : ContactService,
                      private router: Router,private activeRouter: ActivatedRoute){}

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((param)=>{
      this.idContact = param.get("contactId");
    })
    if(this.idContact!=null){
      this.service.getcontact(this.idContact).subscribe(
        (data)=>{
          this.contact = data;
          this.service.getGroup(this.contact).subscribe(
            (data)=>{
              this.group = data;
            }
          )
        },
        (error)=>{
          this.errors = error;
        }
      )
      this.service.getAllgroups().subscribe(
        (data)=>{
          this.groups = data;
        },
        (error)=>{
          this.errors = error;
        }
      )
    }
  }

  isEmpty(){
    return Object.keys(this.contact).length>0 && Object.keys(this.groups).length>0
  }
  public hundleEdite(){
    if(this.idContact!=null && this.contact!=null){
      this.service.editeContact(this.contact, this.idContact).subscribe(
        (data)=>{
          console.log("contact updated successfuly");
          this.router.navigateByUrl('/').then();
        },
        (error)=>{
          this.errors = error;
        }
      )
    }
  }
}
