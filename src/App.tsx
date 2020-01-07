import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircleOutline, calendar, addCircle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Details from './pages/Details';
import ActualMonth from './pages/ActualMonth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { DatetimeChangeEventDetail, InputChangeEventDetail } from '@ionic/core';
import { DBConfig } from './db/DBconfig';
import { DBConfig2 } from './db/DBconfig2';

import { initDB, useIndexedDB, IndexedDB, ObjectStoreMeta } from 'react-indexed-db';
import { CreateObjectStore } from 'react-indexed-db/lib/indexed-db';




initDB(DBConfig);






/**
 * 
 * Documentation Projekt Softwareengineering
 */

interface IState {
  month: string;
  startbudget: number;
  monthObj: object[];
  monthlist?: object[];
  monthlistDB: object[];
  actualMonth?: string;
  actualBudget: number;
  allMonthObj: object[];
  actualMonthObj: actualMonthObj;
  inputs: object[];
  monthID: number;
}
interface IProps {

}

interface actualMonthObj {
  month: string;
  startbudget: number;
  actualbudget: number;
  id: number;
}

class App extends React.Component<IProps, IState>{
  state: IState = {
    actualBudget: 0,
    startbudget: 0,
    month: "test",
    monthObj: [{ "month": "Test", "startbudget": 0 }],
    monthlistDB: [],
    allMonthObj: [{ "month": "no Month", "startbudget": 0, "id": 1 }],
    actualMonthObj: { month: "no Month", startbudget: 0, actualbudget: 0, id: 0 },
    inputs: [],
    monthID: 1,
  }


  /**
 * Methode um ausgewählten Monat zu speichern
 */
  public getMonth = (event: CustomEvent<DatetimeChangeEventDetail>) => {
    let month = event.detail.value;
    let monthsubstr = month!.substr(0, 7);


    this.setState({
      month: monthsubstr!,

    });



  }
  /**
  * Methode um eingegebenes Startbudget zu speichern
  */
  public getStartbudget = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
      startbudget: parseInt(event.detail.value!),

    })



  }

  public pushMonthObj = () => {

    this.state.monthObj.push({ "month": this.state.month, "startbudget": this.state.startbudget })
    this.forceUpdate();
    const { add, getAll } = useIndexedDB('monthlist');


    add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget })



    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
      //this.state.monthlistDB.push(monthlistDB);
    }
    )


  }

  public getMonthObj = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
      //this.state.monthlistDB.push(monthlistDB);
    }
    )
  }

  public getActualMonth = () => {

    const { add, getAll, getByID, update } = useIndexedDB('monthlist');
    getAll().then((month) => {

      if (month.length === 0) {
        add({ month: 'Default', startbudget: 0, actualbudget: 0 });
      }
      getAll().then((month) => {


        this.setState({
          allMonthObj: month
        })

        // console.log(this.state.allMonthObj);
        //console.log(this.state.actualMonthObj);
      }).then(() => {
        getByID(Math.max.apply(Math, this.state.allMonthObj.map((o: any) => { this.setState({ monthID: o.id }); return o.id }))).then((actualMonth) => {
          console.log(actualMonth);
          
          this.setState({
            actualMonthObj: actualMonth,
          })
          this.setState({
            month: this.state.actualMonthObj.month,
            startbudget: this.state.actualMonthObj.startbudget,
            actualBudget: this.state.actualMonthObj.actualbudget,
          })

           console.log(this.state.actualBudget)

        
        })
      })

    });

  }

  public getActualBudget = () => {
   this.forceUpdate();
    const { add, getAll, update } = useIndexedDB('inputs');

    getAll().then((inputs) => {

      this.setState({
        inputs: inputs
      })
    }).then(() => {
      this.forceUpdate();
      //console.log("test actualBudget");
      console.log("vor !==0");
      if (this.state.inputs.length !== 0) {
        console.log("!==0 aktive")
        this.state.inputs.map((index: any) => {
          //console.log(index.betrag);
          //console.log("index.month01 : "+index.month);
          //console.log("state.month: "+this.state.month);

          let actualBudget = index.actualbudget;
          this.setState({
            actualBudget: actualBudget,
          })
          if (index.month == this.state.month && index.added == false) {
            //console.log("index.month: "+index.month);
            if (index.ausgabe) {

              actualBudget += index.betrag;
              this.setState({
                actualBudget: actualBudget,
              })
              update({ inputs_id: index.inputs_id, betrag: index.betrag, ausgabe: index.ausgabe, titel: index.titel, datum: index.datum, month: index.month, added: true, actualbudget: actualBudget });
              console.log("plus: " + this.state.actualBudget);
            }
            else {
              actualBudget -= index.betrag;
              this.setState({
                actualBudget: actualBudget,
              });
              update({ inputs_id: index.inputs_id, betrag: index.betrag, ausgabe: index.ausgabe, titel: index.titel, datum: index.datum, month: index.month, added: true, actualbudget: actualBudget });
              console.log("minus: " + this.state.actualBudget);
            }
          }

          return {

          }
        }
        )
      }

    })



  }


  public render() {

    return (
      <IonApp onLoad={() => { this.getActualMonth(); this.getMonthObj(); }}>
        <IonReactRouter>
          <Route path="/start">
          <Tab1 getMonth={this.getMonth} getStartbudget={this.getStartbudget} pushMonthObj={this.pushMonthObj}></Tab1>
          </Route>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/tab1" >
                <Tab1 getMonth={this.getMonth} getStartbudget={this.getStartbudget} pushMonthObj={this.pushMonthObj}></Tab1>
              </Route>
              <Route path="/tab2" component={Tab2} exact={true}> <Tab2 monthObj={this.state.monthlistDB}></Tab2></Route>
              <Route path="/actualMonth" component={ActualMonth} exact={true}>
                <ActualMonth month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget} ></ActualMonth>
              </Route>
              <Route path="/tab2/details" component={Details} />
              <Route path="/tab3" component={Tab3}>
                <Tab3 month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget} ></Tab3>
              </Route>
              <Route path="/" render={() => <Redirect to="/start" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>New Month</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={calendar} />
                <IonLabel>Month Review</IonLabel>
              </IonTabButton>
              <IonTabButton tab="actualMonth" href="/actualMonth" onClick={this.getActualBudget}>
                <IonIcon icon={calendar} />
                <IonLabel> Actual Month </IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon icon={addCircle} />
                <IonLabel>New Input</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    )
  };
}

export default App;
