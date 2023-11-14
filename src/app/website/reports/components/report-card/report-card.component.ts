import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {DocumentService} from "../../services/document.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'hpb-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit{

    @Output() closeEvent = new EventEmitter();
    documents: any = [];

    constructor(
      private _documentService: DocumentService,
      private _snack: MatSnackBar,
    ) {
    }

    ngOnInit() {
       this._documentService.getReports().subscribe(
         documents => {
           this.documents = documents;
         }
       )
    }

    download(path: string): void {
      this._snack.open('Download in corso...', 'OK');
      this._documentService.download(path);
    }
}
