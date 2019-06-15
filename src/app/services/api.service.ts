import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    api: string;

    constructor(private httpClient: HttpClient) {
        this.api = environment.api;
    }

    private prepareParams(params: object): HttpParams {
        if (!params) {
            return null;
        }

        let httpParams = new HttpParams();

        for (const item in params) {
            if (params.hasOwnProperty(item) && params[item] !== undefined) {
                httpParams = httpParams.append(item, params[item]);
            }
        }
        return httpParams;
    }

    private prepareOptions(options?: object, headers?: HttpHeaders): {params: HttpParams, headers: HttpHeaders} {
        return {
            params: this.prepareParams(options),
            headers: headers || null
        };
    }

    private getEndpoint(url: string): string {
        return `${this.api}/${url}`;
    }

    public postRequest(url: string, body: any, params?: object, headers?: HttpHeaders): Observable<any> {
        return this.httpClient.post(this.getEndpoint(url), body, this.prepareOptions(params, headers));
    }

    public getRequest(url: string, params?: object, headers?: HttpHeaders): Observable<any> {
        return this.httpClient.get(this.getEndpoint(url), this.prepareOptions(params, headers));
    }

    public putRequest(url: string, body: any, params?: object, headers?: HttpHeaders): Observable<any> {
        return this.httpClient.put(this.getEndpoint(url), body, this.prepareOptions(params, headers));
    }

    public deleteRequest(url: string, params?: object, headers?: HttpHeaders): Observable<any> {
        return this.httpClient.delete(this.getEndpoint(url), this.prepareOptions(params, headers));
    }
}
