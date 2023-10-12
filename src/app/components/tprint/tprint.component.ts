import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Ticket } from './ticket';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tprint',
  templateUrl: './tprint.component.html',
  styleUrls: ['./tprint.component.css']
})
export class TprintComponent implements OnInit, AfterViewInit {

  tick1: number[][][] = [];
  tinput = {
    sheettype: '',
    noofsheets: 0,
    serialnofrom: 0,
    serialnoto: 0,
    title: 'Hello',
    logo: '',
    savetemp: false
  };

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
        this.tinput.sheettype = params['sheettype'];
        this.tinput.noofsheets = params['noofsheets'];
        this.tinput.serialnofrom = params['serialnofrom'];
        this.tinput.serialnoto = params['serialnoto'];
        this.tinput.title = params['title'];
        this.tinput.logo = params['logo'];
        this.tinput.savetemp = params['savetemp'];
      }
    );
  }

  ngAfterViewInit(): void {
    this.genTickets();
  }

  ngOnInit(): void {
  }

  genTickets() {
    const ele = document.querySelector(".sheet")
    let tn_tart = this.tinput.serialnofrom;
    for (let sn = 0; sn < this.tinput.noofsheets; sn++) {

      // Create a span element with class "mx-1" and text content
      const spanElement = document.createElement("span");
      spanElement.className = "mx-1";
      spanElement.textContent = this.tinput.title;
      ele.appendChild(spanElement);


      // Create a div element with Angular ngFor attribute
      const tabElement = document.createElement("table");
      // divElement.className = "row";

      const trElement = document.createElement("tr");
      const nrows = parseInt(this.tinput.sheettype);

      for (let row = 0; row < nrows; row++) {
        //get tickets data
        this.tick1 = new Ticket().main();

        const tdElement = document.createElement("td");
        tdElement.className = (row > 0 ? "px-2" : "px-2");
        // tdElement.setAttribute("style", "width:50%;");

        const divElement1 = document.createElement("div");
        // divElement1.className = "col";

        // Create a span element with class "mx-1" and text content
        const spanElement = document.createElement("div");
        spanElement.className = "mx-1 text-end";
        spanElement.textContent = "Ticket No : " + tn_tart++;
        divElement1.appendChild(spanElement);

        for (let i = 0; i < 6; i++) {
          // Create a table element with id "table1" and classes "pdftable text-center mx-1 mb-4"
          const tableElement = document.createElement("table");
          tableElement.id = "table1";
          tableElement.className = "table1 text-center mx-1 mb-3";
          tableElement.setAttribute("style", (nrows < 3 ? "font-size: 26px;" : "font-size: 20px;") + "border: 2px solid black;border-spacing: 0;border-collapse: separate;border-radius: 10px;border: 2px solid black;font-weight: bolder;background: url('assets//images//logo.png'); background-repeat: no-repeat; background-position: center center;background-size: 150px;");

          // Loop to create table rows using Angular ngFor
          for (let j = 0; j < 3; j++) {
            const rowElement = document.createElement("tr");

            rowElement.setAttribute("style", "border-bottom: 1px solid grey;");
            // Loop to create table cells using Angular ngFor
            for (let k = 0; k < 9; k++) {
              const cellElement = document.createElement("td");
              cellElement.setAttribute("style", "padding: 0px;margin: 0px;width:40px;" + (j < 2 ? "border-bottom: 1px solid grey;" : "") + (k < 8 ? "border-right: 1px solid grey;" : ""));
              const tickValue = this.tick1[i][j][k] !== 0 ? this.tick1[i][j][k] : '';
              cellElement.textContent = tickValue.toString();
              rowElement.appendChild(cellElement);
            }
            tableElement.appendChild(rowElement);
          }
          divElement1.appendChild(tableElement);
        }
        tdElement.appendChild(divElement1);
        trElement.appendChild(tdElement);
        tabElement.appendChild(trElement);
        // Append the elements to the document body or any other container element
        // divElement.appendChild(tableElement);      
      }
      ele.appendChild(tabElement);
      if (sn < this.tinput.noofsheets - 1) {
        const pElement = document.createElement("p");
        pElement.setAttribute("style", "page-break-before: always;");
        ele.appendChild(pElement);
      }
    }
  }
  // genTickets() {
  //   const ele = document.querySelector(".sheet")

  //   // Create a div element with Angular ngFor attribute
  //   const tabElement = document.createElement("table");
  //   // divElement.className = "row";

  //   const trElement = document.createElement("tr");

  //   for (let row = 0; row < 2; row++) {
  //     //get tickets data
  //     this.tick1 = new Ticket().main();

  //     const tdElement = document.createElement("td");
  //     tdElement.className = (row > 0 ? "px-2" : "px-2");
  //     tdElement.setAttribute("style","width:50%;");

  //     const divElement1 = document.createElement("div");
  //     // divElement1.className = "col";

  //     // Create a span element with class "mx-1" and text content
  //     // const spanElement = document.createElement("span");
  //     // spanElement.className = "mx-1";
  //     // spanElement.textContent = "some text here";
  //     // divElement1.appendChild(spanElement);

  //     for (let i = 0; i < 6; i++) {
  //       // Create a table element with id "table1" and classes "pdftable text-center mx-1 mb-4"
  //       const tableElement = document.createElement("table");
  //       tableElement.id = "table1";
  //       tableElement.className = "table1 text-center mx-1 mb-3";
  //       tableElement.setAttribute("style", "border: 2px solid black;border-spacing: 0;border-collapse: separate;border-radius: 10px;border: 2px solid black;font-size: 28px;font-weight: bolder;background-color: rgb(240, 180, 180);");

  //       // Loop to create table rows using Angular ngFor
  //       for (let j = 0; j < 3; j++) {
  //         const rowElement = document.createElement("tr");
  //         rowElement.setAttribute("style", "border-bottom: 1px solid grey;");
  //         // Loop to create table cells using Angular ngFor
  //         for (let k = 0; k < 9; k++) {
  //           const cellElement = document.createElement("td");
  //           cellElement.setAttribute("style", "width:40px;" + (j < 2 ? "border-bottom: 1px solid grey;" : "") + (k < 8 ? "border-right: 1px solid grey;" : ""));
  //           const tickValue = this.tick1[i][j][k] !== 0 ? this.tick1[i][j][k] : '';
  //           cellElement.textContent = tickValue.toString();
  //           rowElement.appendChild(cellElement);
  //         }
  //         tableElement.appendChild(rowElement);
  //       }
  //       divElement1.appendChild(tableElement);
  //     }
  //     tdElement.appendChild(divElement1);
  //     trElement.appendChild(tdElement);
  //     tabElement.appendChild(trElement);
  //     // Append the elements to the document body or any other container element
  //     // divElement.appendChild(tableElement);      
  //   }
  //   ele.appendChild(tabElement);
  // }

}


