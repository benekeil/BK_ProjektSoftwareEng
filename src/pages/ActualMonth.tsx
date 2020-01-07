import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonGrid} from '@ionic/react';


import {useIndexedDB} from 'react-indexed-db';



  


  interface IState {
    inputs: object[];
  }
  
  interface IProps {
  month: string;
  budget: number;
  getActualBudget: ()=> void; 
  getActualMonth: ()=> void; 
  }


  /**
   * Klasse oder Komponente die den Aktuellen Monat mit allen zugehörigen Inputs anzeigt
   */
class ActualMonth extends React.Component<IProps, IState> {
  state: IState ={
    inputs: []
  }
 

  /**
   * Methode um alle Inputs aus der Indexed DB abzurufen
   */
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
    <IonPage onLoad={()=>{this.props.getActualMonth() ;this.props.getActualBudget();this.forceUpdate();}}>
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
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    Date
                  </IonCol>
                  <IonCol>
                    Title
                  </IonCol>
                  <IonCol>
                    Value
                  </IonCol>
                </IonRow>
              </IonGrid>
              </IonItem>
            {
              /**
               * Methode um alle Inputs aufzulisten die dem Aktuellen Monat zugehören.
               * Es wird jeder Input nach Art (Einnahme und Ausgabe) überprüft und mit entsprechenden Symbol (+ oder -) versehen
               */
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