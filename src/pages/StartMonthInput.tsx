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
   
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonDatetime,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonTabButton,

  } from '@ionic/react';
  import {calendar, cash, addCircle, addCircleOutline } from 'ionicons/icons';
  import React from 'react';
  import './Tab1.css';
  import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
  
  /**
   * Klasse bzw Komponente um die Seite der Monats Eingabe darzustellen
   * Erhällt Methoden (getMonth, getStartbudget, pushMonthObj) von App Komponente als Props
   */
  interface IState {

  }
  
  interface IProps {
   
  }
  
  class StartMonthInput extends React.Component<IProps, IState>  {
  state: IState ={
  
  }
  
  
  
    public render(){
     
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Info Ausgabenrechner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="welcome">
          <IonCard className="welcome-card">
            
            
          </IonCard>
          </div>
         
            <IonGrid>
            <IonItem>
                
                <IonRow>
                    
                    <IonCol size="4">
                    <IonTabButton href="/newInput">
                    <IonIcon icon={addCircle} size="large"/>
                    
                <IonLabel>New Input</IonLabel>
                </IonTabButton>
                    </IonCol>
                    <IonCol>
                        Hier kann man neue Inputs zu dem aktuellen Monat hinzufügen.
                    </IonCol>
                </IonRow>
               </IonItem>
               <IonItem>
                <IonRow>
                <IonCol size="4">
                    <IonTabButton href="/actualMonth">
                <IonIcon icon={calendar} size="large"/>
                <IonLabel> Actual Month </IonLabel>
                </IonTabButton>
                    </IonCol>
                    <IonCol>
                        Hier wird der aktuelle Monat mit allen Inputs und dem aktuellen Budget angezeigt
                    </IonCol>
                </IonRow>
                </IonItem> 
                <IonItem>
                <IonRow>
                <IonCol size="4">
                    <IonTabButton href="/newMonth">
                <IonIcon icon={addCircleOutline} size="large" />
                <IonLabel>New Month</IonLabel>
                </IonTabButton>
                    </IonCol>
                    <IonCol>
                        Hier kann man einen neuen Monat beginnen. Der vorherige Monat wird dann abgeschlossen.
                    </IonCol>
                </IonRow>
                </IonItem>
                <IonItem>
                <IonRow>
                <IonCol size="4">
                    <IonTabButton href="/monthReview">
                <IonIcon icon={calendar} size="large"/>
                <IonLabel>Month Review</IonLabel>
                </IonTabButton>
                    </IonCol>
                    <IonCol>
                       Hier kann man alle begonnenen Monate einsehen.
                    </IonCol>
                </IonRow>
                </IonItem>
            </IonGrid>

        
            
          
        </IonContent>
      </IonPage>
    );
  };
  }
  export default StartMonthInput;
  