import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/react';

import { InputChangeEventDetail } from '@ionic/core';
import { useIndexedDB } from 'react-indexed-db';





interface IState {
  reviewedMonth: string;
  inputs: object[];
  monthlist: object[];
  endBudget: number;
  summeInputs: number;
  startbudget: number;
}

interface IProps {
  monthObj: object[];
  actualBudget: number;
}


/**
 * Klasse oder Komponente die alle bisher hinzugefügten Monate in einer Auswahl auflistet 
 * und nach Auswahl eines Monats dessen kompletten Eingaben aufzeigt
 */
class MonthReview extends React.Component<IProps, IState> {
  state: IState = {
    inputs: [],
    reviewedMonth: "",
    monthlist: [],
    endBudget: 0,
    summeInputs: 0,
    startbudget: 0,
  }

  /**
   * Methode um ausgewählten Monat der Monatsauswahl zu speichern und
   * Aufruf der Methodem getMonthInputs und getMonthValues
   */
  public getMonthReview = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
      reviewedMonth: event.detail.value!,
    })

    this.getMonthValues();
    this.getMonthInputs();

  }

  /**
   * Methode um alle Inputs der Indexed DB abzurufen und in State inputs zu speichern.
   * Auch wird hier der Endbetrag des ausgewählten Monats gesetzt 
   */
  public getMonthInputs = () => {


    const { getAll, update } = useIndexedDB('inputs');
    getAll().then((inputs) => {


      this.state.monthlist.map((index: any) => {
        if (index.month === this.state.reviewedMonth.substr(0, 7)) {
          this.setState({
            startbudget: index.startbudget
          })
        }
      })

      this.setState({
        inputs: inputs,
        summeInputs: 0,
      })
    }).then(() => {
      if (this.state.inputs.length !== 0) {
        this.state.inputs.map((index: any) => {
          if (index.month === this.state.reviewedMonth.substr(0, 7)) {
            let summeInputs = this.state.summeInputs;

            if (index.ausgabe) {
              summeInputs -= index.betrag;

              this.setState({
                summeInputs: summeInputs,
              })
            } else {
              summeInputs += index.betrag;

              this.setState({
                summeInputs: summeInputs,
              })
            }
          }
        })
      }
    }).then(() => {
      console.log("startbudget: " + this.state.startbudget)
      let endBudget = this.state.startbudget - this.state.summeInputs;
      this.setState({
        endBudget: endBudget,
      })
    })
  }

  /**
   * Methode um alle in der Indexed DB gespeicherten Werte des ObjectStores "monthlist" abzurufen 
   * und im State "monthlist" zu speichern
   */
  public getMonthValues = () => {
    const { getAll } = useIndexedDB('monthlist');

    getAll().then((monthlist) => {

      this.setState({
        monthlist: monthlist
      })

    })
  }


  /**
   * Methode rendert die Seite Month Review. 
   * Nachdem ein Monat über das Select Tag ausgewählt wurde, 
   * wird eine Liste mit allen Inputs des ausgewählten Monats gerendert.
   * Ebenfalls wird das Startbudget und das am Ende übrig gebliebene Endbudget angezeigt.
   */
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
              <IonSelect slot="start" multiple={false} placeholder="Select Month" onIonChange={this.getMonthReview}>
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
                this.state.monthlist.map((monthValues: any) => {
                  if (monthValues.month === this.state.reviewedMonth.substr(0, 7)) {

                    return (
                      <IonItem key={monthValues.id}>
                        <IonLabel>
                          Startbudget: {this.state.startbudget}
                        </IonLabel>
                        <IonLabel>
                          Endbudget: {this.state.endBudget}
                        </IonLabel>
                      </IonItem>


                    )
                  }
                })}

            </IonList>


            <IonList>

              {
                this.state.inputs.map((index: any) => {

                  if (index.month === this.state.reviewedMonth.substr(0, 7)) {

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
export default MonthReview;