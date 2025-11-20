import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie | undefined> {
    let detailUrl = this.apiUrl;
    if (detailUrl.endsWith('movie.json')) {
      detailUrl = detailUrl.replace(/movie\.json$/, '');
    }
    detailUrl = `${detailUrl}${id}/movie.json`;

    return this.http.get<Movie>(detailUrl).pipe(
      map((m: Movie) => m),
      catchError(() =>
        this.getMovies().pipe(map((movies: Movie[]) => movies.find(m => m.id === id)))
      )
    );
  }
}
