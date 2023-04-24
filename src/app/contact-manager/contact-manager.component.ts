import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading = false;
  public contacts: MyContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactData()
  }
    

getAllContactData(){

  this.loading = true;
  this.contService.getAllContacts().subscribe(
    (data: MyContact[]) => {
      this.contacts = data;
      this.loading = false;
    },
  

    error => {
      console.error(error);
      this.errorMessage = error;
      this.loading = false;
    }
  );



}

  deleteContact(contactId:string |undefined){
 if(contactId){
  console.log(contactId)
  this.contService.DeleteContacts(contactId).subscribe((data:{})=>{
    this.getAllContactData();
  },(error)=>{
    this.errorMessage =error;
  })
 }
  }
  }

