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

  
  
  /**
   * Klasse bzw Komponente um die Seite der Monats Eingabe darzustellen
   * Erhällt Methoden (getMonth, getStartbudget, pushMonthObj) von App Komponente als Props
   */
  interface IState {

  }
  
  interface IProps {
    
  
  }
  
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
  