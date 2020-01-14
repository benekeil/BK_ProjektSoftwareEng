import React from 'react';
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
import NewMonth from './pages/NewMonth';
import MonthReview from './pages/MonthReview';
import NewInput from './pages/NewInput';
import ActualMonth from './pages/ActualMonth';
import Start from './pages/Start';
import MonthError from './errors/MonthError';

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


/**Datenbank Einbindung */
import { DBConfig } from './db/DBConfig';
import { initDB, useIndexedDB } from 'react-indexed-db';



initDB(DBConfig);



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
  inputsSetNew: object[];
  monthID: number;
  firstLoad: boolean;
  normalMode: boolean;
  starterror: boolean;
  summeInputs: number;
}
interface IProps {

}

interface actualMonthObj {
  month: string;
  startbudget: number;
  actualbudget: number;
  id: number;
}

/**
 * 
 * Documentation Projekt Softwareengineering
 * Es wurde ein Ausgabenrechner implementiert, 
 * der eine Übersicht über das aktuelle Budget und alle Ausgaben/Einnahmen eines Monats gibt
 * @author: Benedikt Keil
 * @version: V2.3
 * 
 */
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
    inputsSetNew: [],
    monthID: 1,
    firstLoad: true,
    normalMode: false,
    starterror: false,
    summeInputs: 0,
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

    console.log(this.state.month);
    this.verifiyMonth();
  }
  /**
  * Methode um eingegebenes Startbudget zu speichern
  */
  public getStartbudget = (event: CustomEvent<InputChangeEventDetail>) => {
    this.setState({
      startbudget: parseInt(event.detail.value!),

    })
    console.log(this.state.startbudget);


  }
  /**
   * Methode um Eingaben über Monat und Startbudget in Indexed DB zu speichern 
   * und um alle gespeicherten Monate in Indexed DB als State (monthlistDB) zu speichern.
   * Aufruf der Methode getActualMonth um aktuellen Monat in App zu setzen.
   */
  public pushMonthObj = () => {

    this.state.monthObj.push({ "month": this.state.month, "startbudget": this.state.startbudget })
    this.forceUpdate();
    const { add, getAll } = useIndexedDB('monthlist');


    add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget })



    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
    })
    this.getActualMonth();
  }

  /**
   * Methode um alle gespeicherten Monate in Indexed DB abzurufen
   * und im State monthlistDB zu speichern
   */
  public getMonthObj = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((monthlistDB) => {
      this.setState({
        monthlistDB: monthlistDB
      })
    })
  }

  /**
   * Methode um Startseite beim aller ersten Start der App zu starten.
   * Die Seite wird benötigt um einen ersten Datenbank Eintrag zu generieren.
   */
  public firstLoadApp = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((month) => {

      if (month.length === 0) {
        this.setState({
          firstLoad: true,
        })
      }
      else {
        this.setState({
          firstLoad: false,
          normalMode: true,
        })
        this.getActualMonth();
      }
    })
    console.log(this.state.month + this.state.startbudget);
  }


  /**
   * Methode erstellt nach betätigen des "Start Ausgabenrechner" Buttons den ersten Datenbankeintrag in dem objectStore "monthlist"
   */
  public startRechner = () => {

    const { add, getAll } = useIndexedDB('monthlist');
    if (this.state.month !== "test" && this.state.startbudget !== 0) {
      add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget });
      getAll().then((month) => {

        if (month.length === 0) {
          add({ month: this.state.month, startbudget: this.state.startbudget, actualbudget: this.state.startbudget });
        }
        getAll().then((month) => {


          this.setState({
            allMonthObj: month,
            firstLoad: false,
            normalMode: true,
          })

          this.getActualMonth();
        })
      })
    }
    else {
      this.setState({
        starterror: true,
      })
    }
  }


  /**
   * Methode um aktuellen Monat (letzter hinzugefügter Monat) abzurufen
   * und speichern der Werte dieses Monats als State (month, startbudget, actualbudget).
   * Aufruf der Methode getActualBudget um aktuelles Budget abzurufen, wenn sich der Monat ändert.
   */
  public getActualMonth = () => {

    const { getAll, getByID } = useIndexedDB('monthlist');
    getAll().then((month) => {


      this.setState({
        allMonthObj: month
      })
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
        this.forceUpdate();
        console.log(this.state.actualBudget)
        this.getActualBudget2();


      })
    })

  }



  /**
   * Methode um aktuelles Budget aller Inputs des aktuellen Monats zu berechnen.
   * Speichert den Wert in State (aktualBudget) 
   */

  public getActualBudget2 = () => {
    const { getAll} = useIndexedDB('inputs');
    getAll().then((inputs) => {

      this.setState({
        inputs: inputs,
        summeInputs: 0,
      })
    }).then(() => {
      if (this.state.inputs.length !== 0) {
        this.state.inputs.map((index: any) => {
          if (index.month === this.state.month) {
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
      let actualBudget = this.state.startbudget - this.state.summeInputs;
      this.setState({
        actualBudget: actualBudget,
      })
    })
  }

  

  /**
   * Methode überprüft den in New Month eingegben Monat mit allen vorhandenen Monaten. 
   * Falls der Monat schon existiert wird eine neue Seite mit einem Hinweis aufgerufen
   */
  public verifiyMonth = () => {
    const { getAll } = useIndexedDB('monthlist');
    getAll().then((month) => {
      month.map((index: any) => {
        //console.log("Test Month Verify: " + this.state.month)
        if (index.month === this.state.month) {
          this.setState({
            starterror: true,
            month: "test",
            normalMode: false,
          })
         // console.log(this.state.starterror);
        }
      })
    })
  }

  /**
   * Diese Methode rendert die TabBar die immer am unteren Bildschirmende gezeigt wird. 
   * Außerdem wird ein Router erstellt der die Navigation zwischen den einzelnen Seiten bereit stellt.
   * Hier werden auch die Methoden der App Klasse an die anderen Komponenten übergeben, 
   * die dann in den einzelne Komponenten als Props zur Verfügung stehen.
   */
  public render() {

    return (
      <IonApp onLoad={() => { this.firstLoadApp(); this.getMonthObj(); }}>

        {this.state.firstLoad && (<Start startRechner={this.startRechner} getMonth={this.getMonth} getStartbudget={this.getStartbudget} month={this.state.month} startbudget={this.state.startbudget}></Start>)}
        {this.state.starterror && (<MonthError></MonthError>)}
        <IonReactRouter>

          {this.state.normalMode && (<IonTabs>
            <IonRouterOutlet>
              <Route path="/newMonth" >
                <NewMonth getMonth={this.getMonth} getStartbudget={this.getStartbudget} pushMonthObj={this.pushMonthObj} month={this.state.month} startbudget={this.state.startbudget}></NewMonth>
              </Route>
              <Route path="/monthReview" component={MonthReview} exact={true}> <MonthReview monthObj={this.state.monthlistDB} actualBudget={this.state.actualBudget}></MonthReview></Route>
              <Route path="/actualMonth" component={ActualMonth} exact={true}>
                <ActualMonth month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget2} getActualMonth={this.getActualMonth} ></ActualMonth>
              </Route>
              <Route path="/newInput" component={NewInput}>
                <NewInput month={this.state.month} budget={this.state.actualBudget} getActualBudget={this.getActualBudget2} ></NewInput>
              </Route>
              <Route path="/" render={() => <Redirect to="/start" />} exact={true} />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="newInput" href="/newInput" onClick={this.getActualBudget2}>
                <IonIcon icon={addCircle} />
                <IonLabel>New Input</IonLabel>
              </IonTabButton>
              <IonTabButton tab="actualMonth" href="/actualMonth" onClick={this.getActualBudget2}>
                <IonIcon icon={calendar} />
                <IonLabel> Actual Month </IonLabel>
              </IonTabButton>
              <IonTabButton tab="newMonth" href="/newMonth">
                <IonIcon icon={addCircleOutline} />
                <IonLabel>New Month</IonLabel>
              </IonTabButton>
              <IonTabButton tab="monthReview" href="/monthReview">
                <IonIcon icon={calendar} />
                <IonLabel>Month Review</IonLabel>
              </IonTabButton>


            </IonTabBar>
          </IonTabs>)}

        </IonReactRouter>
      </IonApp>
    )
  };
}

export default App;
