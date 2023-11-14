import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LogService} from "../../../core/services/log.service";

@Component({
  selector: 'hpm-drag-drop-zone',
  templateUrl: './drag-drop-zone.component.html',
  styleUrls: ['./drag-drop-zone.component.scss']
})
export class DragDropZoneComponent{

  @Output() fileAdded = new EventEmitter<File>();
  @Input() validExtensions: string[] = [];

  file: File | undefined;

  constructor(private _log: LogService) {
  }

  uploadFile(event: any): void {
    this.addFile(event.item(0));
  }

  uploadClickFile(event: any): void {
    this.addFile(event.files.item(0));
  }

  addFile(file: File) {
    this._log.log(file);
    if (this.validExtensions.length === 0  || this.validExtensions.find(ext => file.name.toLowerCase().includes(ext))) {
      this.file = file;
      this.fileAdded.emit(this.file);
    }
  }

}
