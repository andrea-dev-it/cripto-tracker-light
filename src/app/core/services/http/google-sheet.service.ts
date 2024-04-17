import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseGoogleSheet } from '../../../models/interfaces/IResponseGoogleSheet';

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetService {
  protected _portfolioUrl =
    'https://sheets.googleapis.com/v4/spreadsheets/1jMCydbsoEFnlSmQOggHK92JzxSI1gsTTrpl7j2wFHZQ/values/_Portfolio?alt=json&key=AIzaSyAhXXS5ctqKfELybuqs88pkDBLOWN8FGfs';

  constructor(private http: HttpClient) {}

  public fetchPortfolioData() {
    return this.http.get<IResponseGoogleSheet>(this._portfolioUrl);
  }
}
