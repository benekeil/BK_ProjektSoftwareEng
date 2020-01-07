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

  } from '@ionic/react';
  import {calendar, cash } from 'ionicons/icons';
  import React from 'react';

  
  
  /**
   * Klasse bzw Komponente um die Seite der Monats Eingabe darzustellen
   * Erhällt Methoden (getMonth, getStartbudget, pushMonthObj) von App Komponente als Props
   */
  interface IState {

  }
  
  interface IProps {
    
  
  }
  
  class StartError extends React.Component<IProps, IState>  {
  state: IState ={
  
  }
  
  
  
    public render(){
     
  
    return (
      
       
        <IonContent>
          <IonCard>
              <IonCardContent>
                  <IonItem>
                      Error! <br></br>Die Eingabe ist nicht vollständig! <br></br>Bitte erneut probieren.
                  </IonItem>
                  <IonButton color="secondary" expand="block" routerLink="/">Neuer Versuch</IonButton>
              </IonCardContent>
          </IonCard>
        </IonContent>
      
    );
  };
  }
  export default StartError;
  