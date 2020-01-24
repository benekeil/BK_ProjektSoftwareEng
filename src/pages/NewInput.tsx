import React from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { cash, add, remove, text, calendar } from 'ionicons/icons';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import { useIndexedDB } from 'react-indexed-db';


interface IState{
issue?: boolean;
revenue?: boolean;
title?: string;
value?: number;
date?: string;
isSet?: boolean;

}

interface IProps {
  month:string;
  budget: number;
  getActualBudget: ()=> void; 

}

/**
 * Klasse bzw Komponente um neue Input Einträge für den aktuellen Monat zu erstellen
 */
class NewInput extends React.Component<IProps, IState> {
  state: IState ={
    issue: false,
    revenue: false,
    title: "",
    value: 0,
    date: "",
    isSet: false

  }
  textInput = "";

  
    /**
     * Methode um den Typ des Input Eintrags zu erhalten. 
     * Ein Input kann entweder Einnahme oder Ausgabe sein.
     *   
     */
    public getType = (event: CustomEvent<InputChangeEventDetail>) => {
    
      if (event.detail.value==="Issue (-)"){
        this.setState({
          issue: true ,
          revenue: false,
          isSet: true,
        })
      }
      else if (event.detail.value==="Revenue (+)"){
        this.setState({
          issue: false ,
          revenue: true,
          isSet: true
        })
      }
    }
    
    /**
     * Methode um den Title eines Eintrags zu erhalten und diesen in den State title zu speichern
     */
    public getTitle = (event: CustomEvent<InputChangeEventDetail>) => {
      this.setState({
        title: event.detail.value! ,
      })
    }

    /**
     * Methode um den Geldwert eines Eintrags zu erhalten und diesen in den State value zu speichern
     */
    public getValue = (event: CustomEvent<InputChangeEventDetail>) => {
     this.setState({
        value: parseInt(event.detail.value!) ,
      })  
    }

    /**
     * Methode um das Datum eines Eintrags zu erhalten und diesen in den state date zu speichern.
     */
    public getDate = (event: CustomEvent<DatetimeChangeEventDetail>) => {
      let date = event.detail.value;
      
      
      this.setState({
        date: date!,
    
      });     
    }

    /**
     * Methode um alle Eingaben des Eintrags in der Indexed DB zu speichern. 
     * Diese Methode wird bei Betätigung des Buttons "Add Input" ausgeführt.
     */
    public saveInput(){
      const {add} = useIndexedDB('inputs');
      add({ausgabe: this.state.revenue, titel: this.state.title, betrag: this.state.value, datum: this.state.date, month: this.props.month, added: false, actualbudget: this.props.budget});
      
    }

    
  

    /**
     * Methode um den Inhalt der Seite "New Input" zu rendern. 
     * Stellt die Select/Input Tags dar und gibt den Button bei vollständigen Eintrag 
     * der einzelnen Felder zum Betätigen frei.
     */
    public render(){
      
    return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Input</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard className="welcome-card">
          <img src="/assets/money.jpg" alt="" />
         
          <IonCardContent>
            <p>
              Fügen Sie einen neuen Input hinzu.</p>
              Eine Übersicht über alle Inputs des aktuellen Monats, sowie das aktuelle Budget finden Sie bei "Actual Month".
            
          </IonCardContent>
        </IonCard>
        <IonItem>
      <IonLabel>
      Actual Month: {this.props.month}
      </IonLabel>
      </IonItem>
      <IonItem>
      <IonLabel>
      Actual Budget: {this.props.budget}
      </IonLabel>
      </IonItem>
      <IonItem>
            <IonIcon slot="start" color="medium" icon={add} />
            <IonIcon slot="start" color="medium" icon={remove} />
            <IonSelect title="Input/Output" placeholder="Select +/-" onIonChange={this.getType}>
              <IonSelectOption>Revenue (+)</IonSelectOption>
              <IonSelectOption>Issue (-)</IonSelectOption>
            </IonSelect>
            </IonItem>

            <IonItem>
            <IonIcon slot="start" color="medium" icon={text} />
            <IonInput type="text" placeholder="Type Title" onIonChange={this.getTitle} ></IonInput>
            </IonItem>

      <IonItem>
            <IonIcon slot="start" color="medium" icon={cash} />
            <IonInput type="number" placeholder="Select Value"  inputMode="numeric" onIonChange={this.getValue} ></IonInput>
            </IonItem>

            <IonItem >
            <IonIcon slot="start" color="medium" icon={calendar} />
            <IonDatetime displayFormat="DD MMMM YY" pickerFormat="DD MMMM YY" mode="md"  min={this.props.month} max={this.props.month} placeholder="Select Date" onIonChange={this.getDate} ></IonDatetime>
          </IonItem>
          <IonButton color="secondary" expand="block" routerLink="/actualMonth" disabled={this.state.isSet == false !|| this.state.title == "" !|| this.state.value == 0 !|| this.state.date == ""} onClick={()=>{this.saveInput(); this.props.getActualBudget(); }}>Add Input</IonButton>

       </IonContent> 
    </IonPage>
    );
   }
};

export default NewInput;
