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
import { calendar, cash, addCircle, addCircleOutline } from 'ionicons/icons';
import React from 'react';
import './Tab1.css';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import NewInput from './NewInput';

/**
 * Klasse bzw Komponente die beim erneuten Starten der App angezeigt wird.
 * Hier werden die Buttons/Seiten der TabBar/App erklärt.
 */
interface IState {

}

interface IProps {

}

class StartMonthInput extends React.Component<IProps, IState>  {
  state: IState = {

  }


  /**
   * Methode die die Buttons und den dazu gehörigen Infotext rendert und am Bildschirm des jeweiligen Geräts anzeigt.
   */
  public render() {


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

          <IonGrid >
            <IonItem>

              <IonRow align-items= "flex-start">

                <IonCol size="4" sizeLg="auto" sizeMd="auto">
                  <IonTabButton href="/newInput">
                    <IonIcon icon={addCircle} size="large" />

                    <IonLabel>New Input</IonLabel>
                  </IonTabButton>
                </IonCol>
                <IonCol size="8">
                  Hier kann man neue Inputs zu dem aktuellen Monat hinzufügen.
                    </IonCol>
              </IonRow>
            </IonItem>
            <IonItem>
              <IonRow align-items= "flex-start">
                <IonCol size="4" sizeLg="auto" sizeMd="auto">
                  <IonTabButton href="/actualMonth">
                    <IonIcon icon={calendar} size="large" />
                    <IonLabel> Actual Month </IonLabel>
                  </IonTabButton>
                </IonCol>
                <IonCol size="8">
                  Hier wird der aktuelle Monat mit allen Inputs und dem aktuellen Budget angezeigt
                    </IonCol>
              </IonRow>
            </IonItem>
            <IonItem>
              <IonRow align-items= "flex-start">
                <IonCol size="4" sizeLg="auto" sizeMd="auto">
                  <IonTabButton href="/newMonth">
                    <IonIcon icon={addCircleOutline} size="large" />
                    <IonLabel>New Month</IonLabel>
                  </IonTabButton>
                </IonCol>
                <IonCol size="8">
                  Hier kann man einen neuen Monat beginnen. Der vorherige Monat wird dann abgeschlossen.
                    </IonCol>
              </IonRow>
            </IonItem>
            <IonItem>
              <IonRow align-items= "flex-start">
                <IonCol size="4" sizeLg="auto" sizeMd="auto">
                  <IonTabButton href="/monthReview">
                    <IonIcon icon={calendar} size="large" />
                    <IonLabel>Month Review</IonLabel>
                  </IonTabButton>
                </IonCol>
                <IonCol size="8">
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
