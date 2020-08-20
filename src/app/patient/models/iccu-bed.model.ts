import { Bed } from './bed.model';

export class IntensiveCriticalCareBed extends Bed {
    batteryBackup : boolean;
    hasABS : boolean;
    remoteOperated : boolean;
    type : string;
}