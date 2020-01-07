import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/react';

import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import { useIndexedDB } from 'react-indexed-db';





interface IState {
  reviewedMonth: string;
  inputs: object[];
  monthlist: object[];
  endBudget: number;
}

interface IProps {
  monthObj: object[];
}



class Tab2 extends React.Component<IProps, IState> {
  state: IState = {
    inputs: [],
    reviewedMonth: "",
    monthlist: [],
    endBudget: 0
  }

  public getMonthReview = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
      reviewedMonth: event.detail.value!,
    })
    this.getMonthInputs();
    this.getMonthValues();
    //console.log(this.state.reviewedMonth);
  }

  public getMonthInputs = () => {
    const { getAll } = useIndexedDB('inputs');

    getAll().then((inputs) => {

      this.setState({
        inputs: inputs
      })
      
      this.state.inputs.map((index: any) => {
  
        if (index.month === this.state.reviewedMonth.substr(0,7)) {
            
          this.setState({
            endBudget: index.actualbudget
          })
          
          
           
        }
        
      })
    })
   
    
  }

  public getMonthValues = () => {
    const { getAll } = useIndexedDB('monthlist');

    getAll().then((monthlist) => {

      this.setState({
        monthlist: monthlist
      })
      
    })
    

  }

  public render() {
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Month List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem >
              <IonLabel>

              </IonLabel>
              <IonSelect multiple={false} onIonChange={this.getMonthReview}>
                {
                  this.props.monthObj.map((index: any) => {
                    return (
                      <IonSelectOption key={index.month}>{index.month} </IonSelectOption>
                    )

                  })
                }

              </IonSelect>
            </IonItem>

                <IonList>
                {
                this.state.monthlist.map((monthValues: any)=>{
                    if(monthValues.month === this.state.reviewedMonth.substr(0,7)){
                      return(
                        <IonItem key={monthValues.id}>
                        <IonLabel>
                          Startbudget: {monthValues.startbudget}
                        </IonLabel>
                        <IonLabel>
                        Endbudget: {this.state.endBudget}
                        </IonLabel>  
                        </IonItem>

                        
                      )
                    }
                }) } 

                </IonList>
            

            <IonList>
             
                {
                this.state.inputs.map((index: any) => {

                  if (index.month === this.state.reviewedMonth.substr(0,7)) {
                      
                    let out = "";
                    if (index.ausgabe) {
                      out = "+ "
                    }
                    else {
                      out = "- "

                    }
                    
                    return (
                      <IonItem key={index.inputs_id}>
                        <IonGrid>
                          <IonRow >
                            <IonCol>{index.datum.substr(0, 10)}</IonCol>
                            <IonCol>{index.titel}</IonCol>
                            <IonCol>
                              {out}
                              {index.betrag}€</IonCol>

                          </IonRow>
                        </IonGrid>
                      </IonItem>
                    )
                  }
                })
              }
            </IonList>
            
          </IonList>
        </IonContent>
      </IonPage>
    );
  }

}
export default Tab2;