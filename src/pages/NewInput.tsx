import React from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonButton, IonCard, IonCardContent } from '@ionic/react';
import { cash, add, remove, text, calendar } from 'ionicons/icons';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import { useIndexedDB } from 'react-indexed-db';


interface IState{
issue: boolean;
revenue: boolean;
title: string;
value: number;
date: string;

}

interface IProps {
  month:string;
  budget: number;
  getActualBudget: ()=> void; 

}

class NewInput extends React.Component<IProps, IState> {
  
  public getType = (event: CustomEvent<InputChangeEventDetail>) => {
    
    if (event.detail.value==="Issue (-)"){
      this.setState({
        issue: true ,
        revenue: false,
        })
    }
    else if (event.detail.value==="Revenue (+)"){
      this.setState({
        issue: false ,
        revenue: true,
        })
    }
    
    console.log("issue: "+this.state.issue);
    console.log("revenue: "+this.state.revenue);
    
    }
  
  public getTitle = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
    title: event.detail.value! ,
    })
    
   
    
    }


  public getValue = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
    value: parseInt(event.detail.value!) ,
    })
    
  
    
    }
    public getDate = (event: CustomEvent<DatetimeChangeEventDetail>) => {
      let date = event.detail.value;
      
      
      this.setState({
        date: date!,
    
      });
      
      
     
    }

    public saveInput(){
      const {add} = useIndexedDB('inputs');
      add({ausgabe: this.state.revenue, titel: this.state.title, betrag: this.state.value, datum: this.state.date, month: this.props.month, added: false, actualbudget: this.props.budget})
      
    }
  
  public render(){
  return (
    <IonPage>
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
            <IonSelect title="Input/Output" onIonChange={this.getType}>
              <IonSelectOption>Revenue (+)</IonSelectOption>
              <IonSelectOption>Issue (-)</IonSelectOption>
            </IonSelect>
            </IonItem>

            <IonItem>
            <IonIcon slot="start" color="medium" icon={text} />
            <IonInput type="text" placeholder="Title" onIonChange={this.getTitle} ></IonInput>
            </IonItem>

      <IonItem>
            <IonIcon slot="start" color="medium" icon={cash} />
            <IonInput type="number" placeholder="Select Value"  inputMode="numeric" onIonChange={this.getValue} ></IonInput>
            </IonItem>

            <IonItem >
            <IonIcon slot="start" color="medium" icon={calendar} />
            <IonDatetime displayFormat="DD MMMM YY" pickerFormat="DD MMMM YY" mode="md"  min={this.props.month} max={this.props.month} placeholder="Select Date" onIonChange={this.getDate} ></IonDatetime>
          </IonItem>
          <IonButton color="secondary" expand="block" routerLink="/actualMonth" onClick={()=>{this.saveInput(); this.props.getActualBudget(); }}>Add Input</IonButton>

       </IonContent> 
    </IonPage>
  );
  }
};

export default NewInput;
