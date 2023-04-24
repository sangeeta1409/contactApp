import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: MyContact = {} as MyContact;
  public errorMessage: string | null = null;
  public groups: MyGroup[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contservice: ContactService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });
    if (this.contactId) {
      this.contservice.getContacts(this.contactId).subscribe(
        (data: MyContact) => {
          this.contact = data;
          this.loading = false;
          this.contservice.getAllGroups().subscribe((data: MyGroup) => {
            this.groups.push(data);
          });
          
          });
        }
        (error:any) => {
          this.errorMessage = error;
          this.loading = false;
        }
      ;
    }
 
public  submitUpdate(){
  if(this.contactId){
  this.contservice.UpdateContacts(this.contact,this.contactId).subscribe((data:MyContact)=>{
    this.router.navigate(['/']).then();
  },(error:any)=>{
    this.errorMessage=error;
    this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
  })
 }
 
 
 
 
  }
}
