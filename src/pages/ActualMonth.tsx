import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonItemDivider, IonRow, IonCol, IonGrid, IonIcon } from '@ionic/react';


import {useIndexedDB} from 'react-indexed-db';






  interface IState {
    inputs: object[];
  }
  
  interface IProps {
  month: string;
  budget: number;
  getActualBudget: ()=> void; 
  }



class ActualMonth extends React.Component<IProps, IState> {
  state: IState ={
    inputs: []
  }
 
  public getInputsByIndex= ()=> {
const {getAll} = useIndexedDB('inputs');

getAll().then((inputs) =>{
  
  this.setState({
    inputs: inputs
  })
})

  } 
 

 
  public render(){
 
    this.getInputsByIndex();
   
  return (
    <IonPage onLoad={()=>{this.props.getActualBudget();}}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Actual Month</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem >
            

            <IonLabel>
      Actual Month: {this.props.month.substr(0,7)}
      </IonLabel>
      </IonItem>
     
      <IonItem>

      <IonLabel>
      Actual Budget: {this.props.budget}
      </IonLabel>
          </IonItem>

          <br></br>
          <IonList>
            {
            this.state.inputs.map((index: any)=>{
              
              if(index.month===this.props.month.substr(0,7)){
                
              let out = "";
                if (index.ausgabe){
                  out= "+ "
                  }
                  else{
                    out= "- "
                    
                  }

              return (
                <IonItem key={index.inputs_id}>
                  <IonGrid>
                <IonRow >
                <IonCol>{index.datum.substr(0,10)}</IonCol>
            <IonCol>{index.titel}</IonCol> 
              <IonCol>
               {out}
                {index.betrag}€</IonCol>
              
            </IonRow>
            </IonGrid>
            </IonItem>
              )}
            })
          }
          </IonList>
         
        </IonList>
      
  
      </IonContent>
    </IonPage>
  );
}

}
export default ActualMonth;