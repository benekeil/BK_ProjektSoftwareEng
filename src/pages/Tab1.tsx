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
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonDatetime,
  IonButton,
  IonButtons
} from '@ionic/react';
import {calendar, cash } from 'ionicons/icons';
import React from 'react';
import './Tab1.css';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';


interface IState {
month: string;
startbudget: string;
}

interface IProps {
  getMonth: (event: CustomEvent<DatetimeChangeEventDetail>)=>void;
  getStartbudget: (event: CustomEvent<InputChangeEventDetail>)=>void;
  pushMonthObj: ()=>void;

}

class Tab1 extends React.Component<IProps, IState>  {
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
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Mein Ausgabenrechner</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Infotext
            </p>
          </IonCardContent>
        </IonCard>
        </div>

       
        
            <IonLabel position="floating" class="LabelNewMonth" id="LabelNewMonth">Start a new Month</IonLabel>
          
          <IonItem >
            <IonIcon slot="start" color="medium" icon={calendar} />
            <IonDatetime displayFormat="MMMM YY" pickerFormat="MMMM YY" mode="md" monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"   min="2019-01" max="2030-12" placeholder="Select Month" onIonChange={this.props.getMonth} ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="medium" icon={cash} />
            <IonInput type="number" placeholder="Select Startbudget"  inputMode="numeric" onIonChange={this.props.getStartbudget}></IonInput>
            </IonItem>
        
            <IonButton color="secondary" expand="block" routerLink="/tab2" onClick={this.props.pushMonthObj}>Start Month</IonButton>
          
        
      </IonContent>
    </IonPage>
  );
};
}
export default Tab1;
