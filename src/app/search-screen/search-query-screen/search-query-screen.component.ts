import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../../service/data/raw-text.service';
import {Router} from '@angular/router';
import {UiRoutes} from '../../../const/ui-routes';

@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-query-screen.component.html',
    styleUrls: ['./search-query-screen.component.css']
})
export class SearchQueryScreenComponent {

    rawTextService: RawTextService;
    router: Router;

    endDate: Date;
    searchString: string;
    startDate: Date;

    constructor(rawTextService: RawTextService, router: Router) {
        this.rawTextService = rawTextService;
        this.router = router;
    }

    search(): void {
        this.rawTextService.search(this.searchString, this.startDate, this.endDate).subscribe(next => {
            this.router.navigateByUrl(UiRoutes.entrySearchResult).then();
        });
    }

    setStartDate(startDate): void {
        this.startDate = startDate.value;
    }

    setEndDate(endDate): void {
        this.endDate = endDate.value;
    }

}