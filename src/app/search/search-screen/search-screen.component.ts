import {Component, OnInit} from '@angular/core';
import {RawTextService} from '../../../service/raw-text.service';

@Component({
    selector: 'app-retrieval-screen',
    templateUrl: './search-screen.component.html',
    styleUrls: ['./search-screen.component.css']
})
export class SearchScreenComponent implements OnInit {

    rawTextService: RawTextService;

    constructor(rawTextService: RawTextService) {
        this.rawTextService = rawTextService;
    }

    ngOnInit(): void {
    }

    search(): void {
        this.rawTextService.getPage(10, 0).subscribe(
            next => {
                console.log(next);
            });
    }

}
