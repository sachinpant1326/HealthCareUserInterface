import { Component, OnInit } from '@angular/core';
import { DiagnosticCenter } from '../models/DiagnosticCenter';
import { DiagnosticCenterService } from '../services/diagnostic-center.service';

@Component({
  selector: 'app-view-diagnostic-center',
  templateUrl: './view-diagnostic-center.component.html',
  styleUrls: ['./view-diagnostic-center.component.css']
})
export class ViewDiagnosticCenterComponent implements OnInit {

  diagnosticCenters : DiagnosticCenter [] = [];

  diagnosticCenter : DiagnosticCenter = new DiagnosticCenter();

  editFlag: boolean = false;

  constructor(private diagnosticCenterService:DiagnosticCenterService) { }

  ngOnInit(): void {
    console.log("got centers");
    this.diagnosticCenterService.loadDiagnosticCenters().subscribe(data => {
      this.diagnosticCenters = data;
      this.diagnosticCenterService.setDiagnosticCenters(this.diagnosticCenters);
      console.log(this.diagnosticCenters); 
    });
  }

  deleteDiagnosticCenter(diagnosticCenterId: Number): void {
    this.diagnosticCenters = this.diagnosticCenterService.deleteDiagnosticCenter(diagnosticCenterId);
  }

  editDiagnosticCenter() : void {
    this.diagnosticCenters = this.diagnosticCenterService.updateDiagnosticCenter(this.diagnosticCenter);
    this.editFlag = false;
  }

  updateDiagnosticCenter(diagnosticCenterId: Number) {
    
    let tempCenters: DiagnosticCenter[] = this.diagnosticCenterService.getDiagnosticCenters().filter(diagnosticCenter => diagnosticCenter.id == diagnosticCenterId);
    if (tempCenters.length > 0) {
      this.diagnosticCenter = tempCenters[0];
      console.log("Hey its update");
      console.log(this.diagnosticCenter);
      this.editFlag = true;
      }
    }
  
}
