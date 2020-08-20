import { VentilatorBed } from './ventilator-bed.model';
import { IntensiveCriticalCareBed } from './iccu-bed.model';
import { GeneralBed } from './general-bed.model';
import { IntensiveCareBed } from './icu-bed.model';

export class BedsList {
    intensiveCareBeds : IntensiveCareBed[];
    generalBeds : GeneralBed[];
    intensiveCriticalCareBeds : IntensiveCriticalCareBed[];
    ventilatorBeds : VentilatorBed[];
}