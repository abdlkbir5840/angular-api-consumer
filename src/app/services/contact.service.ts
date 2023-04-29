import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/IContact';

import {Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //data based url
  private serverUrl : string = "http://localhost:9000";
  //injecter HttpClient (axios in react js)
  constructor(private httpClient: HttpClient) { }

  //Get all contact from db
  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataUrl).pipe(
      catchError(this.hundleError)
    );
  }
  //get single contact
  public getcontact(idContact: string):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${idContact}`
    return this.httpClient.get<IContact>(dataUrl).pipe(
      catchError(this.hundleError)
    );
  }
  //update contact
  public editeContact(Contact: IContact, contactId: string):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataUrl, Contact).pipe(
      catchError(this.hundleError)
    );
  }

  //create a contact
  public createContact(contact: IContact):Observable<IContact>{
    let dataUrl: string = `${this.serverUrl}/contacts/`;
    return this.httpClient.post<IContact>(dataUrl, contact).pipe(
      catchError(this.hundleError)
    );
  }

  //delete contact
  public deleteContact(contactId: string):Observable<{}>{
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(
      catchError(this.hundleError)
    )
  }

  //get all groups
  public getAllgroups():Observable<IGroup[]>{
    let dataUrl: string = `${this.serverUrl}/groups`
    return this.httpClient.get<IGroup[]>(dataUrl).pipe(
      catchError(this.hundleError)
    )
  }
  //get single group
  public getGroup(contact: IContact):Observable<IGroup>{
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`
    return this.httpClient.get<IGroup>(dataUrl).pipe(
      catchError(this.hundleError)
    );
  }

  public hundleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage = `Error : ${error.error.message}`;
    }else{
      //server error
      errorMessage = `Status : ${error.status}` +"......" +` Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
