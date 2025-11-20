import { Component, OnInit } from '@angular/core';
import { Movie } from '../Movie';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((m) => (this.movies = m));
  }

  onSelect(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  getActorCount(movie: Movie): number {
    return movie.actores ? movie.actores.length : 0;
  }
}
