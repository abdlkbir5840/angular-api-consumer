import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent {
  public louding: boolean = false;
  public contactId!: string | null;
  public conatct: IContact = {} as IContact;
  public group: IGroup = {} as IGroup;
  public errors: string = ''
  public constructor(private service: ContactService , private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.louding = true;
    this.activeRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId');
    })
    if(this.contactId!=null){
        this.service.getcontact(this.contactId).subscribe(
        (data)=>{
          this.conatct = data
          this.service.getGroup(this.conatct).subscribe(
            (data)=>{
              this.group = data;
              this.louding = false
            }
          )
        },(error)=>{
          console.log(error)
          this.errors = error;
          this.louding = false
        }
        )
    }
  }

  public isEmpty(){
    return Object.keys(this.conatct).length>0 && Object.keys(this.group).length>0;
  }
}
