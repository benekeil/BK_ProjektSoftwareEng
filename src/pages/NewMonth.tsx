import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
 
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonDatetime,
  IonButton,
  
} from '@ionic/react';
import {calendar, cash } from 'ionicons/icons';
import React from 'react';
import './Tab1.css';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';

/**
 * Klasse bzw Komponente um die Seite der Monats Eingabe darzustellen
 * Erhällt Methoden (getMonth, getStartbudget, pushMonthObj) von App Komponente als Props
 */
interface IState {
month: string;
startbudget: string;
}

interface IProps {
  getMonth: (event: CustomEvent<DatetimeChangeEventDetail>)=>void;
  getStartbudget: (event: CustomEvent<InputChangeEventDetail>)=>void;
  pushMonthObj: ()=>void;

}

class NewMonth extends React.Component<IProps, IState>  {
state: IState ={
  startbudget: "",
  month: "test"
}



  public render(){
   

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Month</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="welcome">
        <IonCard className="welcome-card">
          <img src="/assets/money.jpg" alt="" />
         
          <IonCardContent>
            <p>
              Starten Sie einen neuen Monat, der aktuelle Monat wird dadurch abgeschlossen.</p>
              Eine Übersicht über alle begonnen Monate finden Sie bei "Month Review".
            
          </IonCardContent>
        </IonCard>
        </div>

       
        
            
          
          <IonItem >
            <IonIcon slot="start" color="medium" icon={calendar} />
            <IonDatetime displayFormat="MMMM YY" pickerFormat="MMMM YY" mode="md" monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"   min="2019-01" max="2030-12" placeholder="Select Month" onIonChange={this.props.getMonth} ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="medium" icon={cash} />
            <IonInput type="number" placeholder="Select Startbudget"  inputMode="numeric" onIonChange={this.props.getStartbudget}></IonInput>
            </IonItem>
        
            <IonButton color="secondary" expand="block" routerLink="/newInput" onClick={this.props.pushMonthObj}>Start Month</IonButton>
          
        
      </IonContent>
    </IonPage>
  );
};
}
export default NewMonth;
