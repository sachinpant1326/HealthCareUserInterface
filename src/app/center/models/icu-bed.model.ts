import { Bed } from './bed.model';

export class IntensiveCareBed  extends Bed {
    headTiltAvailable : boolean;
    kneeTiltAvailable : boolean;
    noOfFunctions : number;
    electric : boolean;
}