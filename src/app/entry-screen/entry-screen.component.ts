import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {RawTextService} from '../../service/data/raw-text.service';
import {PersistenceService} from '../../service/data/persistence.service';

@Component({
    selector: 'app-entry-screen',
    templateUrl: './entry-screen.component.html',
    styleUrls: ['./entry-screen.component.css']
})
export class EntryScreenComponent implements OnInit, OnDestroy {

    textAreaValue: string;
    id: string;
    persistenceService: PersistenceService;
    rawTextService: RawTextService;
    timeInterval: Subscription;

    constructor(persistenceService: PersistenceService, rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
        this.persistenceService = persistenceService;
    }

    ngOnInit() {
        this.timeInterval = interval(5000).subscribe(timeInterval => {
            if (this.id && this.textAreaValue) {
                this.rawTextService.put(this.id, this.textAreaValue).subscribe();
            } else if (this.textAreaValue) {
                this.rawTextService.post(this.textAreaValue).subscribe(response => {
                    this.id = this.persistenceService.getSubmittedRawText().id;
                });
            }
        });
    }

    ngOnDestroy() {
        this.timeInterval.unsubscribe();
    }

}
