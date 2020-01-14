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
  import {calendar, cash, alert } from 'ionicons/icons';
  import React from 'react';

  
  
  
  interface IState {

  }
  
  interface IProps {
    
  
  }
  /**
   * Klasse bzw Komponente die Hinweis bei falscher Monatseingabe ausgibt.
   * Falsche Monatseingabe entspricht Versuch Monat erneut zu starten,
   * obwohl dieser schon einmal ausgewählt wurde und in Datenbank gespeichert ist.
   */
  class MonthError extends React.Component<IProps, IState>  {
  state: IState ={
  
  }
  
  
  
    public render(){
     
  
    return (
      
       
        <IonContent>
          <IonCard>
              <IonCardContent>
              <IonIcon icon={alert} size="large" color="ff0000" ></IonIcon>
                  <IonItem>
                      Error! <br></br> Der Monat ist schon vorhanden! <br></br>Bitte einen anderen auswählen.
                  </IonItem>
                  <IonButton color="secondary" expand="block" routerLink="/newMonth">Neuer Versuch</IonButton>
              </IonCardContent>
          </IonCard>
        </IonContent>
      
    );
  };
  }
  export default MonthError;
  