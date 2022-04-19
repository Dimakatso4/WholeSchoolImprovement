import { Component, OnInit } from '@angular/core';
import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-inauguration',
  templateUrl: './inauguration.component.html',
  styleUrls: ['./inauguration.component.scss']
})
export class InaugurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const dataTable = new DataTable("#dataTableExample");
  }

}
