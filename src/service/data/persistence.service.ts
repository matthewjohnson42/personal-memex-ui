import {Injectable} from '@angular/core';
import {RawText} from '../../data/raw-text';
import {Pageable} from '../../data/pageable';
import {RawTextSearchRequest} from '../../data/raw-text-search-request';

/**
 * Class providing persistence of http request bodies and http response bodies
 * Used in place of passing data between Angular components
 */
@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    /* the names of items as persisted to local storage */
    static readonly rawTextRequestName: string = 'rawTextRequest';
    static readonly rawTextResponseName: string = 'rawTextResponse';
    static readonly rawTextSearchSelectionName: string = 'rawTextSearchSelection';
    static readonly rawTextPageResponseName: string = 'rawTextPageResponse';
    static readonly rawTextSearchResponseName: string = 'rawTextSearchResponse';
    static readonly rawTextSearchRequestName: string = 'rawTextSearchRequest';

    /* items to persist */
    rawTextRequest: RawText;
    rawTextResponse: RawText;
    rawTextSearchSelection: RawText;
    rawTextPageResponse: Pageable<RawText>;
    rawTextSearchResponse: Pageable<RawText>;
    rawTextSearchRequest: RawTextSearchRequest;

    constructor() {
        this.loadRawTextRequest();
        this.loadRawTextResponse();
        this.loadRawTextSearchSelection();
        this.loadRawTextPageResponse();
        this.loadRawTextSearchResponse();
        this.loadRawTextSearchRequest();
    }

    /* getters and setters for the persistent member variables */
    getRawTextRequest(): RawText {
        return this.rawTextRequest;
    }
    setRawTextRequest(rawText: RawText): void {
        this.rawTextRequest = rawText;
        this.persistRawTextRequest();
    }
    getRawTextResponse(): RawText {
        return this.rawTextResponse;
    }
    setRawTextResponse(rawText: RawText): void {
        this.rawTextResponse = rawText;
        this.persistRawTextResponse();
    }
    getRawTextSearchSelection(): RawText {
        return this.rawTextSearchSelection;
    }
    setRawTextSearchSelection(rawText: RawText): void {
        this.rawTextSearchSelection = rawText;
    }
    getRawTextPageResponse(): Pageable<RawText> {
        return this.rawTextPageResponse;
    }
    setRawTextPageResponse(rawTextPage: Pageable<RawText>): void {
        this.rawTextPageResponse = rawTextPage;
        this.persistRawTextPageResponse();
    }
    getRawTextSearchResponse(): Pageable<RawText> {
        return this.rawTextSearchResponse;
    }
    setRawTextSearchResponse(rawTextSearchResponse: Pageable<RawText>) {
        this.rawTextSearchResponse = rawTextSearchResponse;
        this.persistRawTextSearchResponse();
    }
    getRawTextSearchRequest(): RawTextSearchRequest {
        return this.rawTextSearchRequest;
    }
    setRawTextSearchRequest(rawTextSearchRequest: RawTextSearchRequest) {
        this.rawTextSearchRequest = rawTextSearchRequest;
        this.persistRawTextSearchRequest();
    }

    /* load and persist methods for the persistent member variables */
    loadRawTextRequest(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextRequestName));
        if ( json ) {
            this.rawTextRequest = this.parseRawText(json);
        }
    }
    persistRawTextRequest(): void {
        if ( this.rawTextRequest ) {
            localStorage.setItem(PersistenceService.rawTextRequestName, JSON.stringify(this.rawTextRequest));
        }
    }
    loadRawTextResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextResponseName));
        if ( json ) {
            this.rawTextResponse = this.parseRawText(json);
        }
    }
    persistRawTextResponse(): void {
        if ( this.rawTextResponse ) {
            localStorage.setItem(PersistenceService.rawTextResponseName, JSON.stringify(this.rawTextResponse));
        }
    }
    loadRawTextSearchSelection(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchSelectionName));
        if ( json ) {
            this.rawTextSearchSelection = this.parseRawText(json);
        }
    }
    persistRawTextSearchSelection(): void {
        localStorage.setItem(PersistenceService.rawTextSearchSelectionName, JSON.stringify(this.rawTextSearchSelection));
    }
    loadRawTextPageResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextPageResponseName));
        if ( json ) {
            this.rawTextPageResponse = this.parseRawTextPage(json);
        }
    }
    persistRawTextPageResponse(): void {
        if ( this.rawTextPageResponse ) {
            localStorage.setItem(PersistenceService.rawTextPageResponseName, JSON.stringify(this.rawTextPageResponse));
        }
    }
    loadRawTextSearchResponse(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchResponseName));
        if ( json ) {
            this.rawTextSearchResponse = this.parseRawTextPage(json);
        }
    }
    persistRawTextSearchResponse(): void {
        if ( this.rawTextSearchResponse ) {
            localStorage.setItem(PersistenceService.rawTextSearchResponseName, JSON.stringify(this.rawTextSearchResponse));
        }
    }
    loadRawTextSearchRequest(): void {
        const json = JSON.parse(localStorage.getItem(PersistenceService.rawTextSearchRequestName));
        if ( json ) {
            this.rawTextSearchRequest = this.parseRawTextSearchRequest(json);
        }
    }
    persistRawTextSearchRequest(): void {
        if ( this.rawTextSearchRequest ) {
            localStorage.setItem(PersistenceService.rawTextSearchRequestName, JSON.stringify(this.rawTextSearchRequest));
        }
    }

    /* helper methods */
    private parseRawText(json: any): RawText {
        return new RawText(
            json.id,
            json.textContent,
            json.createDateTime,
            json.updateDateTime
        );
    }
    private parseRawTextPage(json: any): Pageable<RawText> {
        const rawTextArray: Array<RawText> = new Array<RawText>();
        for ( const rawText of json.content ) {
            rawTextArray.push(this.parseRawText(rawText));
        }
        return new Pageable<RawText>(rawTextArray, json.totalElement, json.number, json.size);
    }
    private parseRawTextSearchRequest(json: any): RawTextSearchRequest {
        return new RawTextSearchRequest(
            json.searchString,
            json.pageSize,
            json.pageNumber,
            json.startCreateDate,
            json.endUpdateDate
        );
    }

}