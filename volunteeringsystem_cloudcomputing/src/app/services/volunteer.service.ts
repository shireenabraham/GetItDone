import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private volunteerCollection: AngularFirestoreCollection<User>;
  userId: string;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.volunteerCollection = db.collection<User>('volunteers');
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userId = user.uid;
      }
    })
  }

  createVoluteer(volunteer: User) {
    if(this.userId && !volunteer.userId){
      volunteer.userId = this.userId;
    }
    
    return this.volunteerCollection.doc(volunteer.userId).set({
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      address: volunteer.address,
      zip: volunteer.zip,
      email: volunteer.email,
      phone: volunteer.phone,
      latestLng: volunteer.latestLng,
      latestLat: volunteer.latestLat
    });
  } 

}
